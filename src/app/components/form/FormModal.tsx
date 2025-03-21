'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PersonalInfoStep from './steps/PersonalInfoStep';
import EligibilityStep from './steps/EligibilityStep';
import CompanyStep from './steps/CompanyStep';
import LocationStep from './steps/LocationStep';
import ProjectStep from './steps/ProjectStep';
import FinalStep from './steps/FinalStep';
import StepIndicator from './StepIndicator';
import { FormState, DEFAULT_FORM_STATE } from '@/types/form';
import { cities } from '@/app/data/cityData';
import { useModal } from '@/app/ModalContext';
    
interface Step {
    id: number;
    title: string;
    component: React.ComponentType<any>;
}

const STEPS: Step[] = [
    { id: 1, title: 'Dati di contatto', component: PersonalInfoStep },
    { id: 2, title: 'Requisiti di ammissibilità', component: EligibilityStep },
    { id: 3, title: 'Anagrafica aziendale', component: CompanyStep },
    { id: 4, title: 'Unità locale', component: LocationStep },
    { id: 5, title: 'Dettagli investimento', component: ProjectStep },
    { id: 6, title: 'Conferma', component: FinalStep },
];

// Funzione di validazione per ogni step
const validateStep = (step: number, formData: FormState): string | null => {
  switch (step) {
    case 1: // PersonalInfoStep
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.discoveryChannel) {
        return "Per favore compila tutti i campi personali (nome, cognome, email, telefono e come ci hai conosciuto)";
      }
      if (formData.discoveryChannel === 'other' && !formData.otherDiscoveryChannel) {
        return "Per favore specifica come ci hai conosciuto";
      }
      break;
    
    case 2: // EligibilityStep
      if (!formData.eligibility || 
          formData.eligibility.isRegisteredOrWillBe === false ||
          formData.eligibility.hadGrantRevocation === false ||
          formData.eligibility.hasRelocated24Months === false ||
          formData.eligibility.willNotRelocate24Months === false ||
          formData.eligibility.isPartOfGroup === false) {
        return "Per favore conferma tutti i requisiti di ammissibilità";
      }
      break;
    
    case 3: // CompanyStep
      if (!formData.atecoCode) {
        return "Per favore seleziona il codice ATECO dell'attività";
      }
      break;
    
    case 4: // LocationStep
      if (!formData.localUnit?.municipality) {
        return "Per favore seleziona il comune dell'unità locale";
      }
      break;
    
    case 5: // ProjectStep
      if (!formData.investmentType || 
          !formData.customInvestmentAmount || 
          !formData.projectDescription ||
          formData.expenseTypes.length === 0) {
        return "Per favore compila tutti i dettagli del progetto (tipologia, importo, descrizione e tipologie di spesa)";
      }
      break;
  }
  return null;
};

