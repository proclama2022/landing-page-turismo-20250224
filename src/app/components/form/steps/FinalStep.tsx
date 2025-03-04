'use client';

import React from 'react';
import { FormState } from '@/types/form';

interface FinalStepProps {
  formData: FormState;
  updateFormData: (updates: Partial<FormState>) => void;
  score: number;
}

export default function FinalStep({ formData, updateFormData, score }: FinalStepProps) {
  // Funzione per formattare gli importi in valuta
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined || isNaN(value)) return '€0,00';
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);
  };

  // Calcoli finanziari
  const investmentAmount = formData.customInvestmentAmount || 0;
  const contributionAmount = investmentAmount * 0.8; // 80% contributo a fondo perduto
  const personalAmount = investmentAmount * 0.2; // 20% a carico del richiedente
  const ivaAmount = investmentAmount * 0.22; // 22% IVA
  const totalPersonalFunds = personalAmount + ivaAmount; // Totale fondi necessari
  
  // Costante per il limite massimo di investimento per il contributo pieno
  const MAX_INVESTMENT_FOR_FULL_CONTRIBUTION = 375000; // 300.000 / 0.8 = 375.000 (considerando l'80% di contributo)
  
  // Verifica se l'investimento supera il massimo per il contributo pieno
  const isOverMaxInvestment = investmentAmount > MAX_INVESTMENT_FOR_FULL_CONTRIBUTION;

  // Funzione per ottenere il testo del canale di scoperta
  const getDiscoveryChannelText = (channel: string) => {
    switch (channel) {
      case 'social': return 'Social Media';
      case 'search': return 'Motori di ricerca';
      case 'friend': return 'Passaparola';
      case 'event': return 'Eventi o fiere';
      case 'email': return 'Email marketing';
      case 'advertisement': return 'Pubblicità';
      case 'other': return 'Altro';
      default: return 'Non specificato';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Conferma</h2>
      <p className="mb-6">
        Controlla attentamente i dati inseriti prima di inviare la domanda.
      </p>
      
      {/* Riepilogo finanziario */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Riepilogo finanziario</h3>
        
        {isOverMaxInvestment && (
          <div className="mb-4 p-4 bg-amber-50 rounded-md border border-amber-200 animate__animated animate__fadeIn">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-base font-medium text-amber-800 mb-1">
                  Investimento superiore a €375.000
                </p>
                <p className="text-sm text-amber-700">
                  Il tuo investimento supera la soglia di €375.000 per cui è possibile ottenere il contributo massimo di €300.000 in regime de minimis. 
                  Per un'analisi personalizzata e per valutare le migliori opzioni di finanziamento, ti invitiamo a contattare il nostro team di esperti.
                </p>
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-700">
                    <strong>Nota:</strong> I calcoli mostrati di seguito sono indicativi. Per progetti di questa entità, offriamo consulenza personalizzata per ottimizzare la struttura del finanziamento e massimizzare i benefici.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Investimento totale</p>
              <p className="text-lg font-semibold">{formatCurrency(investmentAmount)}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Contributo a fondo perduto (80%)</p>
              <p className="text-lg font-semibold text-green-700">{formatCurrency(contributionAmount)}</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Quota a carico del richiedente (20%)</p>
              <p className="text-lg font-semibold text-blue-700">{formatCurrency(personalAmount)}</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">IVA da anticipare (22%)</p>
              <p className="text-lg font-semibold text-blue-700">{formatCurrency(ivaAmount)}</p>
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-base font-bold text-amber-800 mb-1">Fondi necessari da avere disponibili:</p>
                <p className="text-xl font-bold text-amber-800">{formatCurrency(totalPersonalFunds)}</p>
                <p className="text-sm text-amber-700 mt-2">
                  <strong>ATTENZIONE:</strong> Per realizzare questo investimento dovrai disporre di questa somma, che include:
                </p>
                <ul className="list-disc list-inside text-sm text-amber-700 mt-1 space-y-1">
                  <li>La quota a tuo carico del 20% ({formatCurrency(personalAmount)})</li>
                  <li>L'IVA da anticipare del 22% ({formatCurrency(ivaAmount)})</li>
                </ul>
                <p className="text-sm text-amber-700 mt-2">
                  Questi fondi possono provenire da risorse proprie, finanziamenti bancari o altre forme di cofinanziamento.
                  L'IVA, pur essendo recuperabile, deve essere anticipata interamente.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <p className="text-xs text-gray-500 italic">
              <strong>Disclaimer:</strong> I dati riportati sono puramente indicativi e calcolati sulla base delle informazioni fornite. 
              L'IVA è considerata al 22% su tutto il valore dell'investimento come aliquota massima, solo a scopo illustrativo. 
              Le percentuali effettive potrebbero variare in base alle specifiche del bando e alla tipologia di spese ammissibili.
              Si consiglia di consultare un professionista per una valutazione accurata.
            </p>
          </div>
        </div>
      </div>
      
      {/* Informazioni aggiuntive */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Informazioni aggiuntive</h3>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-500">Come ci hai conosciuto</p>
            <p className="text-lg font-semibold">{getDiscoveryChannelText(formData.discoveryChannel)}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <p className="text-sm text-gray-600">
              Grazie per averci fatto sapere come ci hai conosciuto. Queste informazioni ci aiutano a migliorare i nostri servizi e a raggiungere più persone interessate ai bandi per il turismo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
