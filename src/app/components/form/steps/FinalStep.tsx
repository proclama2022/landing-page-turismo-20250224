'use client';

import React from 'react';
import { FormState } from '@/types/form';

interface FinalStepProps {
  formData: FormState;
  updateFormData: (updates: Partial<FormState>) => void;
}

export default function FinalStep({ formData, updateFormData }: FinalStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Conferma</h2>
      <p>
        Controlla attentamente i dati inseriti prima di inviare la domanda.
      </p>
    </div>
  );
}
