'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import StepIndicator from './StepIndicator';
import ContactStep from './steps/ContactStep';
import CompanyInfoStep from './steps/CompanyInfoStep';
import LocalUnitStep from './steps/LocalUnitStep';
import ProjectDetailsStep from './steps/ProjectDetailsStep';
import BudgetStep from './steps/BudgetStep';
import FinalAuthStep from './steps/FinalAuthStep';

interface FormContainerProps {
  onSubmit: (data: any) => void; // Updated to accept any
  onCancel: () => void;
}

interface Step {
  id: number;
  title: string;
  label: string;
  description: string;
  component: React.ComponentType<any>;
}

const steps: Step[] = [
    {
        id: 0,
        title: 'Contatti',
        label: 'Step 1',
        description: 'Inserisci i tuoi contatti',
        component: ContactStep
      },
      {
        id: 1,
        title: 'Azienda',
        label: 'Step 2',
        description: 'Dati aziendali',
        component: CompanyInfoStep
      },
      {
        id: 2,
        title: 'Sede',
        label: 'Step 3',
        description: 'Sede dell\'investimento',
        component: LocalUnitStep
      },
      {
        id: 3,
        title: 'Progetto',
        label: 'Step 4',
        description: 'Dettagli del progetto',
        component: ProjectDetailsStep
      },
      {
        id: 4,
        title: 'Budget',
        label: 'Step 5',
        description: 'Budget',
        component: BudgetStep
      },
      {
        id: 5,
        title: 'Autorizzazioni',
        label: 'Step 6',
        description: 'Consenso',
        component: FinalAuthStep
      },
];

const FormContainer: React.FC<FormContainerProps> = ({ onSubmit, onCancel }) => {
    const methods = useForm();
    const [currentStep, setCurrentStep] = useState(0);
  
    const handleNext = () => {
        // Placeholder for validation logic
        // const isValid = methods.formState.isValid;
        const isValid = true; // Bypass validation for now
        if (isValid) {
            setCurrentStep(prevStep => prevStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prevStep => prevStep - 1);
        }
    };

    const handleSubmit = (data: any) => {
        onSubmit(data);
    }

    const CurrentStepComponent = steps[currentStep].component;
    const isLastStep = currentStep === steps.length - 1;
    const isFirstStep = currentStep === 0;

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-8">
                <StepIndicator
                    steps={steps}
                    currentStep={currentStep}
                    completedSteps={[]}
                    onStepClick={() => {}}
                />

                <CurrentStepComponent />

                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        onClick={isFirstStep ? onCancel : handleBack}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                    >
                        {isFirstStep ? 'Annulla' : 'Indietro'}
                    </button>

                    <button
                        type={isLastStep ? 'submit' : 'button'}
                        onClick={isLastStep ? undefined : handleNext}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
                    >
                        {isLastStep ? 'Invia domanda' : 'Continua'}
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};

export default FormContainer;
