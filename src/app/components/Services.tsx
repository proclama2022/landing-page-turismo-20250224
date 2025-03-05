'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimateWhenVisible from './AnimateWhenVisible';

export default function BandoAreas() {
  const sectionRef = useRef<HTMLElement>(null);

  // Assicura che la sezione non causi uno scroll automatico all'avvio
  useEffect(() => {
    if (sectionRef.current && window.location.hash === '#bando-areas') {
      // Rimuove l'hash dall'URL senza causare uno scroll
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <section ref={sectionRef} id="bando-areas" className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimateWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Aree di intervento finanziabili
            </h2>
            <div className="h-1 bg-yellow-400 mx-auto mb-6" style={{ width: '120px' }} />
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-semibold">
              Bando Turismo Sicilia 2025
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-4">
              Scopri le opportunità di finanziamento per la tua impresa turistica in Sicilia: ampliamento, ammodernamento e ristrutturazione, realizzazione di nuove strutture e recupero di immobili esistenti, digitalizzazione e destagionalizzazione dell'offerta.
            </p>
          </div>
        </AnimateWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimateWhenVisible>
            <motion.div 
              className="bg-yellow-400 text-black rounded-xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="h-full w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="NUOVE STRUTTURE"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-400 to-transparent opacity-90" />
                </div>
                <div className="absolute bottom-0 left-0 p-4 z-10">
                  <div className="bg-yellow-400 rounded-full p-3 inline-block text-black">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">NUOVE STRUTTURE</h3>
                <p className="text-lg text-gray-700">
                  Supporto per la realizzazione di nuove imprese e strutture ricettive innovative nel settore dell'ospitalità siciliana, in linea con le tendenze del mercato.
                </p>
              </div>
            </motion.div>
          </AnimateWhenVisible>

          <AnimateWhenVisible>
            <motion.div 
              className="bg-gray-800 text-white rounded-xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="h-full w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="DIGITALIZZAZIONE"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-90" />
                </div>
                <div className="absolute bottom-0 left-0 p-4 z-10">
                  <div className="bg-yellow-400 rounded-full p-3 inline-block text-black">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">DIGITALIZZAZIONE</h3>
                <p className="text-lg text-gray-300">
                  Finanziamenti per l'implementazione di soluzioni digitali e innovazione tecnologica nelle strutture turistiche siciliane, per migliorare la competitività.
                </p>
              </div>
            </motion.div>
          </AnimateWhenVisible>

          <AnimateWhenVisible>
            <motion.div 
              className="bg-white text-black border border-gray-200 rounded-xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="h-full w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="ATTIVITÀ TURISTICHE"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-90" />
                </div>
                <div className="absolute bottom-0 left-0 p-4 z-10">
                  <div className="bg-yellow-400 rounded-full p-3 inline-block text-black">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">ATTIVITÀ TURISTICHE</h3>
                <p className="text-lg text-gray-700">
                  Tour operator, agenzie di viaggio, servizi di noleggio, aziende di trasporto turistico e altre imprese del settore turistico siciliano. Alberghi e strutture ricettive, ostelli, rifugi e campeggi.
                </p>
              </div>
            </motion.div>
          </AnimateWhenVisible>

          <AnimateWhenVisible>
            <motion.div 
              className="bg-black text-white rounded-xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="h-full w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="SOSTENIBILITÀ AMBIENTALE"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90" />
                </div>
                <div className="absolute bottom-0 left-0 p-4 z-10">
                  <div className="bg-yellow-400 rounded-full p-3 inline-block text-black">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">SOSTENIBILITÀ AMBIENTALE</h3>
                <p className="text-lg text-gray-300">
                  Progetti che migliorano l'efficienza energetica e riducono l'impatto ambientale delle strutture turistiche siciliane, contribuendo alla transizione ecologica.
                </p>
              </div>
            </motion.div>
          </AnimateWhenVisible>
        </div>

        <AnimateWhenVisible>
          <div className="mt-16 text-center">
            <motion.a
              href="#eligibility"
              className="inline-flex items-center px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Verifica la tua idoneità
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </AnimateWhenVisible>
      </div>
    </section>
  );
} 