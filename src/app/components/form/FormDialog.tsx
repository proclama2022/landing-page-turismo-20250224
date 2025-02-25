'use client';

import React, { useState } from 'react';
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

export function FormDialog({ isOpen, onClose }: FormDialogProps) {
  const [formData, setFormData] = useState<FormState>(DEFAULT_FORM_STATE);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
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
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
            onChange={handleFieldChange}
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
              onClick={handleNext}
              className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors duration-200"
            >
              {currentStep < STEPS.length - 1 ? 'Continua' : 'Invia'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
