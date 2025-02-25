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
      answer: "Possono partecipare al bando le micro, piccole e medie imprese turistiche con sede o unità operative in Sicilia, incluse strutture ricettive, attività di ristorazione legate al turismo, servizi turistici e operatori del settore."
    },
    {
      question: "Qual è l'importo massimo finanziabile?",
      answer: "Il bando prevede un finanziamento a fondo perduto fino all'80% delle spese ammissibili, con un importo massimo di 500.000 euro per progetto, a seconda della tipologia di intervento e delle caratteristiche dell'impresa richiedente."
    },
    {
      question: "Quali spese sono ammissibili al finanziamento?",
      answer: "Sono ammissibili le spese per ristrutturazione e ammodernamento delle strutture, acquisto di attrezzature, digitalizzazione, interventi per la sostenibilità ambientale, formazione del personale e consulenze strategiche legate al progetto presentato."
    },
    {
      question: "Entro quando è possibile presentare la domanda?",
      answer: "Le domande possono essere presentate a partire dal 1° febbraio 2025 fino al 30 aprile 2025, salvo esaurimento fondi. È consigliabile procedere il prima possibile alla preparazione della documentazione necessaria."
    },
    {
      question: "Come si presenta la domanda di finanziamento?",
      answer: "La domanda va presentata esclusivamente attraverso la piattaforma telematica regionale, previa registrazione e autenticazione. È necessario allegare un progetto dettagliato, preventivi di spesa e tutta la documentazione richiesta dal bando."
    },
    {
      question: "Quanto tempo occorre per ricevere l'esito della domanda?",
      answer: "I tempi di valutazione delle domande sono stimati in circa 60-90 giorni dalla chiusura del bando. La graduatoria provvisoria verrà pubblicata sul sito istituzionale della Regione Siciliana."
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
            Trova le risposte alle domande più frequenti sul Bando Turismo Sicilia 2025
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