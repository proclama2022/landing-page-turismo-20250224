'use client';

import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        type="button"
        className="flex w-full justify-between items-center text-left font-medium text-gray-900 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{question}</span>
        <svg
          className={`w-5 h-5 text-yellow-500 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          <p className="text-base">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default function FAQ() {
  const faqs = [
    {
      question: "Chi può partecipare al Bando Turismo Sicilia 2025?",
      answer: "Possono partecipare imprese di qualsiasi dimensione con sede legale o operativa in Sicilia, che abbiano o attivino codici ATECO prevalenti nel settore alberghiero ed extra-alberghiero (55.10.00 - Alberghi, 55.20.10 - Villaggi turistici, 55.20.20 - Ostelli della gioventù, 55.20.30 - Rifugi di montagna, 55.20.51 - Affittacamere, case vacanze, B&B, residence)."
    },
    {
      question: "Qual è l'importo massimo finanziabile?",
      answer: "Il bando prevede due regimi di aiuto: 1) In regime 'De minimis' contributi da 50.000€ a 300.000€ con intensità massima dell'80% della spesa ammissibile; 2) In regime di 'Esenzione' contributi da 300.000,01€ a 3.500.000€ con intensità fino al 60% per micro e piccole imprese, 50% per medie imprese e 40% per grandi imprese."
    },
    {
      question: "Quali spese sono ammissibili al finanziamento?",
      answer: "Sono ammissibili: consulenze specialistiche (max 2%), oneri di progettazione (max 4%), acquisto di suolo/immobili/strutture e lavori di ristrutturazione (max 70% dell'investimento, di cui max 30% per acquisti), programmi informatici (max 20%), acquisto di macchinari, impianti, arredi e attrezzature nuove di fabbrica."
    },
    {
      question: "Quali sono i programmi di spesa agevolabili?",
      answer: "Sono agevolabili: 1) Ampliamento, ammodernamento e ristrutturazione di strutture esistenti; 2) Realizzazione di nuove strutture o attività con cambio di destinazione d'uso di immobili esistenti; 3) Recupero fisico e/o funzionale di immobili o strutture turistiche legittimamente iniziate e non ultimate."
    },
    {
      question: "Come avviene l'erogazione del contributo?",
      answer: "L'erogazione avviene su richiesta del beneficiario in base allo stato di avanzamento lavori (SAL), per importi non inferiori al 20% della somma totale. È possibile richiedere un'anticipazione fino al 30% dell'agevolazione, previa presentazione di polizza fideiussoria. Il saldo finale non può essere inferiore al 10% della somma totale ammessa."
    },
    {
      question: "Qual è la durata massima del piano di investimento?",
      answer: "Il piano di investimento deve avere una durata massima di 24 mesi dalla data di notifica del provvedimento di concessione, con possibilità di richiedere una proroga di massimo 6 mesi. L'investimento dovrà essere concluso, proroga compresa, entro e non oltre il 31 dicembre 2028."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Domande Frequenti sul Bando
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Trova le risposte alle domande più frequenti sul Bando Turismo Sicilia 2025 (DDG n. 4613/S11 del 19/12/2024)
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-4">
              Hai altre domande sul Bando Turismo Sicilia 2025?
            </p>
            <a
              href="#contact"
              className="inline-block px-6 py-3 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors duration-300"
            >
              Contattaci
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 