'use client';

import React from 'react';
import { BaseStepProps } from '@/types/components';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function CompanyInfoStep({ formData, onUpdate }: BaseStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Informazioni sull'Azienda</h2>

      <div className="space-y-4">
        <Label className="block text-sm font-medium text-gray-700">
          L'azienda è già costituita? *
        </Label>
        <RadioGroup
          value={formData.isCompanyEstablished ? 'yes' : 'no'}
          onValueChange={(value) => onUpdate('isCompanyEstablished', value === 'yes')}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="established-yes" />
            <Label htmlFor="established-yes">Sì</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="established-no" />
            <Label htmlFor="established-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="block text-sm font-medium text-gray-700">
          L'azienda soddisfa i requisiti di classificazione PMI? *
        </Label>
        <RadioGroup
          value={formData.meetsSmeRequirements ? 'yes' : 'no'}
          onValueChange={(value) => onUpdate('meetsSmeRequirements', value === 'yes')}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="sme-yes" />
            <Label htmlFor="sme-yes">Sì</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="sme-no" />
            <Label htmlFor="sme-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="block text-sm font-medium text-gray-700">
          L'azienda ha ricevuto altri finanziamenti pubblici negli ultimi 3 anni? *
        </Label>
        <RadioGroup
          value={formData.hasReceivedFunding ? 'yes' : 'no'}
          onValueChange={(value) => onUpdate('hasReceivedFunding', value === 'yes')}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="funding-yes" />
            <Label htmlFor="funding-yes">Sì</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="funding-no" />
            <Label htmlFor="funding-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="block text-sm font-medium text-gray-700">
          L'azienda ha intenzione di trasferirsi in Sicilia? *
        </Label>
        <RadioGroup
          value={formData.willRelocateToSicily ? 'yes' : 'no'}
          onValueChange={(value) => onUpdate('willRelocateToSicily', value === 'yes')}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="relocate-yes" />
            <Label htmlFor="relocate-yes">Sì</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="relocate-no" />
            <Label htmlFor="relocate-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="block text-sm font-medium text-gray-700">
          L'azienda fa parte di un gruppo? *
        </Label>
        <RadioGroup
          value={formData.isPartOfGroup ? 'yes' : 'no'}
          onValueChange={(value) => onUpdate('isPartOfGroup', value === 'yes')}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="group-yes" />
            <Label htmlFor="group-yes">Sì</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="group-no" />
            <Label htmlFor="group-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
} 