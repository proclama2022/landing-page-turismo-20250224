'use client';

import React, { useEffect, ReactNode } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';

interface AnimateWhenVisibleProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// Componente per animare gli elementi quando entrano nel viewport
const AnimateWhenVisible: React.FC<AnimateWhenVisibleProps> = ({ children, delay = 0, className = "" }) => {
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

interface CounterBoxProps {
  number: string;
  label: string;
  delay: number;
}

// Componente per i contatori animati
const CounterBox: React.FC<CounterBoxProps> = ({ number, label, delay }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
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
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
          opacity: 1, 
          scale: 1, 
          transition: { 
            duration: 0.5, 
            delay,
            type: "spring",
            stiffness: 100
          } 
        }
      }}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center transform transition-all duration-300"
    >
      <motion.div 
        className="text-black font-bold text-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.3, duration: 0.5 }}
      >
        {number}
      </motion.div>
      <motion.div 
        className="text-gray-600 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.5, duration: 0.5 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  iconBgColor: string;
  delay: number;
}

// Componente per le carte dei servizi
const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, bgColor, textColor, iconBgColor, delay }) => {
  return (
    <AnimateWhenVisible delay={delay}>
      <motion.div 
        className={`p-6 ${bgColor} rounded-lg text-center transform transition-all duration-300`}
        whileHover={{ 
          scale: 1.03, 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
        }}
      >
        <motion.div 
          className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {icon}
        </motion.div>
        <h4 className={`text-lg font-semibold mb-2 ${textColor}`}>{title}</h4>
        <p className={textColor === "text-white" ? "text-gray-300" : "text-gray-600"}>{description}</p>
      </motion.div>
    </AnimateWhenVisible>
  );
};

export default function AboutUs() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex justify-center mb-6 relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute w-[150px] h-[150px] bg-yellow-400 rounded-full opacity-20 blur-xl"></div>
            <motion.div
              animate={{ 
                boxShadow: ["0px 0px 0px rgba(255,215,0,0)", "0px 0px 30px rgba(255,215,0,0.7)", "0px 0px 0px rgba(255,215,0,0)"] 
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="relative z-10"
            >
              <Image 
                src="/images/logo_MAD_white-yellow-300x300-1-150x150.png" 
                alt="MAD - Management Advisor" 
                width={150} 
                height={150}
                className="object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]"
              />
            </motion.div>
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-black mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Management Advisor
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Il partner ideale per accedere ai finanziamenti del Bando Turismo Sicilia 2025
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimateWhenVisible className="order-2 lg:order-1" delay={0.2}>
            <h3 className="text-2xl font-semibold text-black mb-6 border-b-2 border-yellow-400 pb-2 inline-block">Perché sceglierci</h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Management Advisor è specializzata in finanza agevolata e nell'accesso ai fondi regionali, nazionali ed europei. È specializzata nell'assistere le imprese turistiche siciliane nell'accesso ai fondi del Bando Turismo 2025. Siamo problem solver, coach e advisor per le imprese, aiutandole a massimizzare le opportunità di finanziamento.
            </p>
            
            <h3 className="text-2xl font-semibold text-black mb-6 border-b-2 border-yellow-400 pb-2 inline-block">Esperienza nel settore turistico</h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Con una profonda conoscenza del settore turistico siciliano, offriamo consulenza specializzata per strutture ricettive, tour operator e imprese del comparto che desiderano accedere ai finanziamenti del Bando Turismo Sicilia 2025.
            </p>
            
            <h3 className="text-2xl font-semibold text-black mb-6 border-b-2 border-yellow-400 pb-2 inline-block">I nostri servizi</h3>
            <ul className="text-gray-600 mb-8 space-y-4">
              <motion.li 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="bg-yellow-400 p-1 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <strong className="text-black">Valutazione di ammissibilità</strong>: Analizziamo la tua azienda per verificare l'idoneità alla partecipazione al bando.
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="bg-yellow-400 p-1 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <strong className="text-black">Predisposizione documentazione</strong>: Gestiamo tutta la documentazione necessaria per presentare la domanda di finanziamento.
                </div>
              </motion.li>
            </ul>
            
            <div className="grid grid-cols-2 gap-6 mt-12">
              <CounterBox number="100+" label="Progetti finanziati" delay={0.2} />
              <CounterBox number="95%" label="Tasso di successo" delay={0.4} />
              <CounterBox number="10+" label="Anni di esperienza" delay={0.6} />
              <CounterBox number="8M" label="Euro ottenuti per i clienti" delay={0.8} />
            </div>
          </AnimateWhenVisible>
          
          <AnimateWhenVisible className="order-1 lg:order-2" delay={0.4}>
            <motion.div 
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
              <Image 
                src="https://placehold.co/600x400/333333/FFFFFF?text=Team+Management+Advisor" 
                alt="Il team di Management Advisor" 
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-2xl"
              />
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-8 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <h3 className="text-white text-2xl font-bold mb-2">Team Management Advisor</h3>
                <p className="text-gray-200">Professionisti con esperienza decennale nel settore della finanza agevolata</p>
              </motion.div>
            </motion.div>
          </AnimateWhenVisible>
        </div>
        
        <AnimateWhenVisible delay={0.6}>
          <motion.div 
            className="mt-24 bg-white p-10 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden"
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-100 rounded-full -ml-32 -mb-32 opacity-50"></div>
            
            <motion.h3 
              className="text-3xl font-bold text-black mb-10 text-center relative z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              I nostri servizi per il Bando Turismo Sicilia 2025
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <ServiceCard 
                icon={
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                }
                title="Valutazione di ammissibilità"
                description="Analizziamo la tua azienda per verificare l'idoneità ai finanziamenti del bando"
                bgColor="bg-yellow-50"
                textColor="text-black"
                iconBgColor="bg-yellow-400"
                delay={0.2}
              />
              
              <ServiceCard 
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                title="Preparazione documentazione"
                description="Gestiamo tutta la documentazione necessaria per presentare la domanda di finanziamento"
                bgColor="bg-gray-100"
                textColor="text-black"
                iconBgColor="bg-gray-500"
                delay={0.4}
              />
              
              <ServiceCard 
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                }
                title="Monitoraggio e rendicontazione"
                description="Ti seguiamo in tutte le fasi post-approvazione fino all'erogazione dei fondi"
                bgColor="bg-gray-900"
                textColor="text-white"
                iconBgColor="bg-black"
                delay={0.6}
              />
            </div>
          </motion.div>
        </AnimateWhenVisible>
      </div>
    </section>
  );
} 