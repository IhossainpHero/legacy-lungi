"use client";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductCard({
  _id,
  name,
  sale_price,
  regular_price,
  image,
  slug,
  discount,
  description,
  sizes = [],
  stock_status = "In Stock",
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const mainImage = image || "/placeholder.png";
  const isSoldOut = stock_status.toLowerCase() === "sold out";

  const handleAddToCart = () => {
    if (isSoldOut) return;

    // 1️⃣ Add to Cart (Local Cart)
    addToCart({
      _id,
      name,
      sale_price,
      regular_price,
      image: mainImage,
      slug,
      description,
      discount,
      selectedSize: sizes[0] || undefined,
    });

    // 2️⃣ Push Add to Cart event → DataLayer (Pixel + GTM)
    if (typeof window !== "undefined") {
      const eventId = `addtocart-${Date.now()}`;
      window.dataLayer = window.dataLayer || [];

      window.dataLayer.push({
        event: "add_to_cart",
        event_id: eventId,
        timestamp: new Date().toISOString(),
        ecommerce: {
          currency: "BDT",
          value: sale_price || regular_price,
          items: [
            {
              item_id: _id,
              item_name: name,
              price: sale_price || regular_price,
              quantity: 1,
              discount: discount || 0,
              item_url: `/products/${slug}`,
              item_image: image,
              size: sizes[0] || "Free Size",
            },
          ],
        },
      });

      // 3️⃣ Send to server-side (CAPI)
      fetch("/api/track-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: "AddToCart",
          event_id: eventId,
          currency: "BDT",
          value: sale_price || regular_price,
          items: [
            {
              item_id: _id,
              item_name: name,
              price: sale_price || regular_price,
              quantity: 1,
            },
          ],
        }),
      });
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="relative border rounded-2xl bg-white shadow-md hover:shadow-lg overflow-hidden flex flex-col transition-transform hover:scale-105 w-[100%] sm:w-[85%] md:w-full max-w-[320px] mx-auto">
      {/* Image */}
      <div className="p-1 pb-0">
        <Link
          href={`/products/${slug}`}
          className="relative w-full h-48 rounded-xl overflow-hidden block"
        >
          <Image
            src={mainImage}
            alt={name}
            fill
            unoptimized
            className="object-cover w-full h-full rounded-xl"
          />

          {/* Discount Badge */}
          {discount && !isSoldOut && (
            <span className="absolute top-2 left-2 bg-green-700 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
              -{discount}%
            </span>
          )}
        </Link>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 relative">
        <Link href={`/products/${slug}`}>
          <h3 className="font-medium text-gray-800 text-sm sm:text-[15px] line-clamp-1 hover:text-blue-600">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-1">
          {sale_price && (
            <p className="text-black font-semibold text-base">৳{sale_price}</p>
          )}
          {regular_price && (
            <p className="text-gray-400 line-through text-sm">
              ৳{regular_price}
            </p>
          )}
        </div>

        {/* Stock Status */}
        <p
          className={`mt-1 text-sm ${
            isSoldOut ? "text-red-600 font-bold" : "text-gray-800"
          }`}
        >
          {stock_status}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={added || isSoldOut}
          className={`mt-3 py-2 text-sm rounded-xl font-medium transition-colors duration-200 ${
            added
              ? "bg-gray-400 text-white cursor-not-allowed"
              : isSoldOut
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-[#063238] text-white hover:bg-blue-600"
          }`}
        >
          {isSoldOut ? "Sold Out" : added ? "Added!" : "কার্টে যোগ করুন"}
        </button>
      </div>
    </div>
  );
}
