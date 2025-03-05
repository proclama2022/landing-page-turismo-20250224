import React, { useState } from 'react';
import FormModal from './form/FormModal';
import AnimatedSection from './ui/AnimatedSection';
import AnimatedButton from './ui/AnimatedButton';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="relative bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/95 mix-blend-multiply" />
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080&q=80"
            alt="Turismo in Sicilia"
            fill
            className="object-cover opacity-30"
            priority
            unoptimized
          />
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <AnimatedSection direction="left">
            <div className="mb-8">
              <Image 
                src="/images/logo_MAD_white-yellow-300x300-1-150x150.png" 
                alt="MAD - Management Advisor" 
                width={100} 
                height={100}
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-hero-title">
              Bando Turismo Sicilia 2025
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl text-hero-subtitle">
              Finanziamenti fino all'<span className="text-yellow-400 text-glow-yellow font-bold">80%</span> a fondo perduto per strutture ricettive alberghiere ed extra-alberghiere in Sicilia. Fondo da 135 milioni di euro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <AnimatedButton 
                onClick={openModal}
                className="bg-yellow-400 text-black font-bold shadow-lg hover:bg-yellow-500 text-lg"
              >
                Verifica la tua idoneità
              </AnimatedButton>
              <AnimatedButton 
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold text-lg"
                onClick={() => {
                  const bandoAreasSection = document.getElementById('bando-areas');
                  if (bandoAreasSection) {
                    bandoAreasSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Scopri le aree finanziabili
              </AnimatedButton>
            </div>
          </AnimatedSection>
          
          <AnimatedSection direction="right" delay={0.4}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500 rounded-full opacity-60 animate-pulse"></div>
              <div className="relative bg-black/80 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-4 text-shadow-md">Caratteristiche del Bando</h3>
                <ul className="space-y-3 text-white">
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-yellow-400 font-bold">✓</span> <span className="text-shadow-sm">Contributi a fondo perduto fino all'80% (De minimis)</span>
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-yellow-400 font-bold">✓</span> <span className="text-shadow-sm">Finanziamenti da 50.000€ a 3.500.000€</span>
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-yellow-400 font-bold">✓</span> <span className="text-shadow-sm">Investimenti in sostenibilità ambientale</span>
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-yellow-400 font-bold">✓</span> <span className="text-shadow-sm">Premialità per immobili degradati e di interesse storico architettonico</span>
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-yellow-400 font-bold">✓</span> <span className="text-shadow-sm">Premialità per investimenti in aree rurali, a bassa marginalità e isole minori</span>
                  </motion.li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <FormModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
} 