'use client';

import React from 'react';

const FundingOptionsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Opzioni di Finanziamento
        </h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Regime De Minimis */}
            <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl shadow-lg border border-blue-100">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Regime De Minimis
                </h3>
                <p className="text-foreground">
                  Ideale per progetti di dimensioni contenute con procedure semplificate
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-foreground">Contributo fino all'80% delle spese</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-foreground">Investimento massimo: 300.000€</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-foreground">Investimento minimo: 50.000€</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Vantaggi:</h4>
                <ul className="space-y-2 text-foreground">
                  <li>• Procedura semplificata</li>
                  <li>• Percentuale di contributo più alta</li>
                  <li>• Tempi di valutazione ridotti</li>
                </ul>
              </div>
            </div>

            {/* Regime Ordinario */}
            <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Regime Ordinario
                </h3>
                <p className="text-foreground">
                  Per progetti di maggiore entità con contributi differenziati
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-foreground">Investimento fino a 3,5 milioni €</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-foreground">Micro e piccole imprese: 60%</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-foreground">Medie imprese: 50%</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-foreground">Grandi imprese: 40%</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Ideale per:</h4>
                <ul className="space-y-2 text-foreground">
                  <li>• Progetti di ampia portata</li>
                  <li>• Ristrutturazioni complete</li>
                  <li>• Costruzioni ex novo</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Budget Totale */}
          <div className="mt-12 bg-gray-800 text-white p-6 rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-2">
              Dotazione Finanziaria Totale
            </h3>
            <p className="text-3xl font-bold text-white">
              135 Milioni di Euro
            </p>
            <p className="mt-2 text-white">
              Finanziato dal Fondo Sviluppo e Coesione (FSC) 2021-2027
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundingOptionsSection;
