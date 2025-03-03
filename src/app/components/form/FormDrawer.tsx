'use client';

import React, { useState } from 'react';
import { FormState } from '@/types/form';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ProjectStep from './steps/ProjectStep';
import AdditionalInfoStep from './steps/AdditionalInfoStep';
import { X } from 'lucide-react';

interface FormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: {
    companyName: ''
  },
  vatNumber: '',
  contact: {
    name: '',
    surname: '',
    email: '',
    phone: '',
    role: []
  },
  eligibility: {
    isRegisteredOrWillBe: false,
    hadGrantRevocation: false,
    hasRelocated24Months: false,
    willNotRelocate24Months: false,
    isPartOfGroup: false
  },
  localUnit: {
    municipality: '',
    province: '',
    address: '',
    postalCode: ''
  },
  requirements: {
    businessRegistry: false,
    sicilianLocation: false,
    buildingCompliance: false,
    financialCapacity: false,
    contributionRegularity: false
  },
  investmentType: undefined,
  investmentPurpose: undefined,
  expenseTypes: [],
  investmentAmount: undefined,
  projectDescription: '',
  projectType: '',
  projectLocation: '',
  projectDuration: '',
  expenses: {},
  totalAmount: 0,
  fundingAmount: 0,
  regimeType: 'normal',
  documents: {
    businessPlan: false,
    technicalDocuments: false,
    permits: false,
    financialStatements: false
  },
  discoveryChannel: '',
  gdprConsent: false,
  marketingConsent: false,
  score: 0
};

export default function FormDrawer({ isOpen, onClose }: FormDrawerProps) {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    { title: 'Informazioni personali', component: PersonalInfoStep },
    { title: 'Progetto', component: ProjectStep },
    { title: 'Informazioni aggiuntive', component: AdditionalInfoStep },
  ];

  const updateFormData = (updates: Partial<FormState>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulazione di invio dati
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setCurrentStep(0);
    setIsSubmitted(false);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div
        className={`absolute top-0 right-0 h-full w-full md:w-[500px] bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Richiedi informazioni</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Chiudi"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Grazie per la tua richiesta!</h3>
                <p className="text-gray-600 max-w-md">
                  Abbiamo ricevuto le tue informazioni e ti contatteremo al più presto per discutere del tuo progetto.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Invia un'altra richiesta
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    {steps.map((step, index) => (
                      <React.Fragment key={index}>
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              index < currentStep
                                ? 'bg-blue-600 text-white'
                                : index === currentStep
                                ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {index < currentStep ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            ) : (
                              index + 1
                            )}
                          </div>
                          <span className="text-xs mt-1 text-gray-500">{step.title}</span>
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`flex-1 h-0.5 mx-2 ${
                              index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <CurrentStepComponent 
                  formData={formData} 
                  updateFormData={updateFormData} 
                  onChange={(name, value) => setFormData(prev => ({ ...prev, [name]: value }))}
                />
              </>
            )}
          </div>

          {!isSubmitted && (
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={`px-4 py-2 rounded-lg border border-gray-300 ${
                    currentStep === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } transition-colors duration-200`}
                >
                  Indietro
                </button>
                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Elaborazione...
                    </span>
                  ) : currentStep === steps.length - 1 ? (
                    'Invia richiesta'
                  ) : (
                    'Avanti'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
