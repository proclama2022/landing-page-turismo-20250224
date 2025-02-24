'use client';

import React from 'react';

interface MoneyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  min?: number;
  max?: number;
}

const MoneyInput: React.FC<MoneyInputProps> = ({
  label,
  value,
  onChange,
  error,
  helperText,
  required,
  min,
  max
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^0-9]/g, '');
    let numericValue = rawValue ? parseInt(rawValue, 10) : 0;

    // Apply min/max constraints
    if (min !== undefined && numericValue < min) {
      numericValue = min;
    }
    if (max !== undefined && numericValue > max) {
      numericValue = max;
    }

    onChange(numericValue);
  };

  const formattedValue = value.toLocaleString('it-IT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">€</span>
        </div>
        <input
          type="text"
          value={formattedValue}
          onChange={handleChange}
          className={`
            block w-full pl-8 pr-12 py-2 rounded-md 
            ${error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }
          `}
          placeholder="0,00"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">EUR</span>
        </div>
      </div>
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">
          {helperText}
          {min !== undefined && max !== undefined && (
            <span className="block text-xs text-gray-400">
              Valore compreso tra €{min.toLocaleString('it-IT')} e €{max.toLocaleString('it-IT')}
            </span>
          )}
        </p>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default MoneyInput;
