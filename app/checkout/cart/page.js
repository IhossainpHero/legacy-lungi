"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingLocation,
    setShippingLocation,
  } = useCart();

  const router = useRouter();

  // 🔹 Shipping charge calculation
  const shippingCharge =
    shippingLocation === "inside"
      ? 80
      : shippingLocation === "outside"
      ? 120
      : 0;

  // 🔹 Total calculation
  const total = subtotal + shippingCharge;

  // 🔹 Page view tracking
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "page_view",
        page: { title: "Cart Page", path: "/cart" },
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  const handleCheckout = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];

      // ✅ Client-side InitiateCheckout event
      window.dataLayer.push({
        event: "InitiateCheckout",
        ecommerce: {
          currency: "BDT",
          value: total,
          items: cartItems.map((item) => ({
            item_id: item._id,
            item_name: item.name,
            price: item.sale_price,
            quantity: item.quantity,
            item_url: `/products/${item.slug}`,
            item_image: item.image,
            size: item.selectedSize || "N/A",
          })),
        },
        timestamp: new Date().toISOString(),
      });

      // ✅ Server-side tracking (CAPI)
      const fbp =
        document.cookie
          .split("; ")
          .find((c) => c.startsWith("_fbp="))
          ?.split("=")[1] || null;
      const fbc =
        document.cookie
          .split("; ")
          .find((c) => c.startsWith("_fbc="))
          ?.split("=")[1] || null;
      const external_id = "USER_SESSION_ID_OR_HASH"; // Optional: user_id বা session id

      fetch("/api/track-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: "InitiateCheckout",
          currency: "BDT",
          value: total,
          items: cartItems.map((item) => ({
            item_id: item._id,
            item_name: item.name,
            price: item.sale_price,
            quantity: item.quantity,
            size: item.selectedSize || "N/A",
          })),
          fbp,
          fbc,
          external_id,
          event_id: `initcheckout-${Date.now()}`, // deduplication
        }),
      }).catch((err) => console.error("Server tracking error:", err));
    }

    router.push("/checkout");
  };

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 bg-gray-100">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-[#063238] text-center">
        🛒 আপনার কার্ট
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-700 text-center text-lg">
          আপনার কার্ট বর্তমানে খালি আছে 🛍️
        </p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
          {/* 🧺 Product List Section */}
          <div className="flex-1 flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={item._id + (item.selectedSize || "")}
                className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 relative"
              >
                <button
                  onClick={() => removeFromCart(item._id, item.selectedSize)}
                  className="absolute top-2 right-2 bg-red-100 text-red-600 rounded-full w-7 h-7 flex items-center justify-center font-bold hover:bg-red-200 transition"
                >
                  ✕
                </button>

                <Link href={`/products/${item.slug}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl border border-gray-200 cursor-pointer"
                  />
                </Link>

                <div className="flex-1 flex flex-col gap-1">
                  <h2 className="font-semibold text-gray-900 text-lg leading-tight">
                    {item.name}
                  </h2>
                  {item.selectedSize && (
                    <p className="text-sm text-gray-600">
                      সাইজ:{" "}
                      <span className="font-medium text-black">
                        {item.selectedSize}
                      </span>
                    </p>
                  )}
                  <p className="text-gray-700 text-sm">
                    মূল্য:{" "}
                    <span className="font-medium text-black">
                      ৳{item.sale_price}
                    </span>
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, -1, item.selectedSize)
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-red-500 text-white font-bold text-lg shadow hover:bg-red-600 active:scale-90 transition-all duration-200"
                    >
                      -
                    </button>
                    <span className="text-base font-semibold text-gray-800 w-8 text-center select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, 1, item.selectedSize)
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-green-500 text-white font-bold text-lg shadow hover:bg-green-600 active:scale-90 transition-all duration-200"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 font-medium mt-1">
                    উপ-মোট:{" "}
                    <span className="text-black font-semibold">
                      ৳{item.sale_price * item.quantity}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 💳 Cart Totals Section */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-semibold mb-4 text-[#063238]">
                🧾 Cart Totals
              </h2>

              <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
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

              <table className="w-full text-sm border-collapse">
                <tbody>
                  <tr className="border-b">
                    <th className="text-left py-2 text-gray-700">Subtotal</th>
                    <td className="text-right font-semibold text-gray-900">
                      ৳{subtotal}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="text-left py-2 text-gray-700">Shipping</th>
                    <td className="text-right font-semibold text-gray-900">
                      ৳{shippingCharge}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left py-2 text-gray-700">Total</th>
                    <td className="text-right font-bold text-black text-lg">
                      ৳{total}
                    </td>
                  </tr>
                </tbody>
              </table>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-[#063238] text-white py-3 rounded-xl font-semibold hover:bg-[#074652] shadow-md hover:shadow-lg transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
