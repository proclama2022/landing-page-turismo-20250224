'use client';

import React from 'react';
import { FormState, AtecoCode, CompanySize, ATECO_CODES } from '@/types/form';

interface CompanyStepProps {
  formData: FormState;
  updateFormData: (updates: Partial<FormState>) => void;
}

const COMPANY_SIZES: { value: CompanySize; label: string }[] = [
    { value: 'micro', label: 'Microimpresa' },
    { value: 'piccola', label: 'Piccola impresa' },
    { value: 'media', label: 'Media impresa' },
    { value: 'grande', label: 'Grande impresa' },
];

export default function CompanyStep({ formData, updateFormData }: CompanyStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({
      [name]: value
    });
  };

  return (
    <div className="space-y-6">
        <h2 className="text-xl font-bold mb-4">Anagrafica Aziendale</h2>
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
          Nome azienda
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.company?.companyName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="Nome azienda"
        />
      </div>

      <div>
        <label htmlFor="vatNumber" className="block text-sm font-medium text-gray-700 mb-1">
          P.Iva *
        </label>
        <input
          type="text"
          id="vatNumber"
          name="vatNumber"
          required
          value={formData.vatNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="Partita IVA"
        />
      </div>

      <div>
        <label htmlFor="constitutionDate" className="block text-sm font-medium text-gray-700 mb-1">
          Data atto di costituzione
        </label>
        <input
          type="date"
          id="constitutionDate"
          name="constitutionDate"
          value={formData.constitutionDate || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="atecoCode" className="block text-sm font-medium text-gray-700 mb-1">
          Codice ATECO primario o prevalente *
        </label>
        <select
          id="atecoCode"
          name="atecoCode"
          required
          value={formData.atecoCode}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        >
          <option value="">Seleziona un codice ATECO</option>
          {ATECO_CODES
            .filter(code => /^\d{2}\.\d{2}(\.\d{2})?$/.test(code.split(' - ')[0]) || code.startsWith('55.3'))
            .map((code) => {
              const [codeValue, description] = code.split(' - ');
              return (
                <option key={codeValue} value={codeValue}>
                  {code}
                </option>
              );
            })}
        </select>
      </div>

      <div>
        <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
          Dimensione aziendale *
        </label>
        <select
          id="companySize"
          name="companySize"
          required
          value={formData.companySize}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        >
          {COMPANY_SIZES.map(size => (
            <option key={size.value} value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
