'use client';

import React from 'react';
import { FormState } from '@/types/form';
import CitySelect from '../CitySelect';
import { cities, City } from '@/app/data/cityData';
import FormField from '../FormField';

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
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Unità Locale</h2>

      <div>
        <label htmlFor="municipality" className="block text-sm font-medium text-gray-700 mb-1">
          Comune dell'intervento *
        </label>
        <CitySelect
          value={localUnit.municipality}
          onChange={handleCitySelect}
          error={undefined}
        />
      </div>

      {selectedCity && (
        <div className="mt-4 p-4 rounded-lg border">
          {selectedCity.score >= 6 ? (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-green-700 font-semibold text-lg mb-2">Ottima scelta! Punteggio massimo: {selectedCity.score} punti</h3>
              <p className="text-green-600">
                Hai selezionato un comune che ti garantisce il massimo punteggio per l'area dell'intervento. 
                Questo ti dà un vantaggio significativo nella valutazione complessiva del tuo progetto.
              </p>
            </div>
          ) : selectedCity.score >= 3 ? (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="text-yellow-700 font-semibold text-lg mb-2">Buona scelta: {selectedCity.score} punti</h3>
              <p className="text-yellow-600">
                Hai selezionato un comune che ti garantisce un buon punteggio per l'area dell'intervento. 
                Per massimizzare le tue possibilità, considera di rafforzare altri aspetti del progetto, come la sostenibilità ambientale.
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-blue-700 font-semibold text-lg mb-2">Punteggio base: {selectedCity.score} punti</h3>
              <p className="text-blue-600">
                Non scoraggiarti! Anche se il punteggio per questa località è basso, puoi compensare con altri criteri del bando. 
                Ti consigliamo di concentrarti sugli aspetti legati alla sostenibilità ambientale (ogni opzione vale +2 punti) 
                e sugli indicatori finanziari per aumentare il tuo punteggio complessivo.
              </p>
            </div>
          )}
        </div>
      )}

      {!selectedCity && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-gray-700 font-semibold text-lg mb-2">Informazioni sul punteggio</h3>
          <p className="text-gray-600">
            La scelta del comune influisce sul punteggio del tuo progetto. I comuni sono classificati in base a tre livelli di punteggio:
          </p>
          <ul className="mt-2 space-y-1 text-gray-600 list-disc pl-5">
            <li><span className="text-green-600 font-medium">6 punti</span>: Comuni in aree rurali, isole minori o aree con maggiore marginalità</li>
            <li><span className="text-yellow-600 font-medium">3 punti</span>: Comuni in aree con media marginalità</li>
            <li><span className="text-red-600 font-medium">0 punti</span>: Comuni in aree urbane o turistiche già sviluppate</li>
          </ul>
        </div>
      )}
    </div>
  );
} 