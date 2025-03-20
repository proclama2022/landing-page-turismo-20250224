'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimateWhenVisible from './AnimateWhenVisible';
import Link from 'next/link';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      category: "Partecipazione",
      questions: [
        {
          q: "Chi può partecipare al Bando Turismo Sicilia 2025?",
          a: "Possono partecipare le imprese di qualsiasi dimensione con sede legale o operativa in Sicilia, operanti nel settore turistico-ricettivo con codici ATECO specifici (55.10.00, 55.20.10, 55.20.20, 55.20.30, 55.20.51, 55.30). Le imprese devono essere già costituite al momento della presentazione della domanda e dimostrare capacità di copertura finanziaria dell'investimento."
        },
        {
          q: "Qual è l'importo massimo finanziabile?",
          a: "Il bando prevede due regimi di aiuto: 1) Regime 'De Minimis': investimenti da €50.000 a €300.000, con copertura fino all'80% delle spese ammissibili. 2) Regime 'Esenzione': investimenti da €300.000,01 fino a €3.500.000, con copertura del 60% per micro e piccole imprese, 50% per medie imprese e 40% per grandi imprese."
        }
      ]
    },
    {
      category: "Spese e Finanziamenti",
      questions: [
        {
          q: "Quali spese sono ammissibili al finanziamento?",
          a: "Sono ammissibili: 1) Acquisto di immobili e opere edilizie (max 70% dell'investimento, di cui max 30% per suolo e immobili), 2) Macchinari, arredi e attrezzature nuove di fabbrica, 3) Programmi informatici e software (max 20% dell'investimento), 4) Consulenze specialistiche (max 2% dell'investimento), 5) Progettazione e direzione lavori (max 4% dell'investimento). Non sono ammissibili: macchinari e attrezzature usate, beni di importo inferiore a €500, spese interne."
        },
        {
          q: "Quali sono i criteri di valutazione del progetto?",
          a: "I principali criteri sono: 1) Generazione di nuova occupazione, 2) Sostenibilità ambientale degli investimenti, 3) Localizzazione in aree rurali, isole minori o zone a bassa intensità ricettiva, 4) Percentuale di investimento in macchinari, impianti, attrezzature e arredi, 5) Recupero di immobili degradati o dismessi."
        }
      ]
    },
    {
      category: "Tempistiche e Modalità",
      questions: [
        {
          q: "Come avviene l'erogazione del contributo?",
          a: "L'erogazione avviene in più tranche: un anticipo iniziale previa presentazione di fideiussione, stati di avanzamento lavori intermedi e saldo finale dopo la verifica della documentazione. Tutti i pagamenti devono essere effettuati con modalità tracciabili."
        },
        {
          q: "Quali sono i requisiti per partecipare?",
          a: "I requisiti principali sono: 1) Sede legale o operativa in Sicilia, 2) Essere in regola con la normativa edilizia e urbanistica, 3) DURC regolare, 4) Rispetto dei requisiti antimafia, 5) Solidità economico-finanziaria dimostrabile anche tramite lettere di credenziali bancarie, 6) Non trovarsi in stato di difficoltà secondo la definizione UE."
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <AnimateWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Domande Frequenti sul Bando
            </h2>
            <div className="h-1 bg-yellow-400 mx-auto mb-6" style={{ width: '120px' }} />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trova le risposte alle domande più frequenti sul Bando Turismo Sicilia 2025 (DDG n. 4613/S11 del 19/12/2024)
            </p>
          </div>
        </AnimateWhenVisible>

        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <AnimateWhenVisible>
            <div className="mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cerca nelle FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition-all duration-300 pl-14"
                />
                <svg
                  className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </AnimateWhenVisible>

          {/* FAQ Categories */}
          {filteredFaqs.map((category, categoryIndex) => (
            <AnimateWhenVisible key={categoryIndex} delay={0.2 * categoryIndex}>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{category.category}</h3>
                <div className="space-y-4">
                  {category.questions.map((faq, index) => {
                    const isOpen = openIndex === categoryIndex * 100 + index;
                    return (
                      <motion.div
                        key={index}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                        initial={false}
                      >
                        <button
                          className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                          onClick={() => setOpenIndex(isOpen ? null : categoryIndex * 100 + index)}
                        >
                          <span className="text-lg font-semibold text-gray-900">{faq.q}</span>
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0 ml-4"
                          >
                            <svg
                              className="w-6 h-6 text-yellow-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-4 text-gray-600 text-lg leading-relaxed border-t border-gray-100">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </AnimateWhenVisible>
          ))}
        </div>

        {/* Contact Section */}
        <AnimateWhenVisible delay={0.8}>
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-2xl max-w-3xl mx-auto mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Hai altre domande sul Bando Turismo Sicilia 2025?
              </h3>
              <p className="text-lg text-gray-700">
                I nostri consulenti sono a tua disposizione per fornirti tutte le informazioni necessarie
              </p>
            </div>
            <Link href="#contact">
              <motion.button
                className="inline-flex items-center px-8 py-4 bg-black text-white font-bold rounded-xl shadow-xl hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Contattaci
                <svg
                  className="w-6 h-6 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </motion.button>
            </Link>
          </div>
        </AnimateWhenVisible>
      </div>
    </section>
  );
} 