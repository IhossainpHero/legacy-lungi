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

  // ---------------- Preload image ----------------
  useEffect(() => {
    if (typeof window !== "undefined") {
      const img = new window.Image();
      img.src = mainImage;
    }
  }, [mainImage]);

  // ---------------- AddToCart ----------------
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
      }).catch((err) => console.error("Server tracking error:", err));
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // ---------------- Order Now ----------------
  const handleOrderNow = () => {
    handleAddToCart(); // কার্টে যোগ করা

    const eventId = `ordernow-${Date.now()}`;
    const fbp = document.cookie
      .split("; ")
      .find((c) => c.startsWith("_fbp="))
      ?.split("=")[1];

    const fbc = document.cookie
      .split("; ")
      .find((c) => c.startsWith("_fbc="))
      ?.split("=")[1];

    // ---------------- Browser DataLayer ----------------
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

    // ---------------- Server-side tracking ----------------
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
    })
      .then((res) => res.json())
      .then((data) => console.log("OrderNow server tracking:", data))
      .catch((err) => console.error("Server tracking error:", err));

    router.push("/checkout"); // Checkout redirect
  };

  return (
    <div
      className="relative border rounded-2xl bg-white shadow-md hover:shadow-lg overflow-hidden flex flex-col transition-transform hover:scale-105
    w-full max-w-[180px] sm:max-w-[200px] md:max-w-[260px] lg:max-w-[300px] max-w-none mx-auto"
    >
      {/* Image */}
      <div className="p-1 pb-0">
        <Link
          href={`/products/${slug}`}
          className="relative w-full aspect-[3/4] md:aspect-[4/5] lg:aspect-[5/6] rounded-xl overflow-hidden block"
        >
          <NextImage
            src={mainImage}
            alt={name}
            fill
            unoptimized
            className="object-cover w-full h-full rounded-xl"
          />
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

        <p
          className={`mt-1 text-sm ${
            isSoldOut ? "text-red-600 font-bold" : "text-gray-800"
          }`}
        >
          {stock_status}
        </p>

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

        <button
          onClick={handleOrderNow}
          disabled={isSoldOut}
          className="mt-2 py-2 text-sm rounded-xl font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
        >
          {isSoldOut ? "Sold Out" : "অর্ডার করুন"}
        </button>
      </div>
    </div>
  );
}
