"use client";

import { Menu, Settings, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // now we are on client
  }, []);

  const categories = [
    { name: "ডিপ কালেকশন", slug: "deep-collection" },
    { name: "স্ট্রাইপ এবং চেক লুঙ্গি", slug: "stripe-check" },
    { name: "ফ্যান্সি লুঙ্গি", slug: "fancy" },
    { name: "টু পার্ট লুঙ্গি", slug: "two-part" },

    { name: "প্রিমিয়াম পিটলোম লুঙ্গি", slug: "premium" },
  ];

  if (!mounted) return null; // prevent SSR mismatch

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#063238] text-white shadow-md z-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-3">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
          <Menu className="w-6 h-6" />
        </button>
        <div className="text-xl font-bold tracking-wide">Legacy Lungi</div>
        <Link href="/admin" className="text-white">
          <Settings className="w-6 h-6" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-3">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border border-white/30 bg-white/10 text-white placeholder-white/70 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      {/* Slide-in Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#074652] shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} w-[70%]`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)} className="text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <ul className="flex flex-col text-white text-base mt-4">
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
          <li className="px-6 py-3 hover:bg-white/10 transition">
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
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
