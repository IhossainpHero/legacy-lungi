"use client";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalQuantity } =
    useCart();
  const router = useRouter();

  // 🧮 মোট দাম গণনা
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.sale_price || 0) * item.quantity,
    0
  );

  // 🚚 শিপিং: যদি ২টির বেশি আইটেম হয় → ফ্রি
  const shipping = totalQuantity >= 2 ? 0 : 120;

  // 💰 মোট টাকা
  const total = subtotal + shipping;

  // ✅ চেকআউট redirect
  const handleCheckout = () => {
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
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
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

          <div className="bg-white p-6 rounded-2xl shadow-md mt-2">
            <div className="flex justify-between text-gray-800 font-medium">
              <span>উপ-মোট</span>
              <span>৳{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-800 font-medium">
              <span>শিপিং চার্জ</span>
              <span>{shipping === 0 ? "ফ্রি" : `৳${shipping}`}</span>
            </div>
            <div className="flex justify-between text-black font-bold text-lg border-t pt-3">
              <span>মোট</span>
              <span>৳{total}</span>
            </div>

            {/* ✅ Checkout Button */}
            <button
              onClick={handleCheckout}
              className="mt-5 w-full bg-[#063238] text-white py-3 rounded-xl font-semibold hover:bg-[#074652] shadow-md hover:shadow-lg transition"
            >
              চেকআউট করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
