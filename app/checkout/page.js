"use client";

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function CheckoutPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingLocation,
    setShippingLocation,
    clearCart,
  } = useCart();

  const router = useRouter();

  // 🔹 Shipping charge based on selected location
  const shippingCharge =
    shippingLocation === "inside"
      ? 80
      : shippingLocation === "outside"
      ? 120
      : 0;

  // 🔹 Total price
  const total = subtotal + shippingCharge;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      items: cartItems.map((p) => ({
        name: p.name,
        price: p.sale_price,
        quantity: p.quantity,
        image: p.image || null,
      })),
      subtotal,
      shippingCharge,
      total,
      shippingLocation,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (result.success) {
        clearCart();
        localStorage.setItem(
          "latestOrder",
          JSON.stringify({
            ...orderData,
            _id: result.orderId,
            createdAt: new Date().toISOString(),
          })
        );
        router.push("/checkout/order-recieved");
      } else {
        alert("অর্ডার সাবমিট করতে সমস্যা হয়েছে।");
      }
    } catch (err) {
      console.error(err);
      alert("Server error, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        কোনো প্রোডাক্ট পাওয়া যায়নি 🛍️
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f7f7] flex flex-col items-center mt-10 p-3">
      <header className="w-full max-w-md mx-auto flex items-center justify-center mb-3">
        <p className="text-lg sm:text-xl font-bold text-gray-800">CHECKOUT</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-md p-4 space-y-4"
      >
        {/* Billing Details */}
        <h2 className="text-sm text-gray-800 font-semibold">BILLING DETAILS</h2>
        <div>
          <label className="block text-xs font-medium text-gray-700">
            আপনার নাম *
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="আপনার নাম লিখুন"
            className="mt-1 w-full border text-gray-900 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-[#063238]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">
            মোবাইল নাম্বার *
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="আপনার মোবাইল নাম্বার"
            inputMode="tel"
            className="mt-1 w-full border rounded-lg p-2 text-sm outline-none text-gray-900 focus:ring-2 focus:ring-[#063238]"
          />
        </div>
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
            placeholder="গ্রাম/বাসা, উপজেলা, জেলা"
            className="mt-1 w-full border rounded-lg p-2 text-sm outline-none text-gray-900 focus:ring-2 focus:ring-[#063238]"
          />
        </div>

        {/* Shipping Location */}
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            শিপিং লোকেশন নির্বাচন করুন:
          </h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="shipping"
                value="inside"
                checked={shippingLocation === "inside"}
                onChange={() => setShippingLocation("inside")}
                className="accent-blue-600 w-4 h-4"
              />
              ঢাকার ভিতরে (৳80)
            </label>
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="shipping"
                value="outside"
                checked={shippingLocation === "outside"}
                onChange={() => setShippingLocation("outside")}
                className="accent-blue-600 w-4 h-4"
              />
              ঢাকার বাহিরে (৳120)
            </label>
          </div>
        </div>

        {/* Order Items */}
        <h2 className="text-sm text-gray-800 font-semibold mt-4">YOUR ORDER</h2>
        {cartItems.map((product) => {
          const productTotal = product.sale_price * product.quantity;
          return (
            <div
              key={product._id + (product.selectedSize ?? "")}
              className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 mb-2 relative"
            >
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
                  মূল্য: ৳ {productTotal.toLocaleString("en-US")}
                </p>
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

        {/* Totals */}
        <div className="mt-3 text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-900">Subtotal</span>
            <span className="font-semibold text-gray-900">
              ৳ {subtotal.toLocaleString("en-US")}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-900">
              Delivery Charge (
              {shippingLocation === "inside" ? "ঢাকা" : "ঢাকার বাইরে"})
            </span>
            <span className="font-semibold text-gray-900">
              ৳ {shippingCharge.toLocaleString("en-US")}
            </span>
          </div>

          <div className="flex justify-between border-t pt-2 font-semibold">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">
              ৳ {total.toLocaleString("en-US")}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#063238] text-white py-2.5 rounded-xl font-medium transition hover:opacity-95 disabled:opacity-50"
        >
          {loading ? "Processing..." : "অর্ডার সাবমিট করুন"}
        </button>
      </form>
    </div>
  );
}
