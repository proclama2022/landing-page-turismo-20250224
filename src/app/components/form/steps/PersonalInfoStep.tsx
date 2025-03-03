'use client';

import React from 'react';
import { FormState } from '@/types/form';
import FormField from '../FormField';

interface PersonalInfoStepProps {
  formData: FormState;
  updateFormData: (updates: Partial<FormState>) => void;
}

export default function PersonalInfoStep({ formData, updateFormData }: PersonalInfoStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="space-y-6">
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
          <select
            id="discoveryChannel"
            name="discoveryChannel"
            value={formData.discoveryChannel}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
            required
          >
            <option value="" disabled>Seleziona un'opzione</option>
            <option value="social">Social Media</option>
            <option value="search">Motori di ricerca</option>
            <option value="friend">Passaparola</option>
            <option value="event">Eventi o fiere</option>
            <option value="email">Email marketing</option>
            <option value="advertisement">Pubblicità</option>
            <option value="other">Altro</option>
          </select>
        </div>
      </div>
    </div>
  );
}
