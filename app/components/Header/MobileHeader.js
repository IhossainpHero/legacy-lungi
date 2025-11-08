"use client";

import { useCart } from "@/app/context/CartContext";
import { Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("categories");
  const { totalQuantity } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = [
    { name: "ডিপ কালেকশন", slug: "deep-collection" },
    { name: "স্ট্রাইপ এবং চেক লুঙ্গি", slug: "stripe-check" },
    { name: "ফ্যান্সি লুঙ্গি", slug: "fancy-lungi" },
    { name: "টু পার্ট লুঙ্গি", slug: "two-part" },
    { name: "জ্যাকার্ড লুঙ্গি", slug: "jacquard-lungi" },
    { name: "এক কালার লুঙ্গি", slug: "one-color" },
    { name: "সাদা এবং অন্যান্য", slug: "white-and-others" },
  ];

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#063238] text-white shadow-md z-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-3">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
          <Menu className="w-6 h-6" />
        </button>
        <div className="text-xl font-bold tracking-wide">Legacy Lungi</div>
        <Link
          href="/checkout/cart"
          className="relative flex flex-col items-center text-gray-700"
        >
          <ShoppingCart size={22} />
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalQuantity}
            </span>
          )}
          <span className="mt-1 text-xs">Cart</span>
        </Link>
      </div>

      {/* Search Bar */}
      {/* <div className="px-4 pb-3">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border border-white/30 bg-white/10 text-white placeholder-white/70 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white caret-white"
        />
      </div> */}

      {/* Slide-in Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#063238] shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} w-[80%] sm:w-[60%]`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)} className="text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Field Inside Sidebar */}
        {/* <div className="px-4 mb-2">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-900 placeholder-gray-500"
          />
        </div> */}

        {/* Tabs */}
        <div className="flex border-b border-white/20">
          <button
            onClick={() => setActiveTab("categories")}
            className={`w-1/2 py-3 font-semibold text-sm ${
              activeTab === "categories"
                ? "border-b-2 border-white text-white"
                : "text-gray-300"
            }`}
          >
            CATEGORIES
          </button>
          <button
            onClick={() => setActiveTab("menu")}
            className={`w-1/2 py-3 font-semibold text-sm ${
              activeTab === "menu"
                ? "border-b-2 border-white text-white"
                : "text-gray-300"
            }`}
          >
            MENU
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-2">
          {activeTab === "categories" ? (
            <ul className="flex flex-col text-white text-base">
              <li className="px-6 py-3 hover:bg-white/10 transition">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  হোম পেজ
                </Link>
              </li>
              {categories.map((cat) => (
                <li
                  key={cat.slug}
                  className="px-6 py-3 hover:bg-white/10 transition"
                >
                  <Link
                    href={`/category/${cat.slug}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="flex flex-col text-white text-base">
              <li className="px-6 py-3 hover:bg-white/10 transition">
                <Link href="/shop" onClick={() => setMenuOpen(false)}>
                  Shop
                </Link>
              </li>
              <li className="px-6 py-3 hover:bg-white/10 transition">
                <Link href="/account" onClick={() => setMenuOpen(false)}>
                  My Account
                </Link>
              </li>
              <li className="px-6 py-3 hover:bg-white/10 transition">
                <Link href="/track-order" onClick={() => setMenuOpen(false)}>
                  Track Your Order
                </Link>
              </li>
              <li className="px-6 py-3 hover:bg-white/10 transition">
                <Link href="/faqs" onClick={() => setMenuOpen(false)}>
                  FAQs
                </Link>
              </li>
              <li className="px-6 py-3 hover:bg-white/10 transition">
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  Contact Us
                </Link>
              </li>
              <li className="px-6 py-3 hover:bg-white/10 transition">
                <Link href="/wishlist" onClick={() => setMenuOpen(false)}>
                  ❤️ Wishlist
                </Link>
              </li>
              <li className="px-6 py-3 hover:bg-white/10 transition">
                <Link href="/my-account" onClick={() => setMenuOpen(false)}>
                  👤 My Account
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
