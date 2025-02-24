'use client';

'use client';

'use client';

import React from 'react';

interface FormFieldProps {
  type?: 'text' | 'textarea' | 'select' | 'checkbox';
  name: string;
  label: string;
  error?: string | undefined;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  options?: Array<{ value: string; label: string }>;
  onChange: (...event: any[]) => void;
  onBlur: (...event: any[]) => void;
  ref: React.Ref<any>;
}

const FormField: React.FC<FormFieldProps> = ({
  type = 'text',
  name,
  label,
  error,
  helperText,
  required,
  placeholder,
  rows = 3,
  options = [],
  onChange,
  onBlur,
  ref
}) => {
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            rows={rows}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            className={`
              block w-full rounded-md py-2 px-3
              ${error
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }
            `}
            placeholder={placeholder}
          />
        );

      case 'select':
        return (
          <select
            id={name}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            className={`
              block w-full rounded-md py-2 px-3
              ${error
                ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }
            `}
          >
            <option value="">{placeholder || 'Seleziona...'}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            id={name}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            className={`
              rounded border-gray-300 text-blue-600 focus:ring-blue-500
              ${error ? 'ring-2 ring-red-500' : ''}
            `}
          />
        );

      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            className={`
              block w-full rounded-md py-2 px-3
              ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}
            `}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-1">{renderInput()}</div>
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
export type { FormFieldProps };
