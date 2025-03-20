import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import ChatWindow from '@/components/ChatWindow';

const inter = Inter({ subsets: ['latin'] });
    
export const metadata: Metadata = {
  title: 'Bando Turismo Sicilia 2025',
  description: 'Contributi a fondo perduto per le imprese turistiche siciliane',
  icons: {
    icon: [
      {
        url: '/images/logo_MAD_white-yellow-300x300-1-150x150.png',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className="h-full">
      <head>
      </head>
      <body className={`h-full antialiased ${inter.className}`}>
        <CookieBanner />
        <div className="min-h-screen flex flex-col">
          {children}
          <Footer />
        </div>
        <ChatWindow />
      </body>
    </html>
  );
}
