import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bando Turismo Sicilia 2024',
  description: 'Contributi a fondo perduto per le imprese turistiche siciliane',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
