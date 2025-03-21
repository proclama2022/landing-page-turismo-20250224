import React from 'react';
import Link from 'next/link';
import AnimatedSection from './ui/AnimatedSection';
import AnimatedButton from './ui/AnimatedButton';
import { motion } from 'framer-motion';
import FormModal from './form/FormModal';
import Image from 'next/image';
import { useModal } from '@/app/ModalContext';

export default function CallToAction() {
  const { openModal } = useModal();

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-black via-blue-900 to-black text-white relative overflow-hidden">
        {/* Elementi decorativi animati */}
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-10"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full opacity-10"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="text-left">
                <div className="flex items-center mb-6">
                  <Image 
                    src="/images/logo_MAD_white-yellow-300x300-1-150x150.png" 
                    alt="MAD - Management Advisor" 
                    width={80} 
                    height={80}
                    className="object-contain drop-shadow-[0_0_8px_rgba(255,215,0,0.5)] mr-4"
                  />
                  <h3 className="text-2xl font-semibold text-yellow-400">Management Advisor</h3>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-hero-title">
                  Non perdere l'opportunità del Bando Turismo Sicilia 2025
                </h2>
                
                <p className="text-lg text-white mb-8 text-hero-subtitle">
                  Contattaci oggi stesso per una consulenza gratuita e scopri come Management Advisor può aiutarti ad accedere ai finanziamenti fino all'80% per la tua impresa turistica in Sicilia.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <AnimatedButton 
                    onClick={openModal}
                    className="bg-yellow-400 text-black font-semibold shadow-lg hover:bg-yellow-500"
                  >
                    Verifica la tua ammissibilità
                  </AnimatedButton>
                  
                  <AnimatedButton 
                    className="bg-white text-black font-semibold shadow-lg hover:bg-gray-100"
                  >
                    <Link href="#contact">Contattaci</Link>
                  </AnimatedButton>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="right" delay={0.3}>
              <div className="bg-black/80 backdrop-blur-sm p-8 rounded-xl border border-white/20 shadow-2xl relative">
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl transform rotate-12 shadow-lg">
                  <span>80%</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-6 text-yellow-400 text-shadow-md text-outline-sm">Dettagli del Bando</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-shadow-sm text-outline-sm">Apertura del bando</p>
                      <p className="text-yellow-300 text-shadow-sm">In attesa di pubblicazione</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-shadow-sm text-outline-sm">Fondi disponibili</p>
                      <p className="text-yellow-300 text-shadow-sm">135 milioni di euro</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-shadow-sm text-outline-sm">Percentuale finanziabile</p>
                      <p className="text-yellow-300 text-shadow-sm">Fino all'80% a fondo perduto</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      <FormModal />
    </>
  );
} 