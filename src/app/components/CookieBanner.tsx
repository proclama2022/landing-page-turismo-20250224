// src/app/components/CookieBanner.tsx
'use client';

import React from 'react';

const CookieBanner: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center">
      <p className="text-sm">
        Questo sito utilizza i cookie per migliorare l'esperienza dell'utente.
        Continuando a navigare nel sito, acconsenti al nostro utilizzo dei cookie.
        <a href="https://management-advisor.eu/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">
          Privacy Policy
        </a>
      </p>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Accetta
        </button>
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Rifiuta
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
