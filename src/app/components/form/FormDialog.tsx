'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { FormState, DEFAULT_FORM_STATE } from '@/types/form';
import PersonalInfoStep from './steps/PersonalInfoStep';
import EligibilityStep from './steps/EligibilityStep';
import CompanyStep from './steps/CompanyStep';
import LocationStep from './steps/LocationStep';
import ProjectStep from './steps/ProjectStep';
import FinalStep from './steps/FinalStep';
import { X } from 'lucide-react';

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  { title: 'Dati di contatto', component: PersonalInfoStep },
  { title: 'Requisiti di ammissibilità', component: EligibilityStep },
  { title: 'Anagrafica aziendale', component: CompanyStep },
  { title: 'Unità locale', component: LocationStep },
  { title: 'Dettagli investimento', component: ProjectStep },
  { title: 'Conferma', component: FinalStep },
];

// Funzione di validazione per ogni step
const validateStep = (step: number, formData: FormState): string | null => {
  switch (step) {
    case 0: // PersonalInfoStep
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        return "Per favore compila tutti i campi personali (nome, cognome, email e telefono)";
      }
      break;
    
    case 1: // EligibilityStep
      if (!formData.eligibility || 
          formData.eligibility.isRegisteredOrWillBe === undefined ||
          formData.eligibility.hadGrantRevocation === undefined ||
          formData.eligibility.hasRelocated24Months === undefined ||
          formData.eligibility.willNotRelocate24Months === undefined ||
          formData.eligibility.isPartOfGroup === undefined) {
        return "Per favore rispondi a tutte le domande sui requisiti di ammissibilità";
      }
      break;
    
    case 2: // CompanyStep
      if (!formData.atecoCode) {
        return "Per favore seleziona il codice ATECO dell'attività";
      }
      break;
    
    case 3: // LocationStep
      if (!formData.localUnit?.municipality) {
        return "Per favore indica l'ubicazione dell'unità locale";
      }
      break;
    
    case 4: // ProjectStep
      if (!formData.investmentType || 
          !formData.investmentPurpose || 
          !formData.projectDescription || 
          !formData.projectLocation || 
          !formData.projectDuration ||
          !formData.totalAmount ||
          !formData.fundingAmount ||
          !formData.regimeType) {
        return "Per favore compila tutti i dettagli del progetto e del budget";
      }
      break;
    
    case 5: // FinalStep
      if (!formData.gdprConsent) {
        return "Per favore accetta l'informativa sulla privacy per procedere";
      }
      break;
  }
  return null;
};

export function FormDialog({ isOpen, onClose }: FormDialogProps) {
  const [formData, setFormData] = useState<FormState>(DEFAULT_FORM_STATE);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStepValid, setIsStepValid] = useState(false);

  // Forza la validazione all'apertura del form
  useEffect(() => {
    if (isOpen) {
      const validationError = validateStep(currentStep, formData);
      setIsStepValid(validationError === null);
      setError(validationError);
    }
  }, [isOpen]);

  // Verifica sempre la validità quando si cambia step
  useEffect(() => {
    const validationError = validateStep(currentStep, formData);
    setIsStepValid(validationError === null);
    setError(validationError);
  }, [currentStep, formData]);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault(); // Previene qualsiasi comportamento predefinito
    e.stopPropagation(); // Ferma la propagazione dell'evento
    
    // Esegui la validazione in modo sincrono qui
    const validationError = validateStep(currentStep, formData);
    
    // Se c'è un errore, mostralo e interrompi l'avanzamento
    if (validationError) {
      setError(validationError);
      setIsStepValid(false);
      alert(validationError); // Mostra un alert per essere certi che l'utente lo veda
      return false; // Ritorna false per indicare che non è stato possibile avanzare
    }
    
    // Avanza solo se non ci sono errori
    setError(null);
    setIsStepValid(true);
    
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
    
    return true; // Ritorna true per indicare che l'avanzamento è avvenuto con successo
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Qui puoi aggiungere la logica per inviare i dati al server
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (updates: Partial<FormState>) => {
    const newFormData = {
      ...formData,
      ...updates
    };
    setFormData(newFormData);
    
    // Aggiungo validazione anche qui per la sicurezza
    const validationError = validateStep(currentStep, newFormData);
    setIsStepValid(validationError === null);
    setError(validationError);
  };

  const handleFieldChange = (name: string, value: any) => {
    const newFormData = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);
    
    // Valida immediatamente dopo la modifica di un campo
    const validationError = validateStep(currentStep, newFormData);
    setIsStepValid(validationError === null);
    setError(validationError);
  };

  const calculateScore = useMemo(() => {
    let totalScore = 0;
    
    // Utilizziamo il punteggio già presente nel formData se esiste
    if (formData.score) {
      return formData.score;
    }
    
    // Criterio C - Indicatori finanziari e tipologia dell'intervento
    // Utilizziamo il projectType come base
    if (formData.projectType) {
      if (formData.projectType === 'expansion') totalScore += 4;
      else if (formData.projectType === 'newConstruction') totalScore += 7;
      else if (formData.projectType === 'completion') totalScore += 4;
    }
    
    // Criterio D - Sostenibilità ambientale
    // Contiamo le spese relative alla sostenibilità
    const sustainabilityExpenses = formData.expenseTypes.filter(type => 
      ['rainwaterSystem', 'ledLighting', 'homeAutomation', 'solarThermal', 'photovoltaic', 'thermalEfficiency'].includes(type)
    );
    totalScore += sustainabilityExpenses.length * 2;
    
    // Criterio E - Area dell'intervento
    // Questo è un esempio, dovrà essere adattato in base ai dati effettivi
    if (formData.projectLocation) {
      // Assumiamo che projectLocation possa contenere informazioni sulle aree
      const areas = formData.projectLocation.split(',').map(a => a.trim());
      if (areas.length >= 3) totalScore += 10;
      else if (areas.length === 2) totalScore += 6;
      else if (areas.length === 1) totalScore += 3;
    }
    
    return totalScore;
  }, [formData]);

  const CurrentStepComponent = STEPS[currentStep].component;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {STEPS[currentStep].title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}
          
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
            onChange={handleFieldChange}
            score={calculateScore}
          />

          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Indietro
              </button>
            )}
            {currentStep === 0 && (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Annulla
              </button>
            )}
            
            <button
              type="button"
              className={`px-6 py-2 rounded-lg ${
                isStepValid
                  ? 'bg-yellow-400 text-black hover:bg-yellow-500 transition-colors duration-200'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Controlla nuovamente la validazione qui prima di chiamare handleNext
                const validationError = validateStep(currentStep, formData);
                if (validationError) {
                  setError(validationError);
                  setIsStepValid(false);
                  alert(validationError);
                  return;
                }
                
                if (isStepValid) {
                  handleNext(e);
                } else {
                  alert("Per favore compila tutti i campi obbligatori prima di continuare");
                  setError("Per favore compila tutti i campi obbligatori prima di continuare");
                }
              }}
            >
              {currentStep < STEPS.length - 1 ? 'Continua' : 'Invia'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
