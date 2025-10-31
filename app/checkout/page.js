"use client";

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function CheckoutPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ অর্ডার সফলভাবে সাবমিট হয়েছে!");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        কোনো প্রোডাক্ট পাওয়া যায়নি 🛍️
      </div>
    );
  }

  // Subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.sale_price || 0) * (item.quantity || 0),
    0
  );

  // Total quantity
  const totalQuantity = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );

  // Shipping: total quantity >= 2 হলে free
  const shipping = totalQuantity >= 2 ? 0 : 120;

  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#f3f7f7] flex flex-col items-center mt-10 p-3">
      {/* Header */}
      <header className="w-full max-w-md mx-auto flex items-center justify-center mb-3">
        <p className="text-lg sm:text-xl font-bold text-gray-800">CHECKOUT</p>
      </header>

      {/* Checkout Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-md p-4 space-y-4"
      >
        <h2 className="text-sm text-gray-800 font-semibold">BILLING DETAILS</h2>

        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            আপনার নাম *
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 w-full border text-gray-900 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-[#063238]"
            placeholder="আপনার নাম লিখুন"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            মোবাইল নাম্বার *
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded-lg p-2 text-sm outline-none text-gray-900 focus:ring-2 focus:ring-[#063238]"
            placeholder="আপনার মোবাইল নাম্বার"
            inputMode="tel"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            আপনার সম্পূর্ণ ঠিকানা *
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            rows={3}
            className="mt-1 w-full border rounded-lg p-2 text-sm outline-none text-gray-900 focus:ring-2 focus:ring-[#063238]"
            placeholder="গ্রাম/বাসা, উপজেলা, জেলা"
          />
        </div>

        {/* Order Summary */}
        <div className="border-t pt-3">
          <h3 className="text-sm text-gray-900 font-semibold mb-2">
            YOUR ORDER
          </h3>

          {cartItems.map((product) => {
            const productTotal = product.sale_price * product.quantity;

            return (
              <div
                key={product._id + (product.selectedSize ?? "")}
                className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 mb-2 relative"
              >
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() =>
                    removeFromCart(product._id, product.selectedSize)
                  }
                  className="absolute top-2 right-2 text-red-500 hover:text-red-600 transition"
                >
                  <FaTimes />
                </button>

                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white">
                  <Image
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-semibold">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    Price: ৳ {productTotal.toLocaleString("en-US")}
                  </p>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-2 mt-2 w-max border rounded-full bg-gray-100 px-2 py-1">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(product._id, -1, product.selectedSize)
                      }
                      className="w-6 h-6 flex items-center justify-center bg-white text-gray-800 rounded-full shadow hover:bg-gray-200 transition-all duration-200"
                    >
                      -
                    </button>
                    <span className="px-3 text-gray-700 font-medium">
                      {product.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(product._id, 1, product.selectedSize)
                      }
                      className="w-6 h-6 flex items-center justify-center bg-white text-gray-800 rounded-full shadow hover:bg-gray-200 transition-all duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Subtotal / Shipping / Total */}
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-gray-900">Subtotal</span>
            <span className="font-semibold text-gray-900">
              ৳ {subtotal.toLocaleString("en-US")}
            </span>
          </div>
          <div className="mt-1 flex justify-between text-sm">
            <span className="text-gray-900">Shipping</span>
            <span className="font-semibold text-gray-900">
              Bangladesh ৳ {shipping.toLocaleString("en-US")}
            </span>
          </div>
          <div className="mt-2 flex justify-between text-sm border-t pt-2">
            <span className="text-gray-900 font-semibold">Total</span>
            <span className="font-semibold text-gray-900">
              ৳ {total.toLocaleString("en-US")}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#063238] text-white py-2.5 rounded-xl font-medium transition hover:opacity-95"
        >
          অর্ডার সাবমিট করুন
        </button>
      </form>
    </div>
  );
}
