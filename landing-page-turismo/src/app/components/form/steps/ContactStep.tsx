'use client';

import React from 'react';
import { FormState, Role } from '@/types/form';

interface ContactStepProps {
  formData: FormState;
  updateFormData: (updates: Partial<FormState>) => void;
}

const ROLES: { value: Role; label: string }[] = [
  { value: 'imprenditore', label: 'Imprenditore/titolare' },
  { value: 'collaboratore', label: 'Collaboratore/impiegato' },
  { value: 'altro', label: 'Altro' }
];

export default function ContactStep({ formData, updateFormData }: ContactStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const contact = formData.contact || { name: '', surname: '', email: '', phone: '', role: [] };
    
    updateFormData({
      contact: {
        ...contact,
        [name]: value
      }
    });
  };

  const handleRoleChange = (role: Role) => {
    const contact = formData.contact || { name: '', surname: '', email: '', phone: '', role: [] };
    const currentRoles = contact.role || [];
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter((r: Role) => r !== role)
      : [...currentRoles, role];

    updateFormData({
      contact: {
        ...contact,
        role: newRoles
      }
    });
  };

  const contact = formData.contact || { name: '', surname: '', email: '', phone: '', role: [] };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={contact.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="La tua email"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nome *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={contact.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="Il tuo nome"
        />
      </div>

      <div>
        <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
          Cognome *
        </label>
        <input
          type="text"
          id="surname"
          name="surname"
          required
          value={contact.surname}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="Il tuo cognome"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Cellulare *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={contact.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="Il tuo numero di cellulare"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stai compilando questo modulo in qualità di: *
        </label>
        <div className="space-y-2">
          {ROLES.map(role => (
            <div key={role.value} className="flex items-center">
              <input
                type="checkbox"
                id={role.value}
                checked={contact.role.includes(role.value)}
                onChange={() => handleRoleChange(role.value)}
                className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={role.value} className="ml-2 text-sm text-gray-700">
                {role.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
