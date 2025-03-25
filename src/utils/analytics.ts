// Dichiarazione del tipo per window.fbq
declare global {
  interface Window {
    fbq: any;
  }
}

// Utility function per tracciare gli eventi di Facebook Pixel
export const trackFacebookEvent = (eventName: string, data?: any) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, data);
  }
}; 