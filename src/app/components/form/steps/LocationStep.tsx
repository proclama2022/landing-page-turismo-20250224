'use client';

import React from 'react';
import { BaseStepProps } from '@/types/components';
import { Label } from '@/components/ui/label';
import { CitySelect } from '@/components/CitySelect';

export default function LocationStep({ formData, onUpdate }: BaseStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Località dell'Investimento</h2>

      <div>
        <Label htmlFor="selectedCity" className="block text-sm font-medium text-gray-700 mb-1">
          Seleziona la città di intervento *
        </Label>
        <CitySelect
          id="selectedCity"
          value={formData.selectedCity}
          onChange={(value) => onUpdate('selectedCity', value)}
        />
      </div>
    </div>
  );
}
