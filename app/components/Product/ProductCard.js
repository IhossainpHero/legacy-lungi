"use client";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  id,
  name,
  sale_price,
  image,
  slug,
  discount,
}) {
  const { addToCart, cartItems } = useCart();

  // Check if product already in cart
  const isInCart = cartItems.some((item) => item.id === id);

  return (
    <div className="relative border rounded-2xl bg-white shadow-md hover:shadow-lg overflow-hidden flex flex-col transition-transform hover:scale-105">
      <Link
        href={`/products/${slug}`}
        className="relative w-full h-48 sm:h-56 md:h-60 lg:h-56 rounded-t-2xl overflow-hidden"
      >
        <Image
          src={image}
          alt={name || "Product image"}
          fill
          className="object-cover cursor-pointer"
        />
        {discount && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="p-3 flex flex-col gap-2">
        <Link href={`/products/${slug}`}>
          <h3 className="font-medium text-gray-800 text-sm sm:text-base line-clamp-1 cursor-pointer hover:text-blue-600">
            {name}
          </h3>
        </Link>
        <p className="text-black font-semibold text-sm sm:text-base">
          ৳{sale_price}
        </p>

        <button
          onClick={() => addToCart({ id, name, sale_price, image, slug })}
          disabled={isInCart}
          className={`text-sm py-2 rounded-xl mt-2 transition ${
            isInCart
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-[#063238] text-white hover:bg-blue-600"
          }`}
        >
          {isInCart ? "Already in Cart" : "কার্টে যোগ করুন"}
        </button>
      </div>
    </div>
  );
}
