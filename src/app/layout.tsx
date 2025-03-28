import { Inter } from 'next/font/google';
import './globals.css';
import CookieBanner from './components/CookieBanner';
import ChatWindow from '@/components/ChatWindow';
import { ModalProvider } from './ModalContext';
import FacebookPixel from '@/components/FacebookPixel';
import GoogleAnalytics from '@/components/GoogleAnalytics'; // Import Google Analytics component

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Bando Turismo 2024',
  description: 'Scopri se la tua azienda è idonea al Bando Turismo 2024',
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
        <GoogleAnalytics /> {/* Add Google Analytics component */}
      </body>
    </html>
  );
}
