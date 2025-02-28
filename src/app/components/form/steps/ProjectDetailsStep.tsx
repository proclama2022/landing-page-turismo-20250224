'use client';

import React from 'react';
import { FormState } from '@/types/form';

interface ProjectDetailsStepProps {
  formData: FormState;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function ProjectDetailsStep({ formData, onChange }: ProjectDetailsStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Dettagli del Progetto</h2>
      
      <div>
        <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700 mb-1">
          Titolo del progetto *
        </label>
        <input
          type="text"
          id="projectTitle"
          name="projectTitle"
          required
          value={formData.projectTitle}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="Inserisci il titolo del progetto"
        />
      </div>

      <div>
        <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
          Descrizione del progetto *
        </label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          required
          value={formData.projectDescription}
          onChange={onChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="Descrivi il tuo progetto"
        />
      </div>

      <div>
        <label htmlFor="projectStartDate" className="block text-sm font-medium text-gray-700 mb-1">
          Data di inizio prevista *
        </label>
        <input
          type="date"
          id="projectStartDate"
          name="projectStartDate"
          required
          value={formData.projectStartDate}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="projectEndDate" className="block text-sm font-medium text-gray-700 mb-1">
          Data di fine prevista *
        </label>
        <input
          type="date"
          id="projectEndDate"
          name="projectEndDate"
          required
          value={formData.projectEndDate}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-1">
          Importo totale del progetto (€) *
        </label>
        <input
          type="number"
          id="totalAmount"
          name="totalAmount"
          required
          min="0"
          step="0.01"
          value={formData.totalAmount}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="0.00"
        />
      </div>
    </div>
  );
} 