"use client";

import { useCart } from "@/app/context/CartContext";
import { Home, Menu, Phone, ShoppingBag, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BottomNavbar() {
  const { totalQuantity } = useCart(); // ✅ totalQuantity from context
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  // Back button closes modal
  useEffect(() => {
    if (!mounted) return;
    const handlePopState = () => isModalOpen && setIsModalOpen(false);
    if (isModalOpen) {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);
    }
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isModalOpen, mounted]);

  if (!mounted) return null;

  const categories = [
    { name: "ডিপ কালেকশন", slug: "deep-collection" },
    { name: "স্ট্রাইপ এবং চেক লুঙ্গি", slug: "stripe-check" },
    { name: "ফ্যান্সি লুঙ্গি", slug: "fancy-lungi" },
    { name: "টু পার্ট লুঙ্গি", slug: "two-part" },
    { name: "জ্যাকার্ড লুঙ্গি", slug: "jacquard-lungi" },
    { name: "এক কালার লুঙ্গি", slug: "one-color" },
    { name: "সাদা এবং অন্যান্য", slug: "white-and-others" },
    { name: "বাটিক লুঙ্গি", slug: "batik-lungi" },
    { name: "হ্যান্ডলুম লুঙ্গি", slug: "handloom-lungi" },
  ];

  // ✅ Cart click handler for Data Layer
  const handleCartClick = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "cart_icon_click",
        total_items: totalQuantity,
        timestamp: new Date().toISOString(),
      });
    }
    router.push("/checkout/cart");
  };

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-white border-t shadow-md flex justify-around py-2 z-50">
        <Link href="/" className="flex flex-col items-center text-gray-700">
          <Home size={22} />
          <span className="mt-1 text-xs">Home</span>
        </Link>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex flex-col items-center text-gray-700"
        >
          <Menu size={22} />
          <span className="mt-1 text-xs">Categories</span>
        </button>

        <Link
          href="/shop"
          prefetch={true}
          className="flex flex-col items-center text-gray-700"
        >
          <ShoppingBag size={22} />
          <span className="mt-1 text-xs">Shop</span>
        </Link>

        {/* Cart with Data Layer */}
        <div
          onClick={handleCartClick}
          className="relative flex flex-col items-center text-gray-700 cursor-pointer"
        >
          <ShoppingCart size={22} />
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalQuantity}
            </span>
          )}
          <span className="mt-1 text-xs">Cart</span>
        </div>

        <a
          href="https://wa.me/8801742801735"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-gray-700"
        >
          <Phone size={22} />
          <span className="mt-1 text-xs">Call</span>
        </a>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md relative animate-fade-scale"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 font-bold text-xl hover:text-black transition"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-black text-center border-b pb-2">
              Categories
            </h2>
            <ul className="flex flex-col gap-3 mt-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    prefetch={true}
                    onClick={() => setIsModalOpen(false)}
                    className="block p-3 rounded-xl text-black font-medium hover:bg-gray-100 transition shadow-sm hover:shadow-md"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fade-scale {
          animation: fadeScale 0.25s ease-out forwards;
        }
        @keyframes fadeScale {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
