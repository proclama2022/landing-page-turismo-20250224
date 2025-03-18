'use client';

import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Eligibility from './components/Eligibility';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import SecondCallToAction from './components/SecondCallToAction';
import AboutUs from './components/AboutUs';
import BandoAreas from './components/Services';
import Testimonials from './components/Testimonials';
import ContactForm from './components/form/ContactForm';

export default function Home() {
    useEffect(() => {
        // Rimuove qualsiasi hash dall'URL e forza lo scroll all'inizio della pagina
        if (typeof window !== 'undefined') {
            // Rimuove l'hash dall'URL senza ricaricare la pagina
            const removeHash = () => {
                const scrollV = document.documentElement.scrollTop;
                const scrollH = document.documentElement.scrollLeft;
                
                window.location.hash = '';
                
                // Mantiene la posizione di scroll
                document.documentElement.scrollTop = 0;
                document.documentElement.scrollLeft = scrollH;
            };
            
            // Esegue lo scroll all'inizio della pagina
            window.scrollTo(0, 0);
            
            // Rimuove l'hash se presente
            if (window.location.hash) {
                removeHash();
            }
        }
    }, []);

  return (
    <main>
      <Hero />
      <AboutUs />
      <BandoAreas />
      <SecondCallToAction />
      <Eligibility />
      <Testimonials />
      <FAQ />
      <CallToAction />
      <section id="contact" className="py-20 bg-gradient-to-br from-black via-blue-900 to-black">
        <div className="container mx-auto px-4">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
