'use client';

import React from 'react';
import FormModal from './form/FormModal';
import { useModal } from '@/app/ModalContext';
import { motion } from 'framer-motion';

export const SecondCallToAction = () => {
  const { openModal } = useModal();

  return (
    <section className="py-16 bg-gradient-to-tr from-blue-900 via-black to-blue-900 text-white relative overflow-hidden">
      {/* Elementi decorativi */}
      <motion.div 
        className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full filter blur-3xl opacity-10"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-yellow-400/20 rounded-full text-yellow-400 font-semibold mb-4">
            Opportunità Unica
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
            Scopri Subito se il Tuo Progetto è Finanziabile
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Non lasciare che questa occasione ti sfugga! Con il nostro sistema di valutazione rapida, 
            potrai sapere in pochi minuti se il tuo progetto ha le caratteristiche giuste per 
            ottenere fino all'80% di finanziamento a fondo perduto.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={openModal}
              className="bg-yellow-400 text-black font-semibold px-8 py-4 text-lg rounded-lg shadow-lg hover:bg-yellow-500 hover:shadow-yellow-400/20 transform hover:scale-105 transition-all duration-300"
            >
              Valuta Ora la Tua Idea
            </button>
          </div>

          <p className="mt-6 text-white/70 text-sm">
            Più di 100 imprenditori hanno già verificato la loro idoneità
          </p>
        </div>
      </div>

      <FormModal />
    </section>
  );
}; 