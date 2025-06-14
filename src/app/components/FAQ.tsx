'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import AnimateWhenVisible from './AnimateWhenVisible';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs: FAQCategory[] = [
    {
      category: 'Partecipazione',
      questions: [
        {
          q: 'Chi può partecipare al bando?',
          a: 'Possono partecipare micro, piccole e medie imprese (MPMI) e grandi imprese (GI) siciliane del settore turistico, come definite nell’Allegato 1 del Reg. UE n. 651/2014 e loro aggregazioni (consorzi, reti d\'impresa, società consortili e cooperative). Sono esclusi quali beneficiari del presente Avviso gli “alloggi glamping”, ancorché previsti dal codice ATECO 55.30.02, poiché non rientranti nella classificazione di cui alla L.R. n. 6 del 25.02.2025 e di cui al relativo decreto attuativo.',
        },
        {
          q: 'Ci sono incompatibilità per chi presenta domanda?',
          a: 'Sì, non possono partecipare le imprese che hanno già ricevuto aiuti dichiarati incompatibili dalla Commissione Europea, o che sono in stato di fallimento, liquidazione coatta, concordato preventivo (salvo continuità aziendale), o destinatarie di sanzioni interdittive. Inoltre, il titolare, ovvero i soci anche di minoranza, gli amministratori o il legale rappresentante, rispettivamente della ditta individuale o della società richiedente il contributo non devono rivestire alcune di tali cariche di socio, amministratore o legale rappresentante di altra società o titolare di altra ditta individuale che presenti analoga domanda per le agevolazioni.',
        },
        {
          q: 'Quali sono i requisiti per le imprese?',
          a: 'Le imprese devono essere regolarmente costituite e iscritte al Registro delle Imprese, avere sede operativa in Sicilia, essere in regola con gli obblighi contributivi e fiscali, e non trovarsi in situazioni di difficoltà finanziaria (secondo la definizione UE).',
        },
      ],
    },
    {
      category: 'Spese e Finanziamenti',
      questions: [
        {
          q: 'Qual è l’importo del finanziamento?',
          a: 'Il contributo è concesso per un importo minimo pari ad € 50.000,00 ed entro il limite massimo di € 3.500.000,00 per domanda di finanziamento.',
        },
        {
          q: 'Quali spese sono ammissibili?',
          a: 'Sono ammissibili costi per investimenti materiali (terreni, immobili e impianti, macchinari e attrezzature) e immateriali (diritti di brevetto, licenze, know-how o altre forme di proprietà intellettuale) alle condizioni stabilite dall\'articolo 14 del Regolamento (UE) n. 651/2014. Le spese per programmi informatici rientrano in queste categorie. Vincoli specifici: consulenze specialistiche, studi di fattibilità, certificazioni (max 2% dell\'investimento); progettazione, direzione lavori, collaudi (max 4% dell\'investimento); acquisto suolo aziendale, fabbricati, immobili, ristrutturazioni, ecc. (max 70% dell\'investimento, con acquisto di suolo/immobili/strutture preesistenti max 30% dell\'investimento). Gli attivi devono essere nuovi e restare associati al progetto per otto anni.',
        },
        {
          q: 'Come viene calcolata la percentuale di copertura?',
          // La scheda fornita non dettaglia le percentuali di copertura in base alla dimensione dell'impresa come nel precedente bando. Si mantiene l'informazione precedente con una nota di possibile variazione o si rimuove/generalizza.
          // Per ora, generalizziamo basandoci sul fatto che il bando è per MPMI e GI.
          a: 'L\'intensità dell\'aiuto rispetta i limiti previsti dal regime de minimis (Regolamento (UE) 2023/2831) o dal regime di esenzione (Regolamento (UE) 651/2014, art. 14). Le specifiche percentuali di copertura possono variare.',
        },
      ],
    },
    {
      category: 'Tempistiche e Modalità',
      questions: [
        {
          q: 'Quando scade il bando?',
          a: 'Le date di apertura e chiusura del bando saranno definite con la pubblicazione dell\'Avviso pubblico. Al momento non sono ancora state comunicate.',
        },
        {
          q: 'Come avviene la valutazione dei progetti?',
          a: 'La valutazione avviene tramite una procedura a sportello valutativo secondo l’ordine cronologico di presentazione. I criteri includono la qualità della proposta, l’innovatività, la sostenibilità e l’impatto occupazionale. A parità di punteggio, saranno avvantaggiati coloro che faranno richiesta di finanziamento di minore importo, e successivamente le imprese giovanili (titolare o soci con età inferiore a 46 anni) o femminili (imprese a prevalente partecipazione femminile).',
        },
        {
          q: 'Quali sono i tempi per la realizzazione del progetto?',
          // La scheda fornita non indica i tempi di realizzazione. Manteniamo i tempi precedenti se sono ancora validi, altrimenti indichiamo che saranno definiti.
          a: 'I tempi per la realizzazione del progetto saranno definiti nell\'Avviso pubblico. (Precedentemente: I progetti devono essere completati entro 18 mesi dalla data di concessione del contributo, con possibilità di proroga motivata di ulteriori 6 mesi).',
        },
      ],
    },
  ];

  const filteredFaqs = faqs
    .map(category => ({
      ...category,
      questions: category.questions.filter(
        faq =>
          faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(category => category.questions.length > 0);

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
              Trova le risposte alle domande più frequenti sul Bando Turismo Sicilia (FSC 2021-2027)
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
                              animate={{ height: 'auto', opacity: 1 }}
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
                Hai altre domande sul Bando Turismo Sicilia?
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
};

export default FAQ;