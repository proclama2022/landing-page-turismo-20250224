'use client';

import React from 'react';
import { FormState } from '@/types/form';
import CitySelect from '../CitySelect';
import { cities, City } from '@/app/data/cityData';

interface LocationStepProps {
  formData: FormState;
  updateFormData: (updates: Partial<FormState>) => void;
}

export default function LocationStep({ formData, updateFormData }: LocationStepProps) {
  const handleCitySelect = (cityName: string) => {
    const localUnit = formData.localUnit || {
      municipality: '',
      province: '',
      address: '',
      postalCode: ''
    };

    // Trova la città selezionata nei dati delle città
    const selectedCity = cities.find((city: City) => city.name === cityName);

    if (selectedCity) {
      updateFormData({
        localUnit: {
          ...localUnit,
          municipality: selectedCity.name,
          province: selectedCity.province
        }
      });
    }
  };

  const localUnit = formData.localUnit || {
    municipality: '',
    province: '',
    address: '',
    postalCode: ''
  };

  // Ottieni la città selezionata per mostrare messaggi specifici sul punteggio
  const selectedCity = localUnit.municipality ? cities.find((city: City) => city.name === localUnit.municipality) : null;

  return (
    <div className="space-y-6 animate__animated animate__fadeIn">
      <h2 className="text-xl font-bold mb-6 animate__animated animate__fadeIn">Unità locale</h2>
      
      <div className="mb-6">
        <div className="mb-4">
          <label htmlFor="municipality" className="block text-base font-medium text-gray-700 mb-2">
            Comune dell'intervento <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-500 mb-4">
            Seleziona il comune in cui realizzerai il tuo progetto. Ricorda che alcuni comuni possono garantire un punteggio più alto.
          </p>
        </div>
        
        <div className="relative z-30">
          <CitySelect
            value={localUnit.municipality}
            onChange={handleCitySelect}
            error={undefined}
          />
        </div>
        
        <div className="mt-3 flex items-center space-x-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-green-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-xs text-gray-700">6 punti - Ottimo</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <span className="text-xs text-gray-700">3 punti - Medio</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <span className="text-xs text-gray-700">0 punti - Basso</span>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex items-center text-blue-600">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-sm">La scelta del comune influisce sul punteggio del tuo progetto</span>
          </div>
        </div>
      </div>
    </div>
  );
} 