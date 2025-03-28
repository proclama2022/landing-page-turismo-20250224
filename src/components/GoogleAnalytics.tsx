'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GA_TRACKING_ID = 'G-GCHXJ7JPEH'; // GA4 Measurement ID

console.log('[GA Debug] GoogleAnalytics component loaded');

// Helper function to track page views
export const pageview = (url: string) => {
  console.log(`[GA Debug] pageview called for URL: ${url}`);
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('[GA Debug] window.gtag exists, sending pageview');
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  } else {
    console.error('[GA Debug] window.gtag NOT FOUND');
  }
};

// Helper function to track events
export const event = ({ action, category, label, value }: { action: string; category?: string; label?: string; value?: number }) => {
  console.log(`[GA Debug] event called: ${action}`);
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('[GA Debug] window.gtag exists, sending event');
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    console.error('[GA Debug] window.gtag NOT FOUND');
  }
};

const GoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    console.log(`[GA Debug] useEffect triggered, tracking pageview for ${url}`);
    pageview(url);
  }, [pathname, searchParams]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
