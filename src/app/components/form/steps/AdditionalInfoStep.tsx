'use client';

import React from 'react';
import { FormState } from '@/types/form';
import FormField from '../FormField';

interface AdditionalInfoStepProps {
  formData: FormState;
  updateFormData: (updates: Partial<FormState>) => void;
}

const DISCOVERY_CHANNELS = [
  { value: 'social', label: 'Social media' },
  { value: 'search', label: 'Motori di ricerca' },
  { value: 'email', label: 'Email' },
  { value: 'word', label: 'Passaparola' },
  { value: 'event', label: 'Eventi o fiere' },
  { value: 'other', label: 'Altro' },
];

export default function AdditionalInfoStep({ formData, updateFormData }: AdditionalInfoStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox') {
      updateFormData({ [name]: checked });
    } else {
      updateFormData({ [name]: value });
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Informazioni aggiuntive</h2>
        <p className="text-sm text-gray-500">Fornisci alcune informazioni aggiuntive per completare la tua richiesta</p>
      </div>
      
      <FormField
        label="Come hai scoperto questa opportunità?"
        name="discoveryChannel"
        type="select"
        value={formData.discoveryChannel}
        onChange={handleChange}
        options={DISCOVERY_CHANNELS}
        required
      />

      <div className="mt-8 bg-blue-50 p-5 rounded-lg border border-blue-100">
        <div className="flex items-start">
          <div className="flex items-center h-5 mt-0.5">
            <input
              id="gdprConsent"
              name="gdprConsent"
              type="checkbox"
              checked={formData.gdprConsent}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
          </div>
          <div className="ml-3">
            <label htmlFor="gdprConsent" className="text-sm font-medium text-gray-700">
              Acconsento al trattamento dei dati personali
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Acconsento al trattamento dei miei dati personali secondo la normativa vigente in materia di privacy (GDPR). I dati saranno utilizzati esclusivamente per la valutazione della richiesta e non saranno condivisi con terze parti senza il mio consenso.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-gray-50 p-5 rounded-lg border border-gray-200">
        <div className="flex items-start">
          <div className="flex items-center h-5 mt-0.5">
            <input
              id="marketingConsent"
              name="marketingConsent"
              type="checkbox"
              checked={formData.marketingConsent}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="marketingConsent" className="text-sm font-medium text-gray-700">
              Desidero ricevere aggiornamenti
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Desidero ricevere aggiornamenti su nuove opportunità di finanziamento e iniziative simili. Posso annullare l'iscrizione in qualsiasi momento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 