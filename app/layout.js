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

export const metadata = {
  title: "My Lungi Shop",
  description: "Buy premium handloom lungis online from Enayetpur.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* ✅ All tracking scripts safely executed in client */}
        <TrackingScripts />

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

          {/* GTM custom event initializer */}
          <ClientOnly>
            <DataLayerInit />
          </ClientOnly>
        </CartProvider>
      </body>
    </html>
  );
}
