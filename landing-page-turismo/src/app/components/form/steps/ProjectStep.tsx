'use client';

import React from 'react';
import { InvestmentType, InvestmentPurpose, ExpenseType, InvestmentAmount, CompanySize, RegimeType } from '@/types/form';
import FormField from '@/app/components/form/FormField';

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
    companySize?: CompanySize;
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

// Helper functions
// Determina il regime applicabile in base all'importo
function getApplicableRegime(amount: number): string {
  if (amount >= 50000 && amount <= 300000) {
    return "Regime De Minimis (80% di copertura)";
  } else if (amount > 300000 && amount <= 3500000) {
    return "Regime Ordinario (UE 651/2014)";
  } else if (amount < 50000) {
    return "Importo inferiore al minimo ammissibile";
  } else {
    return "Importo superiore al massimo ammissibile";
  }
}

// Calcola la percentuale di copertura
function getCoveragePercentage(amount: number, companySize: CompanySize): number {
  if (amount >= 50000 && amount <= 300000) {
    return 80; // De Minimis: 80% per tutte le dimensioni aziendali
  } else if (amount > 300000 && amount <= 3500000) {
    // Regime Ordinario
    switch (companySize) {
      case 'micro':
      case 'piccola':
        return 60;
      case 'media':
        return 50;
      case 'grande':
        return 40;
      default:
        return 0;
    }
  }
  return 0; // Importo fuori range
}

// Calcola il contributo massimo
function getMaxContribution(amount: number, companySize: CompanySize): number {
  const percentage = getCoveragePercentage(amount, companySize);
  return amount * (percentage / 100);
}

// Genera messaggi di avviso se necessario
function getWarningMessage(amount: number, companySize: CompanySize): string | null {
  if (amount < 62500) {
    return "L'importo minimo ammissibile è di €62.500 (80% di €50.000)";
  } else if (amount > 3500000) {
    return "L'importo massimo ammissibile è di €3.500.000 come da bando turismo Sicilia";
  } else if (companySize === 'grande' && amount <= 300000) {
    return "Le grandi imprese non sono ammissibili al regime De Minimis";
  }
  return null;
}

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
    } else if (name === 'customInvestmentAmount') {
      // Converti il valore in numero
      const numValue = parseFloat(value);

      // Aggiorna sia customInvestmentAmount che investmentAmount
      onChange('customInvestmentAmount', isNaN(numValue) ? '' : numValue);

      // Imposta anche investmentAmount in base al valore inserito
      if (!isNaN(numValue)) {
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

  // Formatta il valore dell'importo per la visualizzazione
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return '';
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);
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

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Importo dell'investimento <span className="text-red-500">*</span>
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">€</span>
          </div>
          <input
            type="number"
            name="customInvestmentAmount"
            id="customInvestmentAmount"
            value={formData.customInvestmentAmount || ''}
            onChange={handleChange}
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 pr-12 py-3 sm:text-lg border-gray-300 rounded-md"
            placeholder="0,00"
            min="62500"
            max="3500000"
            step="50000"
            required
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">EUR</span>
          </div>
        </div>

        {formData.customInvestmentAmount && formData.companySize && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Riepilogo finanziamento</h3>

            {/* Regime applicabile */}
            <div className="mb-2">
              <span className="font-medium">Regime applicabile:</span> {getApplicableRegime(Number(formData.customInvestmentAmount))}
            </div>

            {/* Percentuale di copertura */}
            <div className="mb-2">
              <span className="font-medium">Percentuale di copertura:</span> {getCoveragePercentage(Number(formData.customInvestmentAmount), formData.companySize)}%
            </div>

            {/* Contributo massimo */}
            <div className="mb-2">
              <span className="font-medium">Contributo massimo:</span> {formatCurrency(getMaxContribution(Number(formData.customInvestmentAmount), formData.companySize))}
            </div>

            {/* Quota a carico dell'impresa */}
            <div>
              <span className="font-medium">Quota a carico dell'impresa:</span> {formatCurrency(Number(formData.customInvestmentAmount) - getMaxContribution(Number(formData.customInvestmentAmount), formData.companySize))}
            </div>

            {/* Avvisi */}
            {getWarningMessage(Number(formData.customInvestmentAmount), formData.companySize) && (
              <div className="mt-3 p-2 bg-yellow-100 text-yellow-800 rounded">
                ⚠️ {getWarningMessage(Number(formData.customInvestmentAmount), formData.companySize)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
