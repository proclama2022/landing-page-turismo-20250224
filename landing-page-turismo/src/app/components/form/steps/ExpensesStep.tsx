'use client';

import React from 'react';
import { BaseStepProps } from '@/types/components';

export default function ExpensesStep({ formData, onUpdate }: BaseStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate(name as keyof typeof formData, parseFloat(value) || 0);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Spese Ammissibili</h2>
      
      <div>
        <label htmlFor="equipmentCosts" className="block text-sm font-medium text-gray-700 mb-1">
          Spese per attrezzature (€) *
        </label>
        <input
          type="number"
          id="equipmentCosts"
          name="equipmentCosts"
          required
          min="0"
          step="0.01"
          value={formData.equipmentCosts}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="0.00"
        />
      </div>

      <div>
        <label htmlFor="consultingCosts" className="block text-sm font-medium text-gray-700 mb-1">
          Spese per consulenze (€) *
        </label>
        <input
          type="number"
          id="consultingCosts"
          name="consultingCosts"
          required
          min="0"
          step="0.01"
          value={formData.consultingCosts}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="0.00"
        />
      </div>

      <div>
        <label htmlFor="trainingCosts" className="block text-sm font-medium text-gray-700 mb-1">
          Spese per formazione (€) *
        </label>
        <input
          type="number"
          id="trainingCosts"
          name="trainingCosts"
          required
          min="0"
          step="0.01"
          value={formData.trainingCosts}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="0.00"
        />
      </div>

      <div>
        <label htmlFor="marketingCosts" className="block text-sm font-medium text-gray-700 mb-1">
          Spese per marketing (€) *
        </label>
        <input
          type="number"
          id="marketingCosts"
          name="marketingCosts"
          required
          min="0"
          step="0.01"
          value={formData.marketingCosts}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="0.00"
        />
      </div>

      <div className="pt-4 border-t border-gray-200">
        <p className="text-lg font-semibold text-gray-900">
          Totale spese: €{' '}
          {(
            (formData.equipmentCosts || 0) +
            (formData.consultingCosts || 0) +
            (formData.trainingCosts || 0) +
            (formData.marketingCosts || 0)
          ).toFixed(2)}
        </p>
      </div>
    </div>
  );
} 