export default function FormModal() {
    const { isModalOpen, closeModal } = useModal();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormState>(DEFAULT_FORM_STATE);
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState<Record<string, any>>({});
    const [validationError, setValidationError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Assicuriamoci che il componente sia montato prima di manipolare elementi DOM
    const [isMounted, setIsMounted] = useState(false);
    
    // UseEffect per gestire il mounting del componente
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    // Funzione per gestire la chiusura del modale
    const handleClose = useCallback(() => {
        closeModal();
    }, [closeModal]);

    const calculateScore = () => {
        let newScore = 0;

        // Prendo solo il punteggio del comune selezionato (0, 3 o 6 punti)
        if (formData.localUnit?.municipality) {
            const selectedCity = cities.find(city => city.name === formData.localUnit?.municipality);
            if (selectedCity) {
                newScore = selectedCity.score;
                console.log(`Punteggio comune ${selectedCity.name}: ${selectedCity.score}`);
            }
        }

        setScore(newScore);
        console.log(`Punteggio totale calcolato: ${newScore}`);
    };

    // Assicuriamoci di renderizzare solo lato client
    if (!isMounted) {
        return null;
    }

    // Funzione per inviare i dati a Make.com tramite webhook
    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            setSubmitError(null);
            
            // Preparo i dati da inviare includendo il punteggio calcolato
            const dataToSubmit = {
                ...formData,
                score,
                submittedAt: new Date().toISOString()
            };
            
            // Log dei dati che stiamo per inviare
            console.log('Dati che verranno inviati:', dataToSubmit);
            
            // URL del webhook Make.com
            const webhookUrl = "https://hook.eu1.make.com/hxgdsajwaauweyku1h6nux6xh3ey0auy";
            
            console.log('Invio richiesta a:', webhookUrl);
            
            // Invio i dati a Make.com
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(dataToSubmit),
            });
            
            console.log('Risposta ricevuta:', {
                status: response.status,
                statusText: response.statusText
            });
            
            if (!response.ok) {
                // Prova a leggere il corpo dell'errore
                let errorBody = '';
                try {
                    errorBody = await response.text();
                    console.error('Corpo della risposta di errore:', errorBody);
                } catch (e) {
                    console.error('Impossibile leggere il corpo della risposta di errore');
                }
                
                throw new Error(`Errore durante l'invio del form: ${response.status} ${response.statusText}. ${errorBody}`);
            }
            
            // Prova a leggere la risposta
            let responseData;
            try {
                responseData = await response.json();
                console.log('Risposta completa:', responseData);
            } catch (e) {
                console.log('La risposta non contiene JSON valido');
            }
            
            // Gestisco la risposta positiva
            setSubmitSuccess(true);
            
            // Triggero l'evento di conversione Google Ads
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'conversion', {'send_to': 'AW-744744589'});
                console.log('Google Ads conversion tracked');
            }
            
            // Mostro un messaggio di successo
            alert("Grazie! Il tuo form è stato inviato con successo. Ti contatteremo presto.");
            
            // Chiudo il form dopo 2 secondi
            setTimeout(() => {
                closeModal();
                // Reset del form per futuri utilizzi
                setFormData(DEFAULT_FORM_STATE);
                setCurrentStep(1);
                setScore(0);
            }, 2000);
            
        } catch (error: any) {
            console.error("Errore dettagliato durante l'invio del form:", error);
            setSubmitError(`Si è verificato un errore durante l'invio del form: ${error.message}. Riprova più tardi o contattaci direttamente.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNext = () => {
        // Verifica se tutti i campi obbligatori sono compilati
        const error = validateStep(currentStep, formData);
        
        if (error) {
            setValidationError(error);
            // Mostro un alert per assicurarmi che l'utente veda l'errore
            alert(error);
            return;
        }
        
        // Se non ci sono errori, procedo al prossimo step
        setValidationError(null);
        
        if (currentStep < STEPS.length) {
            setCurrentStep(currentStep + 1);
            if (currentStep === STEPS.length - 1) {
                calculateScore();
            }
        } else {
            // Siamo all'ultimo step, invia il form
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleChange = (name: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const updateFormData = (updates: Partial<FormState>) => {
        setFormData(prev => ({
            ...prev,
            ...updates
        }));
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal} />
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {STEPS.find(step => step.id === currentStep)?.title || 'Form'}
                        </h2>
                        <button
                            onClick={handleClose}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="p-6 flex-1 overflow-y-auto">
                        <StepIndicator steps={STEPS} currentStep={currentStep} />

                        {validationError && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600 font-medium flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {validationError}
                                </p>
                            </div>
                        )}

                        {submitError && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600 font-medium flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {submitError}
                                </p>
                            </div>
                        )}

                        {submitSuccess && (
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm text-green-600 font-medium flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Form inviato con successo! Grazie per la tua richiesta.
                                </p>
                            </div>
                        )}

                        <div className="mt-8">
                            {currentStep === 1 && (
                                <PersonalInfoStep 
                                    formData={formData} 
                                    updateFormData={updateFormData}
                                    onChange={handleChange}
                                />
                            )}
                            {currentStep === 2 && (
                                <EligibilityStep 
                                    formData={formData} 
                                    updateFormData={updateFormData}
                                    onChange={handleChange}
                                />
                            )}
                            {currentStep === 3 && (
                                <CompanyStep 
                                    formData={formData} 
                                    updateFormData={updateFormData}
                                    onChange={handleChange}
                                />
                            )}
                            {currentStep === 4 && (
                                <LocationStep
                                    formData={formData}
                                    updateFormData={updateFormData}
                                    errors={errors}
                                    onChange={handleChange}
                                />
                            )}
                            {currentStep === 5 && (
                                <ProjectStep
                                    formData={formData}
                                    onChange={handleChange}
                                    updateFormData={updateFormData}
                                />
                            )}
                            {currentStep === 6 && (
                                <FinalStep
                                    formData={formData}
                                    updateFormData={updateFormData}
                                    onChange={handleChange}
                                    score={score}
                                />
                            )}
                        </div>
                    </div>
                    
                    {/* Pulsanti di navigazione fissati in basso */}
                    <div className="p-6 border-t border-gray-200 flex justify-between">
                        {currentStep > 1 && !isSubmitting && !submitSuccess && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            >
                                Indietro
                            </button>
                        )}
                        {currentStep === 1 && !isSubmitting && !submitSuccess && (
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            >
                                Annulla
                            </button>
                        )}
                        {!isSubmitting && !submitSuccess ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors duration-200"
                            >
                                {currentStep < STEPS.length ? 'Continua' : 'Invia'}
                            </button>
                        ) : isSubmitting ? (
                            <button
                                type="button"
                                disabled
                                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg flex items-center"
                            >
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Invio in corso...
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
