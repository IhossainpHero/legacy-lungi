"use client";
import { useCart } from "@/app/context/CartContext";
import { Phone, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNavbar() {
  const { totalQuantity } = useCart();
  const pathname = usePathname();

  return (
    <header className="bg-[#063238] hidden md:flex justify-between items-center text-white shadow-md px-10 py-5 sticky top-0 z-50">
      {/* Left Section: Logo */}
      <div className="flex items-center space-x-3">
        {/* <Image
            src="/images/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          /> */}

        <h1 className="text-2xl lg:text-3xl font-bold uppercase tracking-wide">
          <Link href="/" className="hover:text-sky-400 transition">
            Legacy <span className="text-sky-400">Lungi</span>
          </Link>
        </h1>
      </div>

      {/* Middle Navigation */}
      <nav className="flex space-x-6 font-semibold text-sm">
        <Link
          href="/"
          className={`px-4 py-2 rounded-md transition-all duration-300 ${
            pathname === "/"
              ? "bg-[#0d5967] text-white"
              : "hover:bg-[#0a4a55] text-gray-200"
          }`}
        >
          HOME
        </Link>
        <Link
          href="/shop"
          className={`px-4 py-2 rounded-md transition-all duration-300 ${
            pathname === "/all-products"
              ? "bg-[#0d5967] text-white"
              : "hover:bg-[#0a4a55] text-gray-200"
          }`}
        >
          SHOP
        </Link>
        <Link
          href="/contact"
          className={`px-4 py-2 rounded-md transition-all duration-300 ${
            pathname === "/contact"
              ? "bg-[#0d5967] text-white"
              : "hover:bg-[#0a4a55] text-gray-200"
          }`}
        >
          CONTACT
        </Link>
      </nav>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Call Info */}
        <a
          href="tel:01742801735"
          className="flex items-center space-x-2 hover:opacity-80"
        >
          <Phone size={20} className="text-sky-400" />
          <div className="text-sm leading-tight">
            <p className="text-xs text-gray-300">Call us now</p>
            <p className="font-semibold text-white">01534648375</p>
          </div>
        </a>

        {/* My Account */}
        {/* <Link
          href="/account"
          className="flex items-center space-x-1 hover:text-sky-400 text-sm"
        >
          <User size={20} />
          <span>My Account</span>
        </Link> */}

        {/* Cart */}
        <Link
          href="/checkout/cart"
          className="relative hover:text-sky-400 transition-colors"
        >
          <ShoppingCart size={24} />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
