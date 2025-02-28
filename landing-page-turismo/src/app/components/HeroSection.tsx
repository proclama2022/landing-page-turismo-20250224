'use client';

import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  onOpenForm: () => void;
}

const HeroSection = ({ onOpenForm }: HeroSectionProps) => {
  return (
    <section className="pt-24 pb-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Finanziamenti per il Turismo
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Verifica subito se la tua attività può accedere ai finanziamenti del nuovo bando turismo.
              Scopri in pochi minuti se sei idoneo.
            </p>
            <button 
              onClick={onOpenForm}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Verifica la tua Idoneità
            </button>
          </div>
            <div className="flex-1 relative h-[400px]">
            <div className="absolute inset-0 bg-blue-100 rounded-lg -rotate-2"></div>
            <Image
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Struttura turistica siciliana"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg shadow-xl rotate-2"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
