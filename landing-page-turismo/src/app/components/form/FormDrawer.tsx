'use client';

import React, { useState } from 'react';
import { FormState, DEFAULT_FORM_STATE } from '@/types/form';
import { BaseStepProps } from '@/types/components';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ProjectStep from './steps/ProjectStep';
import CompanyInfoStep from './steps/CompanyInfoStep';
import ExpensesStep from './steps/ExpensesStep';
import LocationStep from './steps/LocationStep';
import { CITY_DATA } from '@/data/cityData';

interface FormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
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
  { title: 'Località', component: LocationStep },
];

export function FormDrawer({ isOpen, onClose }: FormDrawerProps) {
  const [formData, setFormData] = useState<FormState>(DEFAULT_FORM_STATE);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateScore = (data: FormState): number => {
    let score = 0;

    // Punteggio per città
    if (data.selectedCity) {
      score += CITY_DATA[data.selectedCity]?.score || 0;
    }

    // Punteggio per importo investimento
    switch (data.investmentAmount) {
      case 'fino400':
        score += 1;
        break;
      case 'fino1000':
        score += 2;
        break;
      case 'oltre1000':
        score += 3;
        break;
    }

    // Punteggio per tipo di intervento
    switch (data.interventionType) {
      case 'new':
        score += 3;
        break;
      case 'expansion':
        score += 2;
        break;
      case 'renovation':
        score += 1;
        break;
    }

    // Punteggi aggiuntivi
    if (data.willHireEmployees) score += 2;
    if (data.isRundownProperty) score += 2;
    if (data.isHistoricalBuilding) score += 1;

    return score;
  };

  const handleUpdate = (field: keyof FormState, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const score = calculateScore(formData);
      console.log('Form submitted:', formData);
      console.log('Score:', score);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = STEPS[currentStep].component;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{STEPS[currentStep].title}</SheetTitle>
        </SheetHeader>

        <div className="mt-6">
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
      </SheetContent>
    </Sheet>
  );
}
