import React, { useState, useEffect } from 'react';
import { City, cities } from '@/app/data/cityData';

interface CitySelectProps {
  value: string;
  onChange: (cityName: string) => void;
  error?: string;
}

export default function CitySelect({ value, onChange, error }: CitySelectProps) {
  const [isMobile, setIsMobile] = useState(false);
  const selectedCity = cities.find(city => city.name === value);

  // Verifica se il dispositivo è mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Funzione per ottenere il messaggio motivazionale in base al punteggio
  const getScoreMessage = (score: number) => {
    if (score >= 6) {
      return (
        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md animate__animated animate__fadeIn">
          <p className="text-sm text-green-700 font-medium flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>
              <strong>Complimenti!</strong> Hai selezionato un comune con punteggio massimo (6 punti). Questo ti offre ottime possibilità di successo per il tuo progetto.
            </span>
          </p>
        </div>
      );
    } else if (score >= 3) {
      return (
        <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md animate__animated animate__fadeIn">
          <p className="text-sm text-yellow-700 font-medium flex items-center">
            <svg className="w-5 h-5 mr-2 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <span>
              <strong>Buona scelta!</strong> Questo comune ha un punteggio medio (3 punti). Considera di rafforzare altri aspetti del tuo progetto per aumentare le possibilità di successo.
            </span>
          </p>
        </div>
      );
    } else {
      return (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md animate__animated animate__fadeIn">
          <p className="text-sm text-red-700 font-medium flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>
              <strong>Attenzione!</strong> Questo comune non offre punti aggiuntivi. Ti consigliamo di rafforzare altri aspetti del tuo progetto per aumentare le possibilità di successo.
            </span>
          </p>
        </div>
      );
    }
  };

  // Utilizziamo un semplice elemento select nativo per massima compatibilità
  return (
    <div className="relative">
      <select
        className={`w-full bg-white border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm pl-3 pr-10 py-2.5 text-base focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 appearance-none`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem'
        }}
      >
        <option value="" disabled>Seleziona una città...</option>
        {cities
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(city => (
            <option key={`${city.province}-${city.name}`} value={city.name}>
              {city.name} ({city.province})
            </option>
          ))}
      </select>

      {/* Messaggio informativo */}
      <div className="mt-2 mb-2 p-2 bg-blue-50 border border-blue-200 rounded-md animate__animated animate__fadeIn">
        <p className="text-xs text-blue-700 font-medium flex items-center">
          <svg className="w-4 h-4 inline-block mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>La scelta del comune influisce sul punteggio del tuo progetto</span>
        </p>
      </div>

      {/* Messaggio basato sul punteggio del comune selezionato */}
      {selectedCity && getScoreMessage(selectedCity.score)}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
