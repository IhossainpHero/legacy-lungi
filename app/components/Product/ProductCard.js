"use client";
import { useCart } from "@/app/context/CartContext";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const router = useRouter();

  const mainImage = image || "/placeholder.png";
  const isSoldOut = stock_status.toLowerCase() === "sold out";
  const quantity = 1;
  const selectedSize = sizes[0] || "Free Size";

  // ---------------- Preload ----------------
  useEffect(() => {
    if (typeof window !== "undefined") {
      const img = new window.Image();
      img.src = mainImage;
    }
  }, [mainImage]);

  // ---------------- Add to Cart ----------------
  const handleAddToCart = () => {
    if (isSoldOut) return;

    addToCart({
      _id,
      name,
      sale_price,
      regular_price,
      image: mainImage,
      slug,
      description,
      discount,
      selectedSize,
      quantity,
    });

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
              quantity,
              discount: discount || 0,
              item_url: `/products/${slug}`,
              item_image: mainImage,
              size: selectedSize,
            },
          ],
        },
      });

      const fbp = document.cookie
        .split("; ")
        .find((c) => c.startsWith("_fbp="))
        ?.split("=")[1];

      const fbc = document.cookie
        .split("; ")
        .find((c) => c.startsWith("_fbc="))
        ?.split("=")[1];

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
              quantity,
              size: selectedSize,
            },
          ],
          fbp,
          fbc,
          external_id: _id,
        }),
      });
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // ---------------- Order Now ----------------
  const handleOrderNow = () => {
    handleAddToCart();

    const eventId = `ordernow-${Date.now()}`;
    const fbp = document.cookie
      .split("; ")
      .find((c) => c.startsWith("_fbp="))
      ?.split("=")[1];

    const fbc = document.cookie
      .split("; ")
      .find((c) => c.startsWith("_fbc="))
      ?.split("=")[1];

    // DataLayer push
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "order_now_click",
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
              discount: discount || 0,
              item_url: `/products/${slug}`,
              item_image: mainImage,
              size: selectedSize,
              quantity,
            },
          ],
        },
      });
    }

    fetch("/api/track-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "OrderNowClick",
        event_id: eventId,
        currency: "BDT",
        value: sale_price || regular_price,
        items: [
          {
            item_id: _id,
            item_name: name,
            price: sale_price || regular_price,
            quantity,
            size: selectedSize,
          },
        ],
        fbp,
        fbc,
        external_id: _id,
      }),
    });

    router.push("/checkout");
  };

  return (
    <div
      className="
    border rounded-xl hover:shadow-lg transition-all 
    p-2 
    /* ❌ w-[167px] এবং m-2 সরানো হয়েছে */
    /* ✅ w-full ক্লাস নিশ্চিত করবে এটি গ্রিড সেলে সম্পূর্ণ জায়গা নেবে */
    w-full
    flex flex-col bg-white overflow-hidden mx-auto
  "
    >
      {/* Image */}
      <Link
        href={`/products/${slug}`}
        className="relative w-full h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden"
      >
        <NextImage
          src={mainImage}
          alt={name}
          fill
          unoptimized
          className="object-cover"
        />

        {/* Discount Badge */}
        {discount && !isSoldOut && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-md z-10">
            -{discount}%
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 relative">
        <Link href={`/products/${slug}`}>
          <h3 className="font-medium text-gray-700 text-sm line-clamp-1">
            {name}
          </h3>
        </Link>

        {/* Stock Status */}
        <p
          className={`absolute top-2 right-2   text-[10px] font-semibold px-2 py-1 rounded-full z-10 ${
            isSoldOut
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-800"
          }`}
        >
          {stock_status}
        </p>

        <div className="flex items-center gap-2 mt-1">
          {sale_price && (
            <p className="text-black font-semibold text-base">৳{sale_price}</p>
          )}
          {regular_price && (
            <p className="text-gray-400 line-through text-xs">
              ৳{regular_price}
            </p>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={added || isSoldOut}
          className={`
            mt-2 w-full py-1.5 text-sm rounded-lg font-medium 
            ${added ? "bg-gray-400 text-white" : ""}
            ${
              isSoldOut
                ? "bg-gray-300 text-gray-600"
                : "bg-[#063238] text-white hover:bg-[#094c55]"
            }
          `}
        >
          {isSoldOut ? "Sold Out" : added ? "Added!" : "কার্টে যোগ করুন"}
        </button>

        {/* Order Now */}
        <button
          onClick={handleOrderNow}
          disabled={isSoldOut}
          className="
            mt-2 w-full py-1.5 text-sm rounded-lg font-medium 
            bg-green-600 text-white hover:bg-green-700
          "
        >
          {isSoldOut ? "Sold Out" : "অর্ডার করুন"}
        </button>
      </div>
    </div>
  );
}
