import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-white py-8 text-center">
      <div className="container mx-auto">
        <div className="mb-4">
          <Image
            src="/images/management-advisor-logo.png"
            alt="Management Advisor Logo"
            width={100}
            height={100}
            className="mx-auto"
          />
        </div>
        <p className="text-sm text-foreground">
          © 2025 Bando Turismo Sicilia. Servizio offerto da <a href="https://management-advisor.eu/" className="text-primary">Management Advisor</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
