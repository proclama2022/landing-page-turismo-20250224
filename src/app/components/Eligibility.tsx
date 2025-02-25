'use client';

import React from 'react';

interface EligibilityCriterion {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Eligibility() {
  const criteria: EligibilityCriterion[] = [
    {
      title: "Imprese del settore turistico",
      description: "Imprese di qualsiasi dimensione con sede legale o operativa in Sicilia, che abbiano o attivino codici ATECO prevalenti nel settore alberghiero ed extra-alberghiero (55.10.00, 55.20.10, 55.20.20, 55.20.30, 55.20.51).",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "Programmi di spesa ammissibili",
      description: "Ampliamento, ammodernamento e ristrutturazione di strutture esistenti, realizzazione di nuove strutture o recupero di immobili non ultimati, con possibilità di includere servizi funzionali collegati alla struttura ricettiva principale.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Requisiti finanziari",
      description: "Capacità di copertura finanziaria dell'iniziativa (IVA compresa) al netto del contributo richiesto, attestata da Istituti bancari, intermediari finanziari o Consorzi Fidi. Regolarità con il pagamento degli oneri contributivi e assistenziali.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Conformità normativa",
      description: "Regolarità con normative edilizie, urbanistiche, del lavoro, prevenzione infortuni e salvaguardia dell'ambiente. Assenza di procedure concorsuali e pieno esercizio dei propri diritti. Conformità alla normativa antimafia.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="eligibility" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Requisiti di Ammissibilità
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Verifica se la tua impresa soddisfa i requisiti per accedere ai finanziamenti del Bando Turismo Sicilia 2025 (DDG n. 4613/S11 del 19/12/2024)
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {criteria.map((criterion, index) => (
            <div key={index} className="flex mb-8 bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mr-4 flex-shrink-0">
                {criterion.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{criterion.title}</h3>
                <p className="text-gray-600">{criterion.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Non sei sicuro di soddisfare tutti i requisiti? I nostri consulenti possono aiutarti a valutare la tua situazione e trovare soluzioni personalizzate.
          </p>
          <a
            href="#form"
            className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-300"
          >
            Verifica la tua ammissibilità
          </a>
        </div>
      </div>
    </section>
  );
} 