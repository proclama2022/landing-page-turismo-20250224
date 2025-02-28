'use client';

import React from 'react';
import { BaseStepProps } from '@/types/components';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function ProjectStep({ formData, onUpdate }: BaseStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Dettagli del Progetto</h2>

      <div>
        <Label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
          Descrizione del progetto *
        </Label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          required
          value={formData.projectDescription || ''}
          onChange={(e) => onUpdate('projectDescription', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors min-h-[120px]"
          placeholder="Descrivi il tuo progetto..."
        />
      </div>

      <div className="space-y-4">
        <Label className="block text-sm font-medium text-gray-700">
          Tipologia di intervento *
        </Label>
        <RadioGroup
          value={formData.interventionType || ''}
          onValueChange={(value) => onUpdate('interventionType', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new" id="new" />
            <Label htmlFor="new">Nuova attività</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="expansion" id="expansion" />
            <Label htmlFor="expansion">Ampliamento attività esistente</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="renovation" id="renovation" />
            <Label htmlFor="renovation">Ristrutturazione</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="block text-sm font-medium text-gray-700">
          Importo dell'investimento *
        </Label>
        <RadioGroup
          value={formData.investmentAmount || ''}
          onValueChange={(value) => onUpdate('investmentAmount', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fino400" id="fino400" />
            <Label htmlFor="fino400">Fino a 400.000€</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fino1000" id="fino1000" />
            <Label htmlFor="fino1000">Da 400.000€ a 1.000.000€</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oltre1000" id="oltre1000" />
            <Label htmlFor="oltre1000">Oltre 1.000.000€</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="block text-sm font-medium text-gray-700">
          Assunzione dipendenti *
        </Label>
        <RadioGroup
          value={formData.willHireEmployees ? 'yes' : 'no'}
          onValueChange={(value) => onUpdate('willHireEmployees', value === 'yes')}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="hire-yes" />
            <Label htmlFor="hire-yes">Sì</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="hire-no" />
            <Label htmlFor="hire-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="block text-sm font-medium text-gray-700">
          Immobile fatiscente *
        </Label>
        <RadioGroup
          value={formData.isRundownProperty ? 'yes' : 'no'}
          onValueChange={(value) => onUpdate('isRundownProperty', value === 'yes')}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="rundown-yes" />
            <Label htmlFor="rundown-yes">Sì</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="rundown-no" />
            <Label htmlFor="rundown-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="block text-sm font-medium text-gray-700">
          Immobile storico *
        </Label>
        <RadioGroup
          value={formData.isHistoricalBuilding ? 'yes' : 'no'}
          onValueChange={(value) => onUpdate('isHistoricalBuilding', value === 'yes')}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="historical-yes" />
            <Label htmlFor="historical-yes">Sì</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="historical-no" />
            <Label htmlFor="historical-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}