'use client';

import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Eligibility from './components/Eligibility';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import AboutUs from './components/AboutUs';
import BandoAreas from './components/Services';
import Testimonials from './components/Testimonials';

export default function Home() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <main>
      <Hero />
      <AboutUs />
      <BandoAreas />
      <Eligibility />
      <Testimonials />
      <FAQ />
      <CallToAction />
    </main>
  );
}
