'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <Image
                src="/images/logo_MAD_white-yellow-300x300-1-150x150.png"
                alt="MAD - Management Advisor"
                width={120}
                height={120}
                className="object-contain drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]"
              />
            </div>
            <p className="text-gray-400 mb-4">
              • Premialità per immobili degradati e di interesse storico architettonico<br/>
              • Premialità per investimenti in aree rurali, a bassa marginalità e isole minori
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
                <a href="tel:+390953288293" className="hover:text-blue-400 transition-colors">+39 095.3288293</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-400 mr-3" />
                <a href="mailto:info@management-advisor.eu" className="hover:text-blue-400 transition-colors">info@management-advisor.eu</a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-400 mr-3 mt-1" />
                <span>Via Alessandro Manzoni snc<br />95037 San Giovanni La Punta (CT)</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Link Utili</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://management-advisor.eu/chi-siamo/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Chi Siamo</a>
              </li>
              <li>
                <a href="https://management-advisor.eu/clienti/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">I Nostri Clienti</a>
              </li>
              <li>
                <a href="https://management-advisor.eu/finanza-agevolata/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Servizi</a>
              </li>
              <li>
                <a href="https://management-advisor.eu/privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="https://management-advisor.eu/cookie-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
              </li>
              <li>
                <a href="https://management-advisor.eu/termini-e-condizioni/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Termini e Condizioni</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Informazioni Legali</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Privacy Policy</li>
              <li className="text-gray-400">Cookie Policy</li>
              <li className="text-gray-400">Termini e Condizioni</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://www.facebook.com/managementadvisor" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <FaFacebook size={24} />
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
