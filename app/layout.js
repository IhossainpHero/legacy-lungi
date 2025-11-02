import ClientOnly from "@/app/components/ClientOnly"; // wrap client components
import Footer from "@/app/components/Footer";
import BottomNavbar from "@/app/components/Header/BottomNavbar";
import DesktopNavbar from "@/app/components/Header/DesktopNavbar";
import MobileHeader from "@/app/components/Header/MobileHeader";

import { CartProvider } from "./context/CartContext";
import "./globals.css";

export const metadata = {
  title: "My Lungi Shop",
  description: "Buy premium handloom lungis online from Enayetpur.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
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
        </CartProvider>
      </body>
    </html>
  );
}
