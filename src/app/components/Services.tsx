import React from 'react';

const interventionAreas = [
  {
    title: 'NUOVE STRUTTURE',
    description: 'Supporto per la realizzazione di nuove imprese e strutture ricettive innovative nel settore dell\'ospitalità siciliana, in linea con le tendenze del mercato.',
    bgColor: 'bg-yellow-400', // Giallo
    textColor: 'text-black',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'DIGITALIZZAZIONE',
    description: 'Finanziamenti per l\'implementazione di soluzioni digitali e innovazione tecnologica nelle strutture turistiche siciliane, per migliorare la competitività.',
    bgColor: 'bg-gray-500', // Grigio
    textColor: 'text-white',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'ATTIVITÀ TURISTICHE',
    description: 'Tour operator, agenzie di viaggio, servizi di noleggio, aziende di trasporto turistico e altre imprese del settore turistico siciliano. Alberghi e strutture ricettive, ostelli, rifugi e campeggi.',
    bgColor: 'bg-white', // Bianco
    textColor: 'text-black',
    borderClass: 'border border-gray-200',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: 'SOSTENIBILITÀ AMBIENTALE',
    description: 'Progetti che migliorano l\'efficienza energetica e riducono l\'impatto ambientale delle strutture turistiche siciliane, contribuendo alla transizione ecologica.',
    bgColor: 'bg-black', // Nero
    textColor: 'text-white',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
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
            Scopri le opportunità di finanziamento per la tua impresa turistica in Sicilia: ampliamento, ammodernamento e ristrutturazione, realizzazione di nuove strutture e recupero di immobili esistenti, digitalizzazione e destagionalizzazione dell'offerta.
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