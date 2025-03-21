'use client';

import React, { useState, useEffect } from 'react';
import { InvestmentType, InvestmentPurpose, ExpenseType, InvestmentAmount } from '@/types/form';
import FormField from '../FormField';

interface ProjectStepProps {
  formData: {
    projectType?: string;
    projectBudget?: string;
    projectDescription?: string;
    projectLocation?: string;
    investmentType?: InvestmentType;
    investmentPurposes?: InvestmentPurpose[];
    expenseTypes?: ExpenseType[];
    investmentAmount?: InvestmentAmount;
    customInvestmentAmount?: number;
    newPersonnel?: boolean;
    degradedBuilding?: boolean;
    historicalBuilding?: boolean;
    companySize?: string;
  };
  onChange: (name: string, value: any) => void;
  updateFormData?: (updates: Partial<any>) => void;
  score?: number;
}

const INVESTMENT_TYPES: { value: InvestmentType; label: string }[] = [
  { value: 'ampliamento', label: 'Ampliamento, ammodernamento, ristrutturazione o riattivazione di strutture esistenti' },
  { value: 'nuova_struttura', label: 'Realizzazione di nuove strutture o attività' },
  { value: 'recupero_immobile', label: 'Recupero di immobili o strutture turistico alberghiere o extralberghiere legittimamente iniziate e non ultimate' },
];

const INVESTMENT_PURPOSES: { value: InvestmentPurpose; label: string }[] = [
    { value: 'enhanceTourism', label: "Potenziamento dell'offerta turistica" },
    { value: 'qualityStandards', label: "Innalzamento degli standard qualitativi dell'offerta turistica" },
    { value: 'serviceImprovement', label: "Ampliamento e miglioramento dei servizi, volti anche alla destagionalizzazione dell'offerta" },
    { value: 'reuseProperty', label: 'Riutilizzo produttivo di beni immobili dismessi, con particolare riferimento agli immobili con valenza storico culturale' }
];

const EXPENSE_TYPES: {value: ExpenseType, label: string}[] = [
    { value: 'propertyPurchase', label: 'Acquisto di suolo aziendale, fabbricati, immobili o di strutture già precedentemente adibite ad attività turistico alberghiere o extralberghiere'},
    { value: 'construction', label: 'Demolizioni e ricostruzioni, ampliamenti, ammodernamenti e ristrutturazione, manutenzione straordinaria e/o consolidamento di strutture esistenti'},
    { value: 'projectManagement', label: 'Oneri di progettazione, direzione lavori, collaudi e verifiche'},
    { value: 'equipment', label: 'Nuovi macchinari, impianti, arredi e attrezzature'},
    { value: 'consulting', label: 'Consulenze specialistiche'},
    { value: 'feasibilityStudy', label: 'Studi di fattibilità economico-finanziaria'},
    { value: 'environmentalCert', label: 'Certificazioni di qualità ambientale'},
    { value: 'energyCert', label: 'Attestati di prestazione energetica'},
    { value: 'intellectualProperty', label: 'Brevetti, licenze, know how o altre forme di proprietà intellettuale'},
    { value: 'rainwaterSystem', label: 'Impianti di recupero acque meteoriche'},
    { value: 'ledLighting', label: 'Relamping con tecnologia LED'},
    { value: 'homeAutomation', label: 'Impianti di gestione domotica (irrigazione, illuminazione, ecc...)'},
    { value: 'solarThermal', label: 'Produzione di acqua calda sanitaria con solare termico'},
    { value: 'photovoltaic', label: 'Impianti fotovoltaici e fotovoltaici con accumulo'},
    { value: 'thermalEfficiency', label: "Interventi di miglioramento delle prestazioni termiche dell'involucro edilizio (cappotto termico, serramenti a risparmio energetico, ecc...)"}
];

// Costanti per i limiti di investimento
const MIN_INVESTMENT = 62500;
const MAX_INVESTMENT_FOR_FULL_CONTRIBUTION = 375000; // 300.000 / 0.8 = 375.000 (considerando l'80% di contributo)

