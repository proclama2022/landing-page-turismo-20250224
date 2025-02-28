'use client';

import React from 'react';

interface ApplicationProcessProps {
  onOpenForm: () => void;
}

export function ApplicationProcess({ onOpenForm }: ApplicationProcessProps) {
  const steps = [
    {
      title: 'Verifica Requisiti',
      description: 'Usa il nostro strumento di pre-valutazione per capire subito se la tua struttura è ammissibile al finanziamento.',
      icon: '✓',
      isNegative: false
    },
    {
      title: 'Non sei ammissibile?',
      description: 'Se la tua struttura non è ammissibile, ti spiegheremo il perché e ti daremo suggerimenti alternativi.',
      icon: '❌',
      isNegative: true
    },
    {
      title: 'Sei ammissibile?',
      description: 'Se la tua struttura è ammissibile, ti guideremo nel processo di richiesta del finanziamento.',
      icon: '📋',
      isNegative: false
    },
    {
      title: 'Richiedi una Consulenza',
      description: 'Parla con i nostri esperti per valutare al meglio la tua opportunità di finanziamento.',
      icon: '💬',
      isNegative: false
    }
  ];

  return (
    <div className="py-16 bg-white" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Come Procedere
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-foreground lg:mx-auto">
            Verifica subito se la tua attività è idonea al finanziamento
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up ${
                  step.isNegative ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className={`flex items-center justify-center h-12 w-12 rounded-md text-white text-xl ${
                      step.isNegative ? 'bg-red-500' : 'bg-primary'
                    }`}>
                      {step.icon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-foreground">
                      {step.title}
                    </dt>
                  </div>
                </div>
                <dd className="mt-2 text-base text-foreground">
                  {step.description}
                </dd>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenForm}
            className="btn-primary inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm hover:shadow-lg transition-all duration-200"
          >
            Verifica la tua Idoneità
          </button>
        </div>
      </div>
    </div>
  );
}
