'use client';

import React from 'react';
import { FormState } from '@/types/form';

interface LocationStepProps {
  formData: FormState;
  updateFormData: (updates: Partial<FormState>) => void;
}

export default function LocationStep({ formData, updateFormData }: LocationStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const localUnit = formData.localUnit || {
      municipality: '',
      province: '',
      address: '',
      postalCode: ''
    };
    
    updateFormData({
      localUnit: {
        ...localUnit,
        [name]: value
      }
    });
  };

  const localUnit = formData.localUnit || {
    municipality: '',
    province: '',
    address: '',
    postalCode: ''
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Unità Locale</h2>
      <div>
        <label htmlFor="municipality" className="block text-sm font-medium text-gray-700 mb-1">
          Comune *
        </label>
        <input
          type="text"
          id="municipality"
          name="municipality"
          required
          value={localUnit.municipality}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="Comune"
        />
      </div>

      <div>
        <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
          Provincia *
        </label>
        <input
          type="text"
          id="province"
          name="province"
          required
          value={localUnit.province}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="Provincia"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Indirizzo
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={localUnit.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="Indirizzo"
        />
      </div>

      <div>
        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
          CAP
        </label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={localUnit.postalCode}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="CAP"
        />
      </div>
    </div>
  );
}
