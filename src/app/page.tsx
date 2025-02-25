'use client';

import React from 'react';
import Hero from './components/Hero';
import Dettagli from './components/Dettagli';
import Features from './components/Features';
import Eligibility from './components/Eligibility';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import AboutUs from './components/AboutUs';
import BandoAreas from './components/Services';
import Testimonials from './components/Testimonials';

export default function Home() {
  return (
    <main>
      <Hero />
      <Dettagli />
      <AboutUs />
      <BandoAreas />
      <Features />
      <Eligibility />
      <Testimonials />
      <FAQ />
      <CallToAction />
    </main>
  );
}
