'use client';

import React from 'react';
import FormContainer from './FormContainer';
import { FormState } from '../../types/form';

export default function FormWrapper() {
  const handleSubmit = (formData: FormState) => {
    console.log('Form submitted:', formData);
    alert('Form submitted! Check the console for data.');
  };

  const handleCancel = () => {
    alert('Form submission cancelled.');
  };

  return (
    <FormContainer onSubmit={handleSubmit} onCancel={handleCancel} />
  );
} 