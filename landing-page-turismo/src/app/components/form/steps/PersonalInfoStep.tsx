'use client';

import React from 'react';
import { BaseStepProps } from '@/types/components';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function PersonalInfoStep({ formData, onUpdate }: BaseStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Informazioni Personali</h2>

      <div>
        <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
          Nome *
        </Label>
        <Input
          type="text"
          id="firstName"
          name="firstName"
          required
          value={formData.firstName}
          onChange={(e) => onUpdate('firstName', e.target.value)}
          className="w-full"
          placeholder="Inserisci il tuo nome"
        />
      </div>

      <div>
        <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
          Cognome *
        </Label>
        <Input
          type="text"
          id="lastName"
          name="lastName"
          required
          value={formData.lastName}
          onChange={(e) => onUpdate('lastName', e.target.value)}
          className="w-full"
          placeholder="Inserisci il tuo cognome"
        />
      </div>

      <div>
        <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) => onUpdate('email', e.target.value)}
          className="w-full"
          placeholder="nome@esempio.com"
        />
      </div>

      <div>
        <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Telefono *
        </Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={(e) => onUpdate('phone', e.target.value)}
          className="w-full"
          placeholder="+39 123 456 7890"
        />
      </div>

      <div>
        <Label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Ruolo *
        </Label>
        <Input
          type="text"
          id="role"
          name="role"
          required
          value={formData.role}
          onChange={(e) => onUpdate('role', e.target.value)}
          className="w-full"
          placeholder="Es. Imprenditore, Collaboratore, etc."
        />
      </div>
    </div>
  );
}