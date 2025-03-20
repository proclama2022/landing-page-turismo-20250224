// Type definitions for Google Tag Manager and Google Analytics
interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}

// Define gtag function for global use
declare function gtag(...args: any[]): void;
