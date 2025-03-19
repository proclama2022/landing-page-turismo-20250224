'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimateWhenVisible from './AnimateWhenVisible';
import FormModal from './form/FormModal';

export default function Eligibility() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const requirements = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      ),
      title: "Imprese del settore turistico",
      description: "Imprese di qualsiasi dimensione con sede legale o operativa in Sicilia, che abbiano o attivino codici ATECO prevalenti nel settore alberghiero ed extra-alberghiero (55.10.00, 55.20.10, 55.20.20, 55.20.30, 55.20.51, 55.30 - Aree di campeggio e aree attrezzate per camper e roulotte)."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
      title: "Programmi di spesa ammissibili",
      description: "Ampliamento, ammodernamento e ristrutturazione di strutture esistenti, realizzazione di nuove strutture o recupero di immobili non ultimati, con possibilità di includere servizi funzionali collegati alla struttura ricettiva principale."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      title: "Requisiti finanziari",
      description: "Capacità di copertura finanziaria dell'iniziativa (IVA compresa) al netto del contributo richiesto, attestata da Istituti bancari, intermediari finanziari o Consorzi Fidi. Regolarità con il pagamento degli oneri contributivi e assistenziali."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      title: "Conformità normativa",
      description: "Regolarità con normative edilizie, urbanistiche, del lavoro, prevenzione infortuni e salvaguardia dell'ambiente. Assenza di procedure concorsuali e pieno esercizio dei propri diritti. Conformità alla normativa antimafia."
    }
  ];

  return (
    <section id="eligibility" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <AnimateWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Requisiti di Ammissibilità
            </h2>
            <div className="h-1 bg-yellow-400 mx-auto mb-6" style={{ width: '120px' }} />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Verifica se la tua impresa soddisfa i requisiti per accedere ai finanziamenti del Bando Turismo Sicilia 2025 (DDG n. 4613/S11 del 19/12/2024)
            </p>
          </div>
        </AnimateWhenVisible>

        <div className="max-w-4xl mx-auto">
          {requirements.map((req, index) => (
            <AnimateWhenVisible key={index} delay={0.2 * (index + 1)}>
              <motion.div
                className="flex mb-8 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                whileHover={{ scale: 1.02, translateX: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-2xl flex items-center justify-center text-white mr-6 flex-shrink-0 shadow-lg transform -rotate-6">
                  {req.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{req.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{req.description}</p>
                </div>
              </motion.div>
            </AnimateWhenVisible>
          ))}
        </div>

        <AnimateWhenVisible delay={1}>
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-2xl max-w-3xl mx-auto mb-8">
              <p className="text-lg text-gray-700 mb-6">
                Non sei sicuro di soddisfare tutti i requisiti? I nostri consulenti possono aiutarti a valutare la tua situazione e trovare soluzioni personalizzate.
              </p>
            </div>
            <motion.button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-black text-white font-bold rounded-xl shadow-xl hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Verifica la tua ammissibilità
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </div>
        </AnimateWhenVisible>
      </div>
    </section>
    <FormModal isOpen={isModalOpen} onClose={closeModal} />
  );
} 