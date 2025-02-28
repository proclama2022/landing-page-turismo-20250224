'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 py-2 shadow-lg' : 'bg-gray-900/70 py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <h1 className="text-xl font-bold text-white">Bando Turismo 2025</h1>
              <p className="text-sm text-gray-300">Finanziamenti per le imprese turistiche</p>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <Link href="#about" className="text-white hover:text-yellow-400 transition-colors duration-300">Chi Siamo</Link>
            <Link href="#eligibility" className="text-white hover:text-yellow-400 transition-colors duration-300">Requisiti</Link>
            <Link href="#bandoareas" className="text-white hover:text-yellow-400 transition-colors duration-300">Aree Finanziabili</Link>
            <Link href="#faq" className="text-white hover:text-yellow-400 transition-colors duration-300">FAQ</Link>
            <Link href="#form" className="text-white hover:text-yellow-400 transition-colors duration-300 bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600">Verifica Ammissibilità</Link>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-gray-800 rounded-lg p-4">
            <div className="flex flex-col space-y-3">
              <Link href="#about" className="text-white hover:text-yellow-400 transition-colors duration-300 py-2">Chi Siamo</Link>
              <Link href="#eligibility" className="text-white hover:text-yellow-400 transition-colors duration-300 py-2">Requisiti</Link>
              <Link href="#bandoareas" className="text-white hover:text-yellow-400 transition-colors duration-300 py-2">Aree Finanziabili</Link>
              <Link href="#faq" className="text-white hover:text-yellow-400 transition-colors duration-300 py-2">FAQ</Link>
              <Link href="#form" className="text-white bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300 text-center">Verifica Ammissibilità</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
