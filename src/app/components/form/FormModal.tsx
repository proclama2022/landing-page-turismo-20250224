'use client';

import React, { useState, useEffect } from 'react';
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

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

// Utilizziamo una funzione di fabbrica per creare il componente con le props serializzabili
export default function FormModalFactory() {
  // Questa funzione client-side gestisce la chiusura del modale
  const handleClose = () => {
    // Implementazione della logica di chiusura
    const event = new CustomEvent('closeFormModal');
    document.dispatchEvent(event);
  };

  return <FormModalComponent isOpen={true} />;
}

// Componente interno che non espone funzioni come props
function FormModalComponent({ isOpen }: { isOpen: boolean }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormState>(DEFAULT_FORM_STATE);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  // Gestisce la chiusura del modale
  const onClose = () => {
    setIsModalOpen(false);
  };

  // Ascolta l'evento di chiusura
  useEffect(() => {
    const handleCloseEvent = () => {
      setIsModalOpen(false);
    };
    
    document.addEventListener('closeFormModal', handleCloseEvent);
    return () => {
      document.removeEventListener('closeFormModal', handleCloseEvent);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const calculateScore = () => {
    let newScore = 0;
    
    // Calcolo del punteggio basato sui dati del form
    if (formData.investmentType === 'ampliamento') newScore += 20;
    if (formData.investmentType === 'nuova_struttura') newScore += 15;
    if (formData.investmentType === 'recupero_immobile') newScore += 25;
    
    if (formData.investmentPurpose === 'enhanceTourism') newScore += 15;
    if (formData.investmentPurpose === 'qualityStandards') newScore += 20;
    if (formData.investmentPurpose === 'serviceImprovement') newScore += 25;
    
    if (formData.expenseTypes.includes('propertyPurchase')) newScore += 10;
    if (formData.expenseTypes.includes('construction')) newScore += 15;
    if (formData.expenseTypes.includes('equipment')) newScore += 20;
    
    setScore(newScore);
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      if (currentStep === STEPS.length - 1) {
        calculateScore();
      }
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
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {STEPS.find(step => step.id === currentStep)?.title || 'Form'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <StepIndicator steps={STEPS} currentStep={currentStep} />

              <div className="mt-8 overflow-y-auto max-h-[calc(90vh-250px)]">
                {currentStep === 1 && (
                  <PersonalInfoStep formData={formData} updateFormData={updateFormData} />
                )}
                {currentStep === 2 && (
                  <EligibilityStep formData={formData} updateFormData={updateFormData} />
                )}
                {currentStep === 3 && (
                  <CompanyStep formData={formData} updateFormData={updateFormData} />
                )}
                {currentStep === 4 && (
                  <LocationStep 
                    formData={formData} 
                    updateFormData={updateFormData} 
                    errors={errors}
                  />
                )}
                {currentStep === 5 && (
                  <ProjectStep 
                    formData={formData} 
                    onChange={handleChange} 
                  />
                )}
                {currentStep === 6 && (
                  <FinalStep
                    formData={formData}
                    updateFormData={updateFormData}
                    score={score}
                  />
                )}

                <div className="mt-8 flex justify-between">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Indietro
                    </button>
                  )}
                  {currentStep === 1 && (
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
                    onClick={handleNext}
                    className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors duration-200"
                  >
                    {currentStep < STEPS.length ? 'Continua' : 'Invia'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
