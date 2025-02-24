'use client';

import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative w-40 h-12">
            {/* Placeholder temporaneo per il logo */}
            <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded">
              <span className="text-gray-500 text-sm font-medium">Logo</span>
            </div>
          </div>
        </div>
        <div className="text-center flex-1 px-4">
          <h1 className="text-2xl font-bold text-foreground">Bando Turismo 2024</h1>
          <p className="text-foreground mt-1">Scopri se la tua attività è idonea al finanziamento</p>
        </div>
        <div className="w-40">
          {/* Spazio riservato per eventuali elementi aggiuntivi */}
        </div>
      </div>
    </header>
  );
};

export default Header;
