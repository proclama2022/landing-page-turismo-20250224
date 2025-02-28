'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './ui/AnimatedSection';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Giovanni Emmi',
    role: 'CEO, Proclama SpA',
    image: '/images/Giovanni Emmi.jpeg',
    quote: 'MAD ci ha supportato brillantemente nella richiesta e gestione del Fondo Nuove Competenze, dimostrando grande professionalità e competenza nel settore.',
  },
  {
    id: 2,
    name: 'Fabio Santoro',
    role: 'CEO, BMC SRL',
    image: '/images/Fabio Santoro BMC.jpeg',
    quote: 'Grazie al supporto di MAD abbiamo ottenuto il credito di imposta ZES Unica Sud. Un team di professionisti che sa come guidare le aziende verso il successo.',
  }
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
              Scopri come abbiamo aiutato altre imprese ad accedere ai fondi e trasformare il loro business.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.id} delay={0.2 * index} direction={index % 2 === 0 ? 'left' : 'right'}>
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col"
                whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center mb-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-700">{testimonial.role}</p>
                  </div>
                </div>
                
                <blockquote className="flex-1">
                  <svg className="w-8 h-8 text-yellow-400 mb-4 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-700 italic text-lg">{testimonial.quote}</p>
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
      </div>
    </section>
  );
} 