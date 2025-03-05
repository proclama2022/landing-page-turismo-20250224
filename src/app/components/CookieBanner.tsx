// src/app/components/CookieBanner.tsx
'use client';

import React, { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent !== 'true') {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div data-cookie-banner className="fixed top-0 left-0 right-0 z-[9999] bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm md:max-w-3xl">
          Questo sito utilizza i cookie per migliorare l'esperienza dell'utente.
          Continuando a navigare nel sito, acconsenti al nostro utilizzo dei cookie.
          <a href="https://management-advisor.eu/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">
            Privacy Policy
          </a>
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleAccept}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition-colors"
          >
            Accetta
          </button>
          <button
            onClick={handleDecline}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Rifiuta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
