'use client';

import React, { useState } from 'react';
import { FormState, DEFAULT_FORM_STATE } from '@/types/form';
import { BaseStepProps } from '@/types/components';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ProjectStep from './steps/ProjectStep';
import CompanyInfoStep from './steps/CompanyInfoStep';
import ExpensesStep from './steps/ExpensesStep';
import AdditionalInfoStep from './steps/AdditionalInfoStep';
import { X } from 'lucide-react';

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => Promise<void> | void;
}

interface StepComponent {
  title: string;
  component: React.ComponentType<BaseStepProps>;
}

const STEPS: StepComponent[] = [
  { title: 'Informazioni personali', component: PersonalInfoStep },
  { title: 'Informazioni aziendali', component: CompanyInfoStep },
  { title: 'Dettagli progetto', component: ProjectStep },
  { title: 'Spese previste', component: ExpensesStep },
  { title: 'Informazioni aggiuntive', component: AdditionalInfoStep },
];

export function FormDialog({ isOpen, onClose }: FormDialogProps) {
  const [formData, setFormData] = useState<FormState>(DEFAULT_FORM_STATE);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleUpdate = (field: keyof FormState, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      await onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const CurrentStepComponent = STEPS[currentStep].component;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {STEPS[currentStep].title}
          </h2>
          <button
            onClick={() => onClose()}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <CurrentStepComponent
            formData={formData}
            onUpdate={handleUpdate}
          />

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => {
                if (currentStep > 0) {
                  setCurrentStep(prev => prev - 1);
                } else {
                  onClose();
                }
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              {currentStep === 0 ? 'Annulla' : 'Indietro'}
            </button>
            <button
              type="button"
              onClick={() => {
                if (currentStep < STEPS.length - 1) {
                  setCurrentStep(prev => prev + 1);
                } else {
                  handleSubmit();
                }
              }}
              disabled={isSubmitting}
              className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Invio in corso...' : currentStep === STEPS.length - 1 ? 'Invia' : 'Avanti'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
