'use client';

'use client';

'use client';

import React from 'react';
import {
  EnvelopeIcon,
  MapPinIcon,
  BuildingLibraryIcon,
  BanknotesIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface FormFieldProps {
  label: string;
  name: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file';
  value?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  error?: string;
  disabled?: boolean;
  className?: string;
  min?: number;
  max?: number;
  rows?: number;
  accept?: string;
  multiple?: boolean;
}

const getIconComponent = (iconName?: string) => {
    switch (iconName) {
        case 'email':
            return <EnvelopeIcon className="w-5 h-5 text-gray-500" />;
        case 'location':
            return <MapPinIcon className="w-5 h-5 text-gray-500" />;
        case 'company':
            return <BuildingLibraryIcon className="w-5 h-5 text-gray-500" />;
        case 'money':
            return <BanknotesIcon className="w-5 h-5 text-gray-500" />;
        case 'project':
            return <DocumentTextIcon className="w-5 h-5 text-gray-500"/>
        default:
            return null;
    }
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
  options,
  error,
  disabled,
  className,
  min,
  max,
  rows = 4,
  accept,
  multiple,
}) => {
  const baseInputClasses = `
    w-full px-4 py-2.5 
    bg-white 
    border border-gray-300 
    rounded-lg
    shadow-sm
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    transition-all duration-200
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
  `;

  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={rows}
            className={`${baseInputClasses} resize-none`}
          />
        );
      case 'select':
        return (
          <div className="relative">
            <select
              id={name}
              name={name}
              value={value || ''}
              onChange={onChange}
              required={required}
              disabled={disabled}
              className={`${baseInputClasses} appearance-none pr-10`}
            >
              <option value="">{placeholder || 'Seleziona un\'opzione'}</option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={`${name}-${option.value}`}
                  name={name}
                  type="radio"
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                  disabled={disabled}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="flex items-center h-5">
            <input
              id={name}
              name={name}
              type="checkbox"
              checked={value}
              onChange={onChange}
              disabled={disabled}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        );
      case 'file':
        return (
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor={name}
              className={`
                flex flex-col items-center justify-center w-full h-32
                border-2 border-gray-300 border-dashed rounded-lg
                cursor-pointer bg-gray-50 hover:bg-gray-100
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-3 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Clicca per caricare</span> o trascina qui
                </p>
                <p className="text-xs text-gray-500">{accept || 'Qualsiasi tipo di file'}</p>
              </div>
              <input
                id={name}
                name={name}
                type="file"
                onChange={onChange}
                disabled={disabled}
                accept={accept}
                multiple={multiple}
                className="hidden"
              />
            </label>
          </div>
        );
      default:
        return (
          <input
            id={name}
            name={name}
            type={type}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
            className={baseInputClasses}
          />
        );
    }
  };

  return (
    <div className={`mb-4 ${className || ''}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
