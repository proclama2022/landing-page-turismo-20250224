'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import { ApplicationProcess } from './components/ApplicationProcess';
import { BenefitsSection } from './components/BenefitsSection';
import FundingOptionsSection from './components/FundingOptionsSection';
import { RequirementsSection } from './components/RequirementsSection';
import ContactForm from './components/ContactForm';
import { EligibilityCheck } from './components/EligibilityCheck';
import Footer from './components/Footer';
import { FormDialog } from './components/form/FormDialog'; // Import FormDialog

export default function Home() {
  const [isEligibilityCheckOpen, setIsEligibilityCheckOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const handleOpenEligibilityCheck = () => {
    setIsEligibilityCheckOpen(true);
  };

  const handleCloseEligibilityCheck = () => {
    setIsEligibilityCheckOpen(false);
  };

  const handleEligible = () => {
    setIsContactFormOpen(true);
  };

  const handleCloseContactForm = () => {
    setIsContactFormOpen(false);
  };

  return (
    <div className="container mx-auto">
      <Header />
      <HeroSection onOpenForm={handleOpenEligibilityCheck} />
      <BenefitsSection />
      <RequirementsSection />
      <FundingOptionsSection />
      <ApplicationProcess onOpenForm={handleOpenEligibilityCheck} />
      <Footer />

      <EligibilityCheck 
        isOpen={isEligibilityCheckOpen}
        onClose={handleCloseEligibilityCheck}
        onEligible={handleEligible}
      />

      <FormDialog // Replace ContactForm with FormDialog
        isOpen={isContactFormOpen}
        onClose={handleCloseContactForm}
      />
    </div>
  );
}
