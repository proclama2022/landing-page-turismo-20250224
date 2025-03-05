import React, { useState, useEffect, useRef } from 'react';
import { City, cities, searchCities } from '@/app/data/cityData';

interface CitySelectProps {
  value: string;
  onChange: (cityName: string) => void;
  error?: string;
}

export default function CitySelect({ value, onChange, error }: CitySelectProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Verifica se il dispositivo è mobile
  useEffect(() => {
    const checkMobile = () => {
      // Usa una combinazione di user agent e dimensione dello schermo per rilevare i dispositivi mobili
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

  // Blocca lo scroll del body quando il dropdown è aperto su mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isOpen, isMobile]);

  // Chiudi il dropdown quando si clicca fuori
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Reset della query di ricerca quando si chiude il dropdown
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [isOpen]);

  // Gestisce la ricerca e aggiorna i risultati
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      const results = searchCities(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const selectedCity = cities.find(city => city.name === value);

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

  // Gestisce l'apertura del dropdown
  const handleDropdownToggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Gestisce la selezione di una città
  const handleCitySelection = (cityName: string, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(cityName);
    setIsOpen(false);
  };

  // Rendering per dispositivi mobili
  if (isMobile) {
    return (
      <div className="relative">
        {/* Pulsante di selezione */}
        <button
          ref={buttonRef}
          type="button"
          className={`relative w-full bg-white border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm pl-3 pr-10 py-2.5 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 hover:border-blue-400 ${isOpen ? 'ring-1 ring-blue-500 border-blue-500' : ''}`}
          onClick={handleDropdownToggle}
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

        {/* Lista semplice per mobile */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center">
            <div className="bg-white w-[90%] max-w-md rounded-lg shadow-xl overflow-hidden max-h-[80vh] flex flex-col">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Seleziona una città</h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <div className="py-1">
                  {cities
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(city => (
                      <button
                        key={`${city.province}-${city.name}`}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 ${value === city.name ? 'bg-blue-100' : ''}`}
                        onClick={(e) => handleCitySelection(city.name, e)}
                      >
                        <div className="font-medium">{city.name}</div>
                        <div className="text-sm text-gray-500">Provincia di {city.province}</div>
                      </button>
                    ))}
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
                  onClick={() => setIsOpen(false)}
                >
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }

  // Rendering per desktop
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        className={`relative w-full bg-white border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm pl-3 pr-10 py-2.5 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 hover:border-blue-400 ${isOpen ? 'ring-1 ring-blue-500 border-blue-500' : ''}`}
        onClick={handleDropdownToggle}
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

      {/* Dropdown per desktop */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-[9999] mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto"
          style={{
            boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Header con barra di ricerca */}
          <div className="sticky top-0 z-50 bg-white p-3 border-b border-gray-200 w-full">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                className="w-full border border-gray-300 rounded-md pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Cerca città..."
                value={searchQuery}
                onChange={handleSearch}
                onClick={(e) => e.stopPropagation()}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchQuery('');
                    setSearchResults([]);
                    inputRef.current?.focus();
                  }}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Lista delle città */}
          <div className="overflow-y-auto">
            {searchQuery && searchResults.length > 0 && (
              <div className="py-1 w-full">
                {searchResults.map(city => (
                  <div
                    key={`${city.province}-${city.name}`}
                    className={`cursor-pointer px-3 py-2.5 hover:bg-blue-50 w-full ${
                      value === city.name ? 'bg-blue-100' : ''
                    }`}
                    onClick={(e) => handleCitySelection(city.name, e)}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <span className={`${value === city.name ? 'font-medium' : 'font-normal'}`}>
                          {city.name}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          ({city.province})
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchQuery && searchResults.length === 0 && (
              <div className="text-center py-8 text-sm text-gray-500 w-full">
                Nessuna città trovata per "{searchQuery}"
              </div>
            )}

            {!searchQuery && (
              <div className="py-1 w-full">
                {cities
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(city => (
                    <div
                      key={`${city.province}-${city.name}`}
                      className={`cursor-pointer px-3 py-2.5 hover:bg-blue-50 w-full ${
                        value === city.name ? 'bg-blue-100' : ''
                      }`}
                      onClick={(e) => handleCitySelection(city.name, e)}
                    >
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <span className={`${value === city.name ? 'font-medium' : 'font-normal'}`}>
                            {city.name}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            ({city.province})
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
