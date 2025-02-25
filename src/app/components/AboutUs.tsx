'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Management Advisor</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Il partner ideale per accedere ai finanziamenti del Bando Turismo Sicilia 2025
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-semibold text-black mb-4">Perché sceglierci</h3>
            <p className="text-gray-600 mb-6">
              Management Advisor è specializzata nell'assistere le imprese turistiche siciliane nell'accesso ai fondi del Bando Turismo 2025. 
              Siamo problem solver, coach e advisor per le imprese, aiutandole a massimizzare le opportunità di finanziamento.
            </p>
            
            <h3 className="text-2xl font-semibold text-black mb-4">Esperienza nel settore turistico</h3>
            <p className="text-gray-600 mb-6">
              Con una profonda conoscenza del settore turistico siciliano, offriamo consulenza specializzata per strutture ricettive, 
              tour operator e imprese del comparto che desiderano accedere ai finanziamenti del Bando Turismo Sicilia 2025.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="text-black font-bold text-3xl">100+</div>
                <div className="text-gray-600">Progetti finanziati</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="text-black font-bold text-3xl">95%</div>
                <div className="text-gray-600">Tasso di successo</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="text-black font-bold text-3xl">10+</div>
                <div className="text-gray-600">Anni di esperienza</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="text-black font-bold text-3xl">8M</div>
                <div className="text-gray-600">Euro ottenuti per i clienti</div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image 
              src="https://placehold.co/600x400/333333/FFFFFF?text=Team+Management+Advisor" 
              alt="Il team di Management Advisor" 
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-xl"
            />
          </div>
        </div>
        
        <div className="mt-16 bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-2xl font-semibold text-black mb-6 text-center">I nostri servizi per il Bando Turismo Sicilia 2025</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-yellow-50 rounded-lg text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Valutazione di ammissibilità</h4>
              <p className="text-gray-600">Analizziamo la tua azienda per verificare l'idoneità ai finanziamenti del bando</p>
            </div>
            
            <div className="p-6 bg-gray-100 rounded-lg text-center">
              <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Preparazione documentazione</h4>
              <p className="text-gray-600">Gestiamo tutta la documentazione necessaria per presentare la domanda di finanziamento</p>
            </div>
            
            <div className="p-6 bg-gray-900 rounded-lg text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">Monitoraggio e rendicontazione</h4>
              <p className="text-gray-400">Ti seguiamo in tutte le fasi post-approvazione fino all'erogazione dei fondi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 