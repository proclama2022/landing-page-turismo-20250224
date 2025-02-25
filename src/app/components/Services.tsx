'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';

interface InterventionArea {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  icon: React.ReactNode;
  borderClass?: string;
  image?: string;
}

const interventionAreas: InterventionArea[] = [
  {
    title: 'NUOVE STRUTTURE',
    description: 'Supporto per la realizzazione di nuove imprese e strutture ricettive innovative nel settore dell\'ospitalità siciliana, in linea con le tendenze del mercato.',
    bgColor: 'bg-yellow-400', // Giallo
    textColor: 'text-black',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'DIGITALIZZAZIONE',
    description: 'Finanziamenti per l\'implementazione di soluzioni digitali e innovazione tecnologica nelle strutture turistiche siciliane, per migliorare la competitività.',
    bgColor: 'bg-gray-800', // Grigio scuro
    textColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'ATTIVITÀ TURISTICHE',
    description: 'Tour operator, agenzie di viaggio, servizi di noleggio, aziende di trasporto turistico e altre imprese del settore turistico siciliano. Alberghi e strutture ricettive, ostelli, rifugi e campeggi.',
    bgColor: 'bg-white', // Bianco
    textColor: 'text-black',
    borderClass: 'border border-gray-200',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: 'SOSTENIBILITÀ AMBIENTALE',
    description: 'Progetti che migliorano l\'efficienza energetica e riducono l\'impatto ambientale delle strutture turistiche siciliane, contribuendo alla transizione ecologica.',
    bgColor: 'bg-black', // Nero
    textColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
];

// Componente per animare gli elementi quando entrano nel viewport
const AnimateWhenVisible = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function BandoAreas() {
  return (
    <section id="bando-areas" className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Aree di intervento finanziabili
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 bg-yellow-400 mx-auto mb-6"
          />
          
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Bando Turismo Sicilia 2025
          </motion.p>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-4xl mx-auto mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Scopri le opportunità di finanziamento per la tua impresa turistica in Sicilia: ampliamento, ammodernamento e ristrutturazione, realizzazione di nuove strutture e recupero di immobili esistenti, digitalizzazione e destagionalizzazione dell'offerta.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interventionAreas.map((area, index) => (
            <AnimateWhenVisible key={index} delay={0.2 * index}>
              <motion.div 
                className={`${area.bgColor} ${area.textColor} ${area.borderClass || ''} rounded-xl overflow-hidden shadow-xl`}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-48 overflow-hidden">
                  {area.image && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 1.5 }}
                      className="h-full w-full"
                    >
                      <Image 
                        src={area.image} 
                        alt={area.title} 
                        fill
                        className="object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-${area.bgColor.replace('bg-', '')} to-transparent opacity-90`}></div>
                    </motion.div>
                  )}
                  <div className="absolute bottom-0 left-0 p-4 z-10">
                    <motion.div 
                      className="bg-yellow-400 rounded-full p-3 inline-block text-black"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8, type: "spring" }}
                    >
                      {area.icon}
                    </motion.div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">{area.title}</h3>
                  <p className={`text-lg ${area.textColor === 'text-white' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {area.description}
                  </p>
                  
                  <motion.button
                    className={`mt-6 px-4 py-2 rounded-lg ${area.textColor === 'text-white' ? 'bg-white text-black' : 'bg-yellow-400 text-black'} font-semibold inline-flex items-center`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Scopri di più
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            </AnimateWhenVisible>
          ))}
        </div>
        
        <AnimateWhenVisible delay={0.8} className="mt-16 text-center">
          <motion.a
            href="#eligibility"
            className="inline-flex items-center px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            Verifica la tua idoneità
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </AnimateWhenVisible>
      </div>
    </section>
  );
} 