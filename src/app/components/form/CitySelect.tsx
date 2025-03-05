import React, { useState, useEffect, useRef } from 'react';
import { City, cities, getCitiesByProvince, searchCities } from '@/app/data/cityData';

interface CitySelectProps {
  value: string;
  onChange: (cityName: string) => void;
  error?: string;
}

export default function CitySelect({ value, onChange, error }: CitySelectProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [groupedCities, setGroupedCities] = useState<Record<string, City[]>>({});
  const [flatSearchResults, setFlatSearchResults] = useState<City[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, maxHeight: 0 });

  // Verifica se il dispositivo è mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Ordina le città per provincia e poi per nome
    const sorted = Object.entries(getCitiesByProvince()).reduce((acc, [province, provinceCities]) => {
      acc[province] = provinceCities.sort((a, b) => a.name.localeCompare(b.name));
      return acc;
    }, {} as Record<string, City[]>);
    setGroupedCities(sorted);
  }, []);

  // Blocca lo scroll del body quando il dropdown è aperto su mobile
  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  // Calcola la posizione ottimale del dropdown quando si apre
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (isMobile) {
        // Su mobile, il dropdown occupa l'intera altezza dello schermo
        setDropdownPosition({
          top: 0,
          maxHeight: windowHeight
        });
      } else {
        // Su desktop, calcola lo spazio disponibile
        const spaceBelow = windowHeight - buttonRect.bottom;
        const maxHeight = Math.min(500, spaceBelow - 20); // 20px di margine
        
        setDropdownPosition({
          top: buttonRect.height + 4,
          maxHeight
        });
      }
      
      // Focus sull'input di ricerca dopo un breve ritardo
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
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
  }, [dropdownRef, buttonRef]);

  // Reset della query di ricerca quando si chiude il dropdown
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setFlatSearchResults([]);
    }
  }, [isOpen]);

  // Gestisce la ricerca e aggiorna i risultati
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      // Utilizziamo la funzione searchCities per una ricerca più accurata
      const results = searchCities(query)
        .sort((a, b) => {
          // Ordina prima per corrispondenza esatta, poi per inizio parola, poi alfabeticamente
          const aLower = a.name.toLowerCase();
          const bLower = b.name.toLowerCase();
          const queryLower = query.toLowerCase();
          
          const aExact = aLower === queryLower;
          const bExact = bLower === queryLower;
          
          if (aExact && !bExact) return -1;
          if (!aExact && bExact) return 1;
          
          const aStartsWith = aLower.startsWith(queryLower);
          const bStartsWith = bLower.startsWith(queryLower);
          
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          
          // Ordina per lunghezza (preferendo nomi più corti)
          if (a.name.length !== b.name.length) {
            return a.name.length - b.name.length;
          }
          
          return a.name.localeCompare(b.name);
        });
      
      setFlatSearchResults(results);
    } else {
      setFlatSearchResults([]);
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

  // Chiude il dropdown
  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  // Renderizza un elemento città
  const renderCityItem = (city: City) => (
    <div
      key={`${city.province}-${city.name}`}
      className={`cursor-pointer select-none relative py-3.5 pl-3 pr-9 hover:bg-blue-50 transition-colors duration-150 ${
        value === city.name ? 'bg-blue-100' : ''
      }`}
      onClick={(e) => handleCitySelection(city.name, e)}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className={`block truncate ${value === city.name ? 'font-medium' : 'font-normal'}`}>
            {city.name}
          </span>
          <span className="ml-2 text-xs text-gray-500">
            ({city.province})
          </span>
        </div>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
          city.score >= 6 ? 'bg-green-100 text-green-800' : 
          city.score >= 3 ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {city.score} punti
        </span>
      </div>
    </div>
  );

  return (
    <div className="relative overflow-visible" ref={containerRef}>
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

      {/* Messaggio informativo (solo fuori dal dropdown) */}
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

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`${isMobile ? 'fixed inset-0 z-[9999] flex flex-col' : 'absolute left-0 right-0 z-[9999]'} bg-white shadow-lg rounded-md overflow-hidden focus:outline-none sm:text-sm animate__animated animate__fadeIn`}
          style={{
            top: isMobile ? 0 : `${dropdownPosition.top}px`,
            boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.2)',
            animationDuration: '0.2s',
            maxHeight: isMobile ? '100%' : `${dropdownPosition.maxHeight}px`,
            width: isMobile ? '100%' : '100%'
          }}
        >
          {/* Header con barra di ricerca e pulsante di chiusura */}
          <div className="sticky top-0 z-50 bg-white px-3 py-3 border-b border-gray-200 flex flex-col">
            {isMobile && (
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-900">Seleziona una città</h3>
                <button
                  type="button"
                  className="rounded-full p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
                  onClick={handleCloseDropdown}
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            )}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                ref={inputRef}
                type="search"
                className="w-full border border-gray-300 rounded-md pl-10 pr-10 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Cerca città..."
                value={searchQuery}
                onChange={handleSearch}
                onClick={(e) => e.stopPropagation()}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                autoCapitalize="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchQuery('');
                    setFlatSearchResults([]);
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
          <div className={`overflow-y-auto ${isMobile ? 'flex-grow' : ''}`} style={{ maxHeight: isMobile ? 'none' : `${dropdownPosition.maxHeight - 70}px` }}>
            {/* Mostra risultati di ricerca in formato piatto quando c'è una query di ricerca */}
            {searchQuery && flatSearchResults.length > 0 && (
              <div className="py-2 w-full">
                <div className="sticky top-[60px] z-40 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 border-t border-b border-blue-200 w-full">
                  Risultati di ricerca per "{searchQuery}" ({flatSearchResults.length})
                </div>
                <div className="w-full">
                  {flatSearchResults.map(city => renderCityItem(city))}
                </div>
              </div>
            )}

            {/* Mostra messaggio se non ci sono risultati */}
            {searchQuery && flatSearchResults.length === 0 && (
              <div className="text-center py-8 text-sm text-gray-500">
                Nessuna città trovata per "{searchQuery}"
              </div>
            )}

            {/* Mostra tutte le città raggruppate per provincia quando non c'è ricerca */}
            {!searchQuery && (
              <div className="w-full">
                {Object.entries(groupedCities).map(([province, provinceCities], provinceIndex) => (
                  <div key={province} className="w-full">
                    <div className="sticky top-[60px] z-40 bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 border-t border-b border-gray-200 w-full">
                      Provincia di {province}
                    </div>
                    <div className="w-full">
                      {provinceCities.map(city => renderCityItem(city))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer con pulsante di chiusura su mobile */}
          {isMobile && (
            <div className="sticky bottom-0 z-50 bg-white px-3 py-3 border-t border-gray-200">
              <button
                type="button"
                className="w-full bg-blue-600 text-white font-medium py-2.5 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleCloseDropdown}
              >
                Chiudi
              </button>
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
