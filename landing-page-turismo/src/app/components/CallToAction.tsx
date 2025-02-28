'use client';

import React, { useState } from 'react';
import AnimatedButton from './ui/AnimatedButton';
import { motion } from 'framer-motion';
import { FormDialog } from './form/FormDialog';

export default function CallToAction() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Sfondo animato */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full opacity-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Scopri se la tua Impresa è Ammissibile
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Compila il form e scopri subito se la tua impresa può accedere ai finanziamenti
          </p>
          
          <div className="flex justify-center mb-12">
            <AnimatedButton onClick={() => setIsFormOpen(true)}>
              Verifica Ammissibilità
            </AnimatedButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Finanziamenti Disponibili</h3>
              <p className="text-gray-600">
                Accedi a finanziamenti dedicati per la tua impresa turistica
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verifica Immediata</h3>
              <p className="text-gray-600">
                Scopri subito se la tua impresa può accedere ai finanziamenti
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Supporto Dedicato</h3>
              <p className="text-gray-600">
                Ricevi assistenza personalizzata durante tutto il processo
              </p>
            </div>
          </div>
        </div>
      </div>

      <FormDialog 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </section>
  );
} 