"use client";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.sale_price * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const shipping = totalQuantity > 2 ? 0 : 120;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-black text-center">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-700 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-md relative"
            >
              {/* Red Cross Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="absolute top-2 right-2 text-red-600 font-bold text-xl hover:text-red-700 transition"
              >
                ✕
              </button>

              {/* Product Image */}
              <Link href={`/products/${item.slug}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover cursor-pointer"
                />
              </Link>

              <div className="flex-1 flex flex-col">
                <h2 className="font-semibold text-black">{item.name}</h2>
                <p className="font-bold text-black">৳{item.sale_price}</p>

                {/* Quantity Buttons */}
                <div className="flex items-center gap-3 mt-3">
                  {/* Minus Button */}
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-red-600 transition"
                  >
                    -
                  </button>

                  {/* Quantity Display */}
                  <span className="text-black font-bold text-lg w-8 text-center">
                    {item.quantity}
                  </span>

                  {/* Plus Button */}
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-green-600 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Totals */}
          <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col gap-3 mt-4">
            <div className="flex justify-between text-black font-medium">
              <span>Subtotal:</span>
              <span>৳{subtotal}</span>
            </div>
            <div className="flex justify-between text-black font-medium">
              <span>Shipping:</span>
              <span>{shipping === 0 ? "Free" : `৳${shipping}`}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 text-black">
              <span>Total:</span>
              <span>৳{total}</span>
            </div>
            <button className="bg-[#063238] text-white p-3 rounded-xl mt-3 hover:bg-[#074652] transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
