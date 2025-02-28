import React from 'react';

export function BenefitsSection() {
  const benefits = [
    {
      title: 'Contributi a fondo perduto',
      description: 'Fino a € 3.500.000 di finanziamenti non rimborsabili per la tua struttura ricettiva.',
      icon: '💶'
    },
    {
      title: 'Ampia copertura',
      description: 'Finanziamento fino al 65% delle spese ammissibili per il tuo progetto.',
      icon: '📊'
    },
    {
      title: 'Flessibilità di utilizzo',
      description: 'Copertura di diverse tipologie di interventi, dalla ristrutturazione all\'innovazione.',
      icon: '🔄'
    },
    {
      title: 'Supporto completo',
      description: 'Assistenza tecnica durante tutto il processo di richiesta e realizzazione.',
      icon: '🤝'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Vantaggi del Bando
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-foreground lg:mx-auto">
            Scopri le opportunità di finanziamento per la tua struttura ricettiva
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-base text-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
