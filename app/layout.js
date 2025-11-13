// app/layout.js
import Script from "next/script";
import ClientOnly from "./components/ClientOnly";
import DataLayerInit from "./components/DataLayerInit";
import Footer from "./components/Footer";
import BottomNavbar from "./components/Header/BottomNavbar";
import DesktopNavbar from "./components/Header/DesktopNavbar";
import MobileHeader from "./components/Header/MobileHeader";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

export const metadata = {
  title: "My Lungi Shop",
  description: "Buy premium handloom lungis online from Enayetpur.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Tag Manager (Web Container) */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T7WBS8PX');
            `,
          }}
        />

        {/* ✅ Meta Pixel Code — Optional (can also move inside GTM later) */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '965503823053143');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=965503823053143&ev=PageView&noscript=1"
            alt="fb pixel"
          />
        </noscript>
      </head>

      <body className="bg-gray-50 text-gray-900">
        {/* ✅ Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T7WBS8PX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <CartProvider>
          {/* Header */}
          <div className="hidden md:block">
            <ClientOnly>
              <DesktopNavbar />
            </ClientOnly>
          </div>
          <div className="md:hidden">
            <ClientOnly>
              <MobileHeader />
            </ClientOnly>
          </div>

          {/* Page content */}
          <main className="min-h-screen pt-16 md:pt-0 md:pb-0 pb-16">
            {children}
          </main>

          {/* Mobile Bottom Navbar */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
            <ClientOnly>
              <BottomNavbar />
            </ClientOnly>
          </div>

          {/* Footer */}
          <Footer />

          {/* Client-side Data Layer (for GTM events) */}
          <ClientOnly>
            <DataLayerInit />
          </ClientOnly>
        </CartProvider>
      </body>
    </html>
  );
}
