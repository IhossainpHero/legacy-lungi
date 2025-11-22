// app/layout.js
import "./globals.css";

import ClientOnly from "./components/ClientOnly";
import DataLayerInit from "./components/DataLayerInit";
import Footer from "./components/Footer";
import BottomNavbar from "./components/Header/BottomNavbar";
import DesktopNavbar from "./components/Header/DesktopNavbar";
import MobileHeader from "./components/Header/MobileHeader";
import { CartProvider } from "./context/CartContext";

import TrackingScripts from "./TrackingScripts";
import BrowserTracking from "./components/BrowserTracking";
import FloatingChat from "./components/FloatingChat";

export const metadata = {
  title: "legacy-lungi",
  description: "Buy premium handloom lungis online from Enayetpur.",
  icons: {
    // ✅ সঠিক পাথ: /public/images/ থেকে শুরু না করে /images/ থেকে শুরু হবে
    icon: "/images/logoico.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <ClientOnly>
          <TrackingScripts />
          <BrowserTracking />
          <FloatingChat />
        </ClientOnly>

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

          {/* Main content */}
          <main className="min-h-screen pt-16 md:pt-0 pb-16 md:pb-0">
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

          <ClientOnly>
            <DataLayerInit />
          </ClientOnly>
        </CartProvider>
      </body>
    </html>
  );
}
