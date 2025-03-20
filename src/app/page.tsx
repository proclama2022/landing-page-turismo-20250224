'use client';

import React from 'react';
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
