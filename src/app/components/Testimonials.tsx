'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './ui/AnimatedSection';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Marco Rossi',
    role: 'Proprietario, Hotel Belvedere',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: 'Grazie al supporto di Management Advisor, abbiamo ottenuto un finanziamento di 350.000€ per rinnovare completamente la nostra struttura. Il processo è stato semplice e veloce.',
  },
  {
    id: 2,
    name: 'Giulia Bianchi',
    role: 'CEO, Sicilia Experience Tours',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'Pensavo che accedere ai fondi del bando fosse complicato, ma con la consulenza giusta è stato sorprendentemente semplice. Ora la nostra azienda è completamente digitalizzata.',
  },
  {
    id: 3,
    name: 'Antonio Ferrara',
    role: 'Direttore, Agriturismo Le Vigne',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    quote: "Il supporto ricevuto è stato fondamentale. Abbiamo ottenuto il massimo del finanziamento possibile e trasformato la nostra struttura in un'eccellenza del turismo sostenibile.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Storie di Successo
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Scopri come abbiamo aiutato altre imprese turistiche siciliane ad accedere ai fondi e trasformare il loro business.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.id} delay={0.2 * index} direction={index % 2 === 0 ? 'left' : 'right'}>
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col"
                whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-700">{testimonial.role}</p>
                  </div>
                </div>
                
                <blockquote className="flex-1">
                  <svg className="w-8 h-8 text-yellow-400 mb-4 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-700 italic">{testimonial.quote}</p>
                </blockquote>
                
                <div className="mt-6 flex justify-end">
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + (0.2 * index) }}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
        
        <AnimatedSection delay={0.6}>
          <div className="mt-16 text-center bg-gradient-to-r from-blue-900 to-gray-900 py-10 px-6 rounded-xl shadow-xl">
            <p className="text-xl font-semibold mb-6 text-white text-shadow-md">
              Anche la tua azienda può ottenere questi risultati!
            </p>
            <motion.button
              className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contattaci Ora
            </motion.button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
} 