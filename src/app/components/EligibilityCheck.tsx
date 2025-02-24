'use client';

import React, { useState } from 'react';
import { Modal } from './ui/Modal';

interface EligibilityCheckProps {
  isOpen: boolean;
  onClose: () => void;
  onEligible: () => void;
}

interface Step {
  question: string;
  description: string;
  field: string;
  isNegative: boolean;
}

export function EligibilityCheck({ isOpen, onClose, onEligible }: EligibilityCheckProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    isRegistered: false,
    hasClassificationRequirements: false,
    hadGrantRevocation: false,
    hasRelocated24Months: false,
  });

  const steps: Step[] = [
    {
      question: "La tua struttura è regolarmente registrata?",
      description: "Per partecipare al bando, la tua struttura deve essere regolarmente registrata e operativa.",
      field: "isRegistered",
      isNegative: false
    },
    {
      question: "La struttura soddisfa i requisiti di classificazione?",
      description: "Verifica che la tua struttura rientri nelle categorie ammesse dal bando.",
      field: "hasClassificationRequirements",
      isNegative: false
    },
    {
      question: "Hai avuto revoche di contributi pubblici?",
      description: "La revoca di contributi pubblici negli ultimi 5 anni può compromettere l'ammissibilità.",
      field: "hadGrantRevocation",
      isNegative: true
    },
    {
      question: "Hai delocalizzato l'attività di recente?",
      description: "La delocalizzazione negli ultimi 24 mesi può influire sull'ammissibilità al bando.",
      field: "hasRelocated24Months",
      isNegative: true
    }
  ];

  const handleAnswer = (answer: boolean) => {
    const currentField = steps[currentStep].field as keyof typeof answers;
    const isNegative = steps[currentStep].isNegative;
    
    // Se la risposta a una domanda negativa è sì, o a una positiva è no, l'utente non è idoneo
    if ((isNegative && answer) || (!isNegative && !answer)) {
      setAnswers(prev => ({ ...prev, [currentField]: answer }));
      onClose();
      alert('Ci dispiace, ma in base alle risposte fornite la tua struttura non sembra essere idonea al finanziamento. Contattaci per valutare alternative.');
      return;
    }

    setAnswers(prev => ({ ...prev, [currentField]: answer }));
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Se arriviamo qui, l'utente ha risposto correttamente a tutte le domande
      onEligible();
      onClose();
    }
  };

  const currentQuestion = steps[currentStep];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Verifica la tua Idoneità"
    >
      <div className="w-full">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        <div className="text-center mb-8">
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            {currentQuestion.question}
          </h4>
          <p className="text-gray-600">
            {currentQuestion.description}
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleAnswer(false)}
            className="px-8 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            No
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Sì
          </button>
        </div>

        <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
          <span>Domanda {currentStep + 1} di {steps.length}</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Annulla
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-500 text-center">
          Questa è una pre-valutazione indicativa. La valutazione finale dipenderà dalla verifica completa dei requisiti.
        </p>
      </div>
    </Modal>
  );
} 