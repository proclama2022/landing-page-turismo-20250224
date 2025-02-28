'use client';

import React, { useState, useEffect } from 'react';
import { FormState, DEFAULT_FORM_STATE } from '@/types/form';
import { cities, getCityScore } from '@/app/data/cityData';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ProjectStep from './steps/ProjectStep';
import AdditionalInfoStep from './steps/AdditionalInfoStep';
import { X } from 'lucide-react';

interface FormDrawerProps {
  isOpen: boolean;
  onClose: { (): void; (): Promise<void>; };
}

// Funzione per calcolare il punteggio totale
const calculateTotalScore = (formData: FormState): { total: number; breakdown: { [key: string]: number } } => {
  let score = {
    total: 0,
    breakdown: {
      areaIntervento: 0,
      occupazione: 0,
      investimento: 0,
      sostenibilita: 0,
      tipologiaIntervento: 0
    }
  };

  // Criterio E: Punteggio per l'area dell'intervento
  const selectedCity = cities.find(city => city.name === formData.city);
  if (selectedCity) {
    score.breakdown.areaIntervento = selectedCity.score;
  }

  // Criterio A: Occupazione
  if (formData.willHireEmployees) {
    score.breakdown.occupazione = 5;
  }

  // Criterio B: Investimento
  switch (formData.investmentAmount) {
    case 'fino100':
      score.breakdown.investimento = 15;
      break;
    case 'fino400':
      score.breakdown.investimento = 8;
      break;
    case 'fino1000':
      score.breakdown.investimento = 4;
      break;
    default:
      score.breakdown.investimento = 0;
  }

  // Criterio C: Tipologia intervento
  switch (formData.interventionType) {
    case 'recupero':
      score.breakdown.tipologiaIntervento = 7;
      break;
    case 'ampliamento':
      score.breakdown.tipologiaIntervento = 4;
      break;
    case 'nuova':
      score.breakdown.tipologiaIntervento = 4;
      break;
  }

  // Criterio D: Sostenibilità ambientale
  const sustainabilityOptions = formData.plannedExpenses.filter(expense => 
    ['relamping', 'domotica', 'solare termico', 'fotovoltaico', 'cappotto termico'].includes(expense)
  );
  score.breakdown.sostenibilita = sustainabilityOptions.length * 2;

  // Calcolo del totale
  score.total = Object.values(score.breakdown).reduce((a, b) => a + b, 0);

  return score;
};

export default function FormDrawer({ isOpen, onClose }: FormDrawerProps) {
  const [formData, setFormData] = useState<FormState>(DEFAULT_FORM_STATE);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<{ total: number; breakdown: { [key: string]: number } }>({ 
    total: 0, 
    breakdown: {} 
  });

  useEffect(() => {
    const newScore = calculateTotalScore(formData);
    setScore(newScore);
  }, [formData]);

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
    setFormData(DEFAULT_FORM_STATE);
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
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className={`w-full max-w-2xl bg-white rounded-xl shadow-xl transition-all duration-300 transform ${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <div className="flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Richiedi informazioni</h2>
                {!isSubmitted && (
                  <div className="mt-1 text-sm text-gray-600">
                    Punteggio totale: <span className="font-semibold">{score.total}</span> punti
                  </div>
                )}
              </div>
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
                  />
                </>
              )}
            </div>

            {!isSubmitted && (
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Dettaglio punteggio:</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>Area intervento: {score.breakdown.areaIntervento} punti</div>
                    <div>Occupazione: {score.breakdown.occupazione} punti</div>
                    <div>Investimento: {score.breakdown.investimento} punti</div>
                    <div>Sostenibilità: {score.breakdown.sostenibilita} punti</div>
                    <div>Tipologia intervento: {score.breakdown.tipologiaIntervento} punti</div>
                  </div>
                </div>
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
    </div>
  );
}
