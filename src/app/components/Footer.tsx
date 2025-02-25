'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <Image
                src="/logo.png"
                alt="Management Advisor Logo"
                width={180}
                height={60}
                className="rounded-md"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Specialisti in consulenza per l'accesso ai fondi del Bando Turismo Sicilia 2025 per le imprese turistiche siciliane.
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Management Advisor. Tutti i diritti riservati.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Contatti</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaPhone className="text-blue-400 mr-3" />
                <a href="tel:+390917308101" className="hover:text-blue-400 transition-colors">+39 091 7308101</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-400 mr-3" />
                <a href="mailto:info@managementadvisor.it" className="hover:text-blue-400 transition-colors">info@managementadvisor.it</a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-400 mr-3 mt-1" />
                <span>Via Notarbartolo, 5<br />90141 Palermo (PA)</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Link Utili</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#about" className="hover:text-blue-400 transition-colors">Chi Siamo</Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-blue-400 transition-colors">Servizi</Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-blue-400 transition-colors">Codici ATECO</Link>
              </li>
              <li>
                <Link href="#eligibility" className="hover:text-blue-400 transition-colors">Requisiti</Link>
              </li>
              <li>
                <Link href="#process" className="hover:text-blue-400 transition-colors">Processo</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Informazioni Legali</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-blue-400 transition-colors">Cookie Policy</Link>
              </li>
              <li>
                <Link href="/termini-condizioni" className="hover:text-blue-400 transition-colors">Termini e Condizioni</Link>
              </li>
              <li>
                <p className="text-gray-400 text-sm mt-4">
                  P.IVA: 06919670828<br />
                  REA: PA-398205
                </p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://www.facebook.com/managementadvisor" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.instagram.com/management_advisor/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/company/management-advisor-srl/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <FaLinkedin size={24} />
            </a>
          </div>
          <p className="text-gray-500 text-sm text-center">
            Questa pagina non costituisce comunicazione ufficiale. Per informazioni ufficiali consultare il sito della Regione Siciliana.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
