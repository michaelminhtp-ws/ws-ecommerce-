"use client";

import Script from "next/script";

const FALLBACK_PIXEL_ID = "1615917750205764";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: unknown;
    __hireproMetaInitialized?: boolean;
    __hireproPageViewSent?: boolean;
  }
}

export default function MetaPixel() {
  const PIXEL_ID =
    process.env.NEXT_PUBLIC_META_PIXEL_ID || FALLBACK_PIXEL_ID;

  if (!PIXEL_ID) return null;

  return (
    <Script
      id="meta-pixel-base"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function () {
            if (!window.fbq) {
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
            }

            if (!window.__hireproMetaInitialized) {
              fbq('init', '${PIXEL_ID}');
              window.__hireproMetaInitialized = true;
            }

            if (!window.__hireproPageViewSent) {
              fbq('track', 'PageView');
              window.__hireproPageViewSent = true;
            }
          })();
        `,
      }}
    />
  );
}
