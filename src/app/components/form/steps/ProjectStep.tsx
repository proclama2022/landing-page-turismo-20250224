'use client';

import React from 'react';
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
  };
  onChange: (name: string, value: any) => void;
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

const INVESTMENT_AMOUNTS: {value: InvestmentAmount, label: string}[] = [
    {value: 'under100k', label: 'Fino a 100.000 euro'},
    {value: '100k-500k', label: 'Fino a 500.000 euro'},
    {value: '500k-1M', label: 'Fino a 1.000.000 di euro'},
    {value: 'over1M', label: 'Oltre 1.000.000 di euro'}
];

export default function ProjectStep({ formData, onChange }: ProjectStepProps) {
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
    } else {
      // Gestione input normali
      onChange(name, value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Dettagli Investimento</h2>
        <p className="text-sm text-gray-500">Fornisci informazioni sul tuo progetto di investimento</p>
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

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Spese previste <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3 bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
          {EXPENSE_TYPES.map((expense) => (
            <div key={expense.value} className="flex items-start">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  id={`expense-${expense.value}`}
                  name="expenseTypes"
                  type="checkbox"
                  value={expense.value}
                  checked={formData.expenseTypes?.includes(expense.value)}
                  onChange={handleChange}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
              </div>
              <label htmlFor={`expense-${expense.value}`} className="ml-3 text-sm text-gray-700">
                {expense.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <FormField
        label="Importo dell'investimento"
        name="investmentAmount"
        type="select"
        value={formData.investmentAmount}
        onChange={handleChange}
        options={INVESTMENT_AMOUNTS}
        required
      />
    </div>
  );
}