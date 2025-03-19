'use client';

import React, { useEffect } from 'react';
import { FormState } from '@/types/form';
import FormField from '../FormField';

interface PersonalInfoStepProps {
  formData: FormState;
  updateFormData: (updates: Partial<FormState>) => void;
  onChange: (name: string, value: any) => void;
  score?: number;
}

export default function PersonalInfoStep({ formData, updateFormData, onChange }: PersonalInfoStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      onChange(name, e.target.checked);
    } else {
      onChange(name, value);
    }
  };

  // Resetta il campo otherDiscoveryChannel quando l'utente cambia la selezione da "Altro"
  useEffect(() => {
    if (formData.discoveryChannel !== 'other' && formData.otherDiscoveryChannel) {
      updateFormData({ otherDiscoveryChannel: '' });
    }
  }, [formData.discoveryChannel]);

  return (
    <div className="space-y-6 animate__animated animate__fadeIn">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Informazioni personali</h2>
        <p className="text-sm text-gray-500">Inserisci i tuoi dati per permetterci di contattarti</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Nome"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Inserisci il tuo nome"
          required
        />
        
        <FormField
          label="Cognome"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Inserisci il tuo cognome"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="esempio@email.com"
          required
        />
        
        <FormField
          label="Telefono"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+39 123 456 7890"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="form-field">
          <label htmlFor="discoveryChannel" className="block text-sm font-medium text-gray-700 mb-1">
            Come ci hai conosciuto? <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="discoveryChannel"
              name="discoveryChannel"
              value={formData.discoveryChannel}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2.5 text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm appearance-none"
              required
              style={{ color: '#1f2937' }}
            >
              <option value="" disabled style={{ color: '#6b7280' }}>Seleziona un'opzione</option>
              <option value="social" style={{ color: '#1f2937' }}>Social Media</option>
              <option value="search" style={{ color: '#1f2937' }}>Motori di ricerca</option>
              <option value="friend" style={{ color: '#1f2937' }}>Passaparola</option>
              <option value="event" style={{ color: '#1f2937' }}>Eventi o fiere</option>
              <option value="email" style={{ color: '#1f2937' }}>Email marketing</option>
              <option value="advertisement" style={{ color: '#1f2937' }}>Pubblicità</option>
              <option value="other" style={{ color: '#1f2937' }}>Altro</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">Questa informazione ci aiuta a migliorare i nostri canali di comunicazione</p>
        </div>

        {/* Campo aggiuntivo che appare quando l'utente seleziona "Altro" */}
        {formData.discoveryChannel === 'other' && (
          <div className="form-field animate__animated animate__fadeIn">
            <label htmlFor="otherDiscoveryChannel" className="block text-sm font-medium text-gray-700 mb-1">
              Specifica come ci hai conosciuto <span className="text-red-500">*</span>
            </label>
            <input
              id="otherDiscoveryChannel"
              name="otherDiscoveryChannel"
              type="text"
              value={formData.otherDiscoveryChannel || ''}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-3 py-2.5 text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
              placeholder="Specifica come ci hai conosciuto"
              required
            />
          </div>
        )}
      </div>

      <div className="mt-6">
        <div className="form-field">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="privacyConsent"
                name="privacyConsent"
                type="checkbox"
                checked={formData.privacyConsent}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
            </div>
            <div className="ml-3">
              <label htmlFor="privacyConsent" className="text-sm text-gray-700">
                Ho letto e accetto la <a href="/privacy-policy" target="_blank" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a> <span className="text-red-500">*</span>
              </label>
              <p className="mt-1 text-xs text-gray-500">
                I tuoi dati saranno trattati secondo la normativa vigente sulla privacy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
