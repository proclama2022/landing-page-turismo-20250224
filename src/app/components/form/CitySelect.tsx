import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Ordina le città per provincia e poi per punteggio decrescente
    const sorted = Object.entries(getCitiesByProvince()).reduce((acc, [province, provinceCities]) => {
      acc[province] = provinceCities.sort((a, b) => b.score - a.score);
      return acc;
    }, {} as Record<string, City[]>);
    setGroupedCities(sorted);
  }, []);

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

  const getScoreColor = (score: number) => {
    if (score >= 6) return 'text-green-600';
    if (score >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 6) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {score} punti - Massimo
        </span>
      );
    } else if (score >= 3) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          {score} punti - Medio
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          {score} punti - Base
        </span>
      );
    }
  };

  return (
    <div className="relative">
      <div className="mb-1">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          Città dell'intervento *
        </label>
      </div>

      <div className="mt-1 relative">
        <button
          type="button"
          className={`relative w-full bg-white border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCity ? (
            <div className="flex items-center justify-between">
              <span className="block truncate font-medium">{selectedCity.name}</span>
              {getScoreBadge(selectedCity.score)}
            </div>
          ) : (
            <span className="block truncate text-gray-500">
              Seleziona una città
            </span>
          )}
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-96 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <div className="sticky top-0 z-10 bg-white px-2 py-2">
              <input
                type="search"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Cerca città..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <div className="mt-2 flex space-x-2 text-xs">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                  6 punti
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                  3 punti
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                  0 punti
                </span>
              </div>
            </div>

            {Object.entries(filteredCities).map(([province, provinceCities]) => (
              <div key={province}>
                <div className="sticky top-24 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  Provincia di {province}
                </div>
                {provinceCities.map(city => (
                  <div
                    key={`${city.province}-${city.name}`}
                    className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 ${
                      value === city.name ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      onChange(city.name);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{city.name}</span>
                      {getScoreBadge(city.score)}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {Object.keys(filteredCities).length === 0 && (
              <div className="text-center py-3 text-sm text-gray-500">
                Nessuna città trovata
              </div>
            )}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
