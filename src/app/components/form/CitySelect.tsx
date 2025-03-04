import React, { useState, useEffect, useRef } from 'react';
import { City, cities, getCitiesByProvince } from '@/app/data/cityData';

interface CitySelectProps {
  value: string;
  onChange: (cityName: string) => void;
  error?: string;
}

export default function CitySelect({ value, onChange, error }: CitySelectProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [groupedCities, setGroupedCities] = useState<Record<string, City[]>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ordina le città per provincia e poi per nome
    const sorted = Object.entries(getCitiesByProvince()).reduce((acc, [province, provinceCities]) => {
      acc[province] = provinceCities.sort((a, b) => a.name.localeCompare(b.name));
      return acc;
    }, {} as Record<string, City[]>);
    setGroupedCities(sorted);
  }, []);

  // Chiudi il dropdown quando si clicca fuori
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside); // Aggiunto evento touch per dispositivi mobili
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [dropdownRef, buttonRef]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCities = searchQuery
    ? Object.entries(groupedCities).reduce((acc, [province, provinceCities]) => {
        const filtered = provinceCities.filter(city =>
          city.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length > 0) {
          acc[province] = filtered;
        }
        return acc;
      }, {} as Record<string, City[]>)
    : groupedCities;

  const selectedCity = cities.find(city => city.name === value);

  // Funzione per ottenere il messaggio motivazionale in base al punteggio
  const getScoreMessage = (score: number) => {
    if (score >= 6) {
      return (
        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md animate__animated animate__fadeIn">
          <p className="text-sm text-green-700 font-medium flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            <svg className="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

  // Calcola la posizione del dropdown
  const getDropdownPosition = () => {
    if (!buttonRef.current || !containerRef.current) return {};
    
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Su mobile, posiziona il dropdown in modo che occupi tutta la larghezza disponibile
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      return {
        position: 'fixed' as const,
        top: buttonRect.bottom + window.scrollY + 8,
        left: 16, // Margine fisso dai bordi dello schermo
        right: 16,
        width: 'auto',
        maxHeight: '50vh', // Limita l'altezza al 50% della viewport su mobile
        zIndex: 9999
      };
    }
    
    // Su desktop, mantieni il comportamento attuale
    return {
      position: 'absolute' as const,
      top: buttonRect.height + 8,
      left: 0,
      width: containerRect.width,
      maxHeight: '400px',
      zIndex: 50
    };
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        className={`relative w-full bg-white border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm pl-3 pr-10 py-2.5 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 hover:border-blue-400 ${isOpen ? 'ring-1 ring-blue-500 border-blue-500' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        onTouchEnd={(e) => {
          e.preventDefault(); // Previene comportamenti indesiderati su touch
          setIsOpen(!isOpen);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedCity ? (
          <span className="block truncate">{selectedCity.name}</span>
        ) : (
          <span className="block truncate text-gray-500">
            Seleziona una città...
          </span>
        )}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg 
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </button>

      {/* Messaggio motivazionale sempre visibile */}
      <div className="mt-2 mb-2 p-2 bg-blue-50 border border-blue-200 rounded-md animate__animated animate__fadeIn">
        <p className="text-xs text-blue-700 font-medium flex items-center">
          <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          La scelta del comune influisce sul punteggio del tuo progetto
        </p>
      </div>

      {/* Messaggio basato sul punteggio del comune selezionato */}
      {selectedCity && getScoreMessage(selectedCity.score)}

      {isOpen && (
        <div 
          ref={dropdownRef}
          className="bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm animate__animated animate__fadeIn"
          style={{
            ...getDropdownPosition(),
            boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.2)',
            animationDuration: '0.2s'
          }}
        >
          <div className="sticky top-0 z-50 bg-white px-3 py-2 border-b border-gray-200">
            {/* Ripristino del messaggio motivazionale all'interno del dropdown */}
            <div className="mb-2 text-sm font-medium text-blue-600 animate__animated animate__fadeIn">
              <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              La scelta del comune influisce sul punteggio del tuo progetto
            </div>
            <input
              type="search"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Cerca città..."
              value={searchQuery}
              onChange={handleSearch}
              autoFocus
            />
          </div>

          {Object.entries(filteredCities).map(([province, provinceCities], provinceIndex) => (
            <div key={province}>
              <div className="sticky top-[84px] z-40 bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 border-t border-b border-gray-200">
                Provincia di {province}
              </div>
              {provinceCities.map((city) => (
                <div
                  key={`${city.province}-${city.name}`}
                  className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 transition-colors duration-150 ${
                    value === city.name ? 'bg-blue-100' : ''
                  }`}
                  onClick={() => {
                    onChange(city.name);
                    setIsOpen(false);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault(); // Previene comportamenti indesiderati su touch
                    onChange(city.name);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className={`block truncate ${value === city.name ? 'font-medium' : 'font-normal'}`}>
                      {city.name}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      city.score >= 6 ? 'bg-green-100 text-green-800' : 
                      city.score >= 3 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {city.score} punti
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {Object.keys(filteredCities).length === 0 && (
            <div className="text-center py-4 text-sm text-gray-500">
              Nessuna città trovata
            </div>
          )}
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
