"use client";
import { useCart } from "@/app/context/CartContext";
import { useEffect } from "react";

export default function OrderReceived() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Delay দিলে safer হবে, checkout redirect শেষ হলে cart clear হবে
    const timer = setTimeout(() => clearCart(), 100);
    return () => clearTimeout(timer);
  }, [clearCart]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f3f7f7] p-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        ✅ Thank you! Your order has been received.
      </h1>
      <p className="text-gray-700">
        আপনার অর্ডার সফলভাবে সাবমিট হয়েছে। শীঘ্রই ডেলিভারি করা হবে।
      </p>
    </main>
  );
}