export default function ProjectStep({ formData, onChange, updateFormData }: ProjectStepProps) {
  // Stato per gestire i messaggi di errore/avviso
  const [investmentError, setInvestmentError] = useState<string | null>(null);
  const [investmentWarning, setInvestmentWarning] = useState<string | null>(null);

  // Verifica l'importo dell'investimento quando cambia
  useEffect(() => {
    if (formData.customInvestmentAmount !== undefined) {
      const amount = formData.customInvestmentAmount;
      
      // Verifica se l'importo è inferiore al minimo
      if (amount < MIN_INVESTMENT && amount > 0) {
        setInvestmentError(`L'importo minimo dell'investimento deve essere di €${MIN_INVESTMENT.toLocaleString('it-IT')}`);
        setInvestmentWarning(null);
      } 
      // Verifica se l'importo supera il massimo per il contributo pieno
      else if (amount > MAX_INVESTMENT_FOR_FULL_CONTRIBUTION) {
        setInvestmentError(null);
        setInvestmentWarning(`L'importo inserito supera il valore massimo (€${MAX_INVESTMENT_FOR_FULL_CONTRIBUTION.toLocaleString('it-IT')}) per cui è possibile ottenere il contributo massimo di €300.000 in regime de minimis. Per investimenti superiori a questa soglia, ti consigliamo di contattare il nostro team tramite il form per un'analisi più approfondita del tuo progetto.`);
      } 
      // Nessun errore o avviso
      else {
        setInvestmentError(null);
        setInvestmentWarning(null);
      }
    } else {
      setInvestmentError(null);
      setInvestmentWarning(null);
    }
  }, [formData.customInvestmentAmount]);

  useEffect(() => {
    setInvestmentWarning('');
  }, [formData.customInvestmentAmount, formData.companySize]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox') {
      // Gestione checkbox per array di valori
      if (name === 'investmentPurposes') {
        const currentValues = [...(formData.investmentPurposes || [])];
        if (checked) {
          currentValues.push(value as InvestmentPurpose);
        } else {
          const index = currentValues.indexOf(value as InvestmentPurpose);
          if (index !== -1) {
            currentValues.splice(index, 1);
          }
        }
        onChange('investmentPurposes', currentValues);
      } else if (name === 'expenseTypes') {
        const currentValues = [...(formData.expenseTypes || [])];
        if (checked) {
          currentValues.push(value as ExpenseType);
        } else {
          const index = currentValues.indexOf(value as ExpenseType);
          if (index !== -1) {
            currentValues.splice(index, 1);
          }
        }
        onChange('expenseTypes', currentValues);
      } else {
        onChange(name, checked);
      }
    } else if (name === 'customInvestmentAmount') {
      // Converti il valore in numero
      const numValue = parseFloat(value);
      
      // Aggiorna il valore numerico
      onChange(name, isNaN(numValue) ? '' : numValue);
      
      // Se è l'importo dell'investimento, aggiorna anche la categoria
      if (name === 'customInvestmentAmount' && !isNaN(numValue)) {
        let investmentAmountCategory: InvestmentAmount = 'custom';
        if (numValue <= 100000) {
          investmentAmountCategory = 'under100k';
        } else if (numValue <= 500000) {
          investmentAmountCategory = '100k-500k';
        } else if (numValue <= 1000000) {
          investmentAmountCategory = '500k-1M';
        } else {
          investmentAmountCategory = 'over1M';
        }
        onChange('investmentAmount', investmentAmountCategory);
      }
    } else {
      // Gestione input normali
      onChange(name, value);
    }
  };

  return (
    <div className="space-y-6 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Dettagli Investimento</h2>
        <p className="text-sm text-gray-500">Fornisci informazioni sul tuo progetto di investimento</p>
      </div>
      
      <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-sm">
        <label className="block text-lg font-medium text-gray-800 mb-3">
          Importo totale dell'investimento <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Inserisci l'importo totale dell'investimento che intendi realizzare (non il contributo richiesto). 
          Il valore minimo dell'investimento deve essere di €62.500.
        </p>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-lg font-medium">€</span>
          </div>
          <input
            type="number"
            name="customInvestmentAmount"
            id="customInvestmentAmount"
            value={formData.customInvestmentAmount || ''}
            onChange={handleChange}
            className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-4 text-xl border-gray-300 rounded-md ${investmentError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
            placeholder="0,00"
            min="62500"
            step="1000"
            required
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-lg">EUR</span>
          </div>
        </div>
        
        {/* Messaggio di errore */}
        {investmentError && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {investmentError}
            </p>
          </div>
        )}
        
        {/* Messaggio di avviso */}
        {investmentWarning && (
          <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-sm text-amber-700 font-medium flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{investmentWarning}</span>
            </p>
            {formData.customInvestmentAmount && formData.customInvestmentAmount > MAX_INVESTMENT_FOR_FULL_CONTRIBUTION && (
              <div className="mt-3 ml-7 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-700">
                  <strong>Contattaci:</strong> Per progetti con investimenti superiori a €375.000, offriamo un'analisi personalizzata per massimizzare i benefici e ottimizzare la struttura del finanziamento. Compila il form per essere ricontattato dal nostro team di esperti.
                </p>
              </div>
            )}
          </div>
        )}
        
        {formData.customInvestmentAmount && (
          <p className="mt-3 text-base text-gray-700">
            Importo inserito: <span className="font-semibold">{formData.customInvestmentAmount.toLocaleString('it-IT')}</span>
          </p>
        )}
        
        <div className="mt-3 bg-yellow-50 p-3 rounded-md border border-yellow-200">
          <p className="text-sm text-yellow-700">
            <strong>Nota bene:</strong> Questo è l'importo totale dell'investimento, non il contributo che riceverai. 
            Il contributo a fondo perduto sarà calcolato in base alle regole del bando (fino all'80% in regime de minimis).
          </p>
        </div>
      </div>
      
      <FormField
        label="Breve descrizione dell'idea progettuale"
        name="projectDescription"
        type="textarea"
        value={formData.projectDescription}
        onChange={handleChange}
        placeholder="Descrivi brevemente il tuo progetto"
        required
      />

      <FormField
        label="Indicare la tipologia di intervento da realizzare"
        name="investmentType"
        type="select"
        value={formData.investmentType}
        onChange={handleChange}
        options={INVESTMENT_TYPES}
        required
      />

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Indicare a quale/i delle seguenti finalità risponde l'intervento da realizzare <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
          {INVESTMENT_PURPOSES.map((purpose) => (
            <div key={purpose.value} className="flex items-start">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  id={`purpose-${purpose.value}`}
                  name="investmentPurposes"
                  type="checkbox"
                  value={purpose.value}
                  checked={formData.investmentPurposes?.includes(purpose.value)}
                  onChange={handleChange}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
              </div>
              <label htmlFor={`purpose-${purpose.value}`} className="ml-3 text-sm text-gray-700">
                {purpose.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Domande aggiuntive sul progetto */}
      <div className="mt-6 bg-yellow-50 p-6 rounded-lg border border-yellow-200 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex items-center mb-4 p-3 bg-amber-100 rounded-md border border-amber-300 animate__animated animate__fadeIn">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm font-medium text-amber-800">
            Questa sezione contiene domande importanti per la valutazione del tuo progetto. Assicurati di rispondere a tutte le domande.
          </p>
        </div>
        
        <label className="block text-xl font-semibold text-gray-800 mb-3 animate__animated animate__fadeIn">
          Caratteristiche specifiche del progetto
        </label>
        <p className="text-sm text-gray-600 mb-4 animate__animated animate__fadeIn" style={{ animationDelay: '100ms' }}>
          Rispondi alle seguenti domande per fornire ulteriori dettagli sul tuo progetto.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-start p-3 bg-white rounded-md border border-gray-200 shadow-sm transition-all duration-200 hover:shadow hover:border-yellow-300 animate__animated animate__fadeIn" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center h-5 mt-0.5">
              <input
                id="newPersonnel"
                name="newPersonnel"
                type="checkbox"
                checked={formData.newPersonnel || false}
                onChange={handleChange}
                className="h-5 w-5 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded transition-all duration-200"
              />
            </div>
            <label htmlFor="newPersonnel" className="ml-3 text-sm font-medium text-gray-700">
              È prevista l'assunzione di nuovo personale
            </label>
          </div>
          
          <div className="flex items-start p-3 bg-white rounded-md border border-gray-200 shadow-sm transition-all duration-200 hover:shadow hover:border-yellow-300 animate__animated animate__fadeIn" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center h-5 mt-0.5">
              <input
                id="degradedBuilding"
                name="degradedBuilding"
                type="checkbox"
                checked={formData.degradedBuilding || false}
                onChange={handleChange}
                className="h-5 w-5 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded transition-all duration-200"
              />
            </div>
            <label htmlFor="degradedBuilding" className="ml-3 text-sm font-medium text-gray-700">
              Il progetto prevede il recupero di immobili degradati
            </label>
          </div>
          
          <div className="flex items-start p-3 bg-white rounded-md border border-gray-200 shadow-sm transition-all duration-200 hover:shadow hover:border-yellow-300 animate__animated animate__fadeIn" style={{ animationDelay: '600ms' }}>
            <div className="flex items-center h-5 mt-0.5">
              <input
                id="historicalBuilding"
                name="historicalBuilding"
                type="checkbox"
                checked={formData.historicalBuilding || false}
                onChange={handleChange}
                className="h-5 w-5 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded transition-all duration-200"
              />
            </div>
            <label htmlFor="historicalBuilding" className="ml-3 text-sm font-medium text-gray-700">
              Il progetto riguarda un immobile di interesse storico architettonico ai sensi dell'art. 13 del D.lgs n. 42/2004
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-base font-medium text-gray-700 mb-2">
          Spese previste <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-4">
          Seleziona le tipologie di spesa che intendi sostenere per realizzare il tuo progetto.
        </p>
        
        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-md border border-blue-200 shadow-sm animate__animated animate__fadeIn">
          <div className="flex items-start">
            <svg className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <span className="text-sm font-semibold text-blue-800 block mb-1">Aumenta il punteggio del tuo progetto!</span>
              <span className="text-sm text-blue-700">Seleziona le tipologie di spesa che migliorano l'efficienza energetica e la sostenibilità ambientale per ottenere un punteggio più alto.</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 bg-white border border-gray-300 rounded-md p-3 max-h-80 overflow-y-auto">
          {EXPENSE_TYPES.map((expense) => (
            <div key={expense.value} className="flex items-start py-1.5 hover:bg-gray-50 rounded transition-colors duration-150">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  id={`expense-${expense.value}`}
                  name="expenseTypes"
                  type="checkbox"
                  value={expense.value}
                  checked={formData.expenseTypes?.includes(expense.value)}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <label htmlFor={`expense-${expense.value}`} className="ml-3 text-sm text-gray-700 cursor-pointer">
                {expense.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
