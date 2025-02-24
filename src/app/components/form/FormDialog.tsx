'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { FormState, DEFAULT_FORM_STATE } from '../../types/form';
import ContactStep from './steps/ContactStep';
import EligibilityStep from './steps/EligibilityStep';
import CompanyStep from './steps/CompanyStep';
import LocationStep from './steps/LocationStep';
import ProjectStep from './steps/ProjectStep';
import FinalStep from './steps/FinalStep';

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  { title: 'Dati di contatto', component: ContactStep },
  { title: 'Requisiti di ammissibilità', component: EligibilityStep },
  { title: 'Anagrafica aziendale', component: CompanyStep },
  { title: 'Unità locale', component: LocationStep },
  { title: 'Dettagli investimento', component: ProjectStep },
  { title: 'Conferma', component: FinalStep },
];

export function FormDialog({ isOpen, onClose }: FormDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormState>(DEFAULT_FORM_STATE);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // TODO: Implementare la logica di invio del form
    console.log('Form submitted:', formData);
    onClose();
  };

  const updateFormData = (updates: Partial<FormState>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  const CurrentStepComponent = STEPS[currentStep].component;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={STEPS[currentStep].title}
    >
      <div className="w-full">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step content */}
        <div className="mb-8">
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
          />
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className={`px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500 ${
              currentStep === 0 ? 'invisible' : ''
            }`}
          >
            Indietro
          </button>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Annulla
            </button>
            <button
              onClick={currentStep === STEPS.length - 1 ? handleSubmit : handleNext}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg transition-colors duration-200"
            >
              {currentStep === STEPS.length - 1 ? 'Invia' : 'Avanti'}
            </button>
          </div>
        </div>

        {/* Step indicator */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Step {currentStep + 1} di {STEPS.length}
        </div>
      </div>
    </Modal>
  );
}
