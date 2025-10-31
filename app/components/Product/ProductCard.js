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
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const mainImage = image?.startsWith("data:image") ? image : image || null;

  const handleAddToCart = () => {
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

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="
      relative border rounded-2xl bg-white shadow-md hover:shadow-lg overflow-hidden 
      flex flex-col transition-transform hover:scale-105 
      w-[100%] sm:w-[85%] md:w-full max-w-[320px] mx-auto
      "
    >
      {/* 🖼️ Image Section */}
      <div className="p-1 pb-0">
        <Link
          href={`/products/${slug}`}
          className="
          relative w-full 
          h-48 xs:h-52 sm:h-56 md:h-60 
          rounded-xl overflow-hidden block
          "
        >
          <Image
            src={mainImage}
            alt={name || "Product image"}
            fill
            unoptimized
            loading="lazy"
            className="object-cover w-full h-full rounded-xl"
          />

          {discount && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-md">
              -{discount}%
            </span>
          )}
        </Link>
      </div>

      {/* 🛒 Product Details */}
      <div className="p-3 flex flex-col flex-1 relative">
        <Link href={`/products/${slug}`}>
          <h3 className="font-medium text-gray-800 text-sm sm:text-[15px] line-clamp-1 cursor-pointer hover:text-blue-600">
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

        <button
          onClick={handleAddToCart}
          disabled={added}
          className={`mt-3 py-2 text-sm rounded-xl font-medium transition-colors duration-200 ${
            added
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-[#063238] text-white hover:bg-blue-600"
          }`}
        >
          {added ? "Added!" : "কার্টে যোগ করুন"}
        </button>

        {added && (
          <div className="absolute top-0 right-0 mt-1 mr-1 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
            ✅ প্রোডাক্টটি কার্টে যোগ হয়েছে!
          </div>
        )}
      </div>
    </div>
  );
}
