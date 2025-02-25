import React from 'react';

const interventionAreas = [
  {
    title: 'AMPLIAMENTO E AMMODERNAMENTO',
    description: 'Finanziamenti per l\'ammodernamento, la ristrutturazione e l\'ampliamento di strutture turistiche esistenti in Sicilia, con particolare attenzione alla sostenibilità.',
    bgColor: 'bg-yellow-400', // Giallo
    textColor: 'text-black',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'NUOVE STRUTTURE',
    description: 'Supporto per la realizzazione di nuove imprese e strutture ricettive innovative nel settore dell\'ospitalità siciliana, in linea con le tendenze del mercato.',
    bgColor: 'bg-gray-500', // Grigio
    textColor: 'text-white',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'DIGITALIZZAZIONE',
    description: 'Finanziamenti per l\'implementazione di soluzioni digitali e innovazione tecnologica nelle strutture turistiche siciliane, per migliorare la competitività.',
    bgColor: 'bg-white', // Bianco
    textColor: 'text-black',
    borderClass: 'border border-gray-200',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'DESTAGIONALIZZAZIONE',
    description: 'Incentivi per progetti che mirano alla destagionalizzazione dell\'offerta turistica in Sicilia, ampliando i servizi e le attività per tutto l\'anno.',
    bgColor: 'bg-black', // Nero
    textColor: 'text-white',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function BandoAreas() {
  return (
    <section id="bando-areas" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Aree di intervento finanziabili
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Bando Turismo Sicilia 2025
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-4">
            Scopri le opportunità di finanziamento per la tua impresa turistica in Sicilia: ampliamento, ammodernamento, digitalizzazione e destagionalizzazione dell'offerta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 shadow-xl rounded-lg overflow-hidden">
          {interventionAreas.map((area, index) => (
            <div 
              key={index} 
              className={`${area.bgColor} ${area.textColor} ${area.borderClass || ''} p-12 flex flex-col justify-center items-center text-center transition-all duration-300 hover:opacity-90 hover:scale-[1.02] relative z-10 overflow-hidden`}
            >
              <div className="mb-6">
                {area.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{area.title}</h3>
              <p className="text-lg">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 