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
    <div className="relative border rounded-2xl bg-white shadow-md hover:shadow-lg overflow-hidden flex flex-col transition-transform hover:scale-105">
      <Link
        href={`/products/${slug}`}
        className="relative w-full h-56 sm:h-64 md:h-72 lg:h-64 rounded-t-2xl overflow-hidden flex justify-center items-center bg-gray-100"
      >
        <Image
          src={mainImage}
          alt={name || "Product image"}
          fill
          unoptimized
          loading="lazy"
          className="object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
        />
        {discount && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col gap-2 flex-1 relative">
        <Link href={`/products/${slug}`}>
          <h3 className="font-medium text-gray-800 text-sm sm:text-base line-clamp-1 cursor-pointer hover:text-blue-600">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-1">
          {sale_price && (
            <p className="text-black font-semibold text-sm sm:text-base">
              ৳{sale_price}
            </p>
          )}
          {regular_price && (
            <p className="text-gray-400 line-through text-xs sm:text-sm">
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
