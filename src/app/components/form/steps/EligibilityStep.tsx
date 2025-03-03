'use client';

import React from 'react';
import { FormState } from '@/types/form';

interface EligibilityStepProps {
  formData: FormState;
  updateFormData: (updates: Partial<FormState>) => void;
}

export default function EligibilityStep({ formData, updateFormData }: EligibilityStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const eligibility = formData.eligibility || {
      isRegisteredOrWillBe: false,
      hadGrantRevocation: false,
      hasRelocated24Months: false,
      willNotRelocate24Months: false,
      isPartOfGroup: false,
    };

    updateFormData({
      eligibility: {
        ...eligibility,
        [name]: checked,
      },
    });
  };

  const eligibility = formData.eligibility || {
    isRegisteredOrWillBe: false,
    hadGrantRevocation: false,
    hasRelocated24Months: false,
    willNotRelocate24Months: false,
    isPartOfGroup: false,
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Requisiti di ammissibilità</h2>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isRegisteredOrWillBe"
          name="isRegisteredOrWillBe"
          checked={formData.eligibility?.isRegisteredOrWillBe || false}
          onChange={handleChange}
          className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="isRegisteredOrWillBe" className="ml-2 text-sm text-gray-700">
          L'impresa è già costituita e iscritta al registro imprese o sarà costituita prima della presentazione della domanda
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="hadGrantRevocation"
          name="hadGrantRevocation"
          checked={eligibility.hadGrantRevocation}
          onChange={handleChange}
          className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="hadGrantRevocation" className="ml-2 text-sm text-gray-700">L'impresa non ha subito revoca di agevolazioni</label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="hasRelocated24Months"
          name="hasRelocated24Months"
          checked={eligibility.hasRelocated24Months}
          onChange={handleChange}
          className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="hasRelocated24Months" className="ml-2 text-sm text-gray-700">L'impresa non ha delocalizzato negli ultimi 24 mesi</label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="willNotRelocate24Months"
          name="willNotRelocate24Months"
          checked={eligibility.willNotRelocate24Months}
          onChange={handleChange}
          className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="willNotRelocate24Months" className="ml-2 text-sm text-gray-700">L'impresa non delocalizzerà nei prossimi 24 mesi</label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPartOfGroup"
          name="isPartOfGroup"
          checked={eligibility.isPartOfGroup}
          onChange={handleChange}
          className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="isPartOfGroup" className="ml-2 text-sm text-gray-700">L'impresa non fa parte di un gruppo</label>
      </div>
    </div>
  );
}
