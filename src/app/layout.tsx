import { Inter } from 'next/font/google';
import './globals.css';
import CookieBanner from './components/CookieBanner';
import ChatWindow from '@/components/ChatWindow';
import { ModalProvider } from './ModalContext';
import FacebookPixel from '@/components/FacebookPixel';
import GoogleAnalytics from '@/components/GoogleAnalytics'; // Import Google Analytics component
import { Suspense } from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Bando Turismo Sicilia 2025',
  description: 'Finanziamenti fino all\'80% a fondo perduto per strutture ricettive alberghiere ed extra-alberghiere in Sicilia. Scopri se la tua azienda è idonea al Bando Turismo 2025.',
  keywords: 'bando turismo sicilia, finanziamenti turismo, strutture ricettive sicilia, fondo perduto turismo, bando 2025',
  openGraph: {
    title: 'Bando Turismo Sicilia 2025',
    description: 'Finanziamenti fino all\'80% a fondo perduto per strutture ricettive in Sicilia',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`h-full ${inter.className}`}>
      <head>
      </head>
      <body className="h-full">
        <ModalProvider>
          {children}
          <CookieBanner />
          <ChatWindow />
        </ModalProvider>
        <FacebookPixel />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
