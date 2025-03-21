import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import ChatWindow from '@/components/ChatWindow';
import { ModalProvider } from './ModalContext';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});
    
export const metadata: Metadata = {
  title: 'Bando Turismo Sicilia 2025',
  description: 'Informazioni e assistenza per il Bando Turismo Sicilia 2025',
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
    <html lang="it" className={`h-full ${inter.className}`}>
      <head>
        {/* Script per la funzione globale openFormModalGlobal */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.openFormModalGlobal = function() {
                  const event = new CustomEvent('openFormModal');
                  window.dispatchEvent(event);
                  return false;
                }
              }
            `
          }}
        />

        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "qrqews2svr");
            `
          }}
        />

        {/* Google Analytics tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GCHXJ7JPEH"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GCHXJ7JPEH');
            `
          }}
        />
        
        {/* Google Ads tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-744744589"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-744744589');
            `
          }}
        />
      </head>
      <body className="h-full antialiased">
        <CookieBanner />
        <ModalProvider>
          <div className="min-h-screen flex flex-col">
            {children}
            <Footer />
          </div>
          <ChatWindow />
        </ModalProvider>
      </body>
    </html>
  );
}
