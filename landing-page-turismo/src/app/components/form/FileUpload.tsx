'use client';

import React, { ChangeEvent, useRef } from 'react';

interface FileUploadProps {
  label: string;
  accept?: string;
  required?: boolean;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  helperText?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept,
  required,
  value,
  onChange,
  error,
  helperText
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange(file);
  };

  const handleRemove = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {value && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Rimuovi
          </button>
        )}
      </div>

      <div
        onClick={handleClick}
        className={`relative border-2 border-dashed rounded-lg p-4 cursor-pointer
          ${error ? 'border-red-500' : value ? 'border-green-500' : 'border-gray-300'}
          ${error ? 'hover:border-red-600' : value ? 'hover:border-green-600' : 'hover:border-gray-400'}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex items-center justify-center space-x-2">
          {value ? (
            <>
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-gray-600">{value.name}</span>
            </>
          ) : (
            <>
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="text-sm text-gray-500">
                Click per caricare o trascina qui il file
              </span>
            </>
          )}
        </div>
      </div>

      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FileUpload;
