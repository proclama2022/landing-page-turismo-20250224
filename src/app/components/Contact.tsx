'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimateWhenVisible from './ui/AnimateWhenVisible';
import Image from 'next/image';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <AnimateWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contattaci
            </h2>
            <div className="h-1 bg-yellow-400 mx-auto mb-6" style={{ width: '120px' }} />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Siamo qui per aiutarti a ottenere il massimo dal Bando Turismo Sicilia 2025
            </p>
          </div>
        </AnimateWhenVisible>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <AnimateWhenVisible direction="left">
            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
              <div className="flex items-center mb-8">
                <Image 
                  src="/images/logo_MAD_white-yellow-300x300-1-150x150.png" 
                  alt="MAD - Management Advisor" 
                  width={60} 
                  height={60}
                  className="mr-4"
                />
                <h3 className="text-2xl font-bold text-gray-900">I Nostri Contatti</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Telefono</h4>
                    <p className="text-gray-600">+39 091 611 5934</p>
                    <p className="text-gray-600">+39 379 192 6095</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@managementadvisor.it</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Sede</h4>
                    <p className="text-gray-600">Via Resuttana, 360</p>
                    <p className="text-gray-600">90146 - Palermo</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateWhenVisible>

          <AnimateWhenVisible direction="right">
            <div className="bg-black p-8 rounded-xl shadow-xl text-white">
              <h3 className="text-2xl font-bold mb-6">Orari di apertura</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Lunedì - Venerdì</span>
                  <span>9:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span className="font-medium">Sabato - Domenica</span>
                  <span>Chiuso</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Note</h4>
                <p className="text-gray-300">
                  Siamo disponibili anche per appuntamenti fuori orario, 
                  contattaci per maggiori informazioni.
                </p>
              </div>

              <motion.div 
                className="mt-8 p-4 bg-yellow-400 rounded-lg text-black"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-semibold">
                  Richiedi una consulenza gratuita per il Bando Turismo Sicilia 2025
                </p>
              </motion.div>
            </div>
          </AnimateWhenVisible>
        </div>
      </div>
    </section>
  );
} 