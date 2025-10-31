"use client";

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ ঠিকভাবে Import করা হয়েছে
import { useState } from "react";
import { FaMinus, FaPhoneAlt, FaPlus, FaWhatsapp } from "react-icons/fa";

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const router = useRouter(); // ✅ এখানে router define করা হয়েছে

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      sale_price: product.sale_price,
      regular_price: product.regular_price,
      image: product.image,
      slug: product.slug,
      description: product.description,
      discount: product.discount,
      selectedSize: product.sizes?.[0] || undefined,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleOrderNow = () => {
    // ✅ কার্টে যোগ করা
    addToCart({
      _id: product._id,
      name: product.name,
      sale_price: product.sale_price,
      regular_price: product.regular_price,
      image: product.image,
      slug: product.slug,
      description: product.description,
      discount: product.discount,
      selectedSize: product.sizes?.[0] || undefined,
      quantity,
    });

    // ✅ Checkout পেজে রিডাইরেক্ট করা
    router.push("/checkout");
  };

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto bg-white shadow-lg rounded-2xl mt-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4 flex flex-wrap items-center gap-1">
        <a href="/" className="text-blue-600 hover:underline">
          Home
        </a>
        <span>/</span>
        <span>{product.category || "Category"}</span>
        <span>/</span>
        <span className="text-gray-700 text-xs sm:text-sm font-medium">
          {product.name}
        </span>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* 🔹 Full Responsive Product Image */}
        <div className="relative w-full h-[450px] sm:h-[550px] md:h-[600px] rounded-2xl overflow-hidden shadow-md">
          <Image
            src={product.image || "/placeholder.png"}
            alt={product.name}
            fill
            unoptimized
            loading="lazy"
            className="object-cover object-center cursor-pointer transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Info + Contact for large screens */}
        <div className="flex flex-col justify-between gap-6">
          <div>
            <h2 className="text-2xl lg:text-3xl text-gray-700 font-bold">
              {product.name}
            </h2>
            <div className="mt-3">
              {product.regular_price && (
                <span className="line-through text-gray-400 mr-2">
                  ৳ {product.regular_price}
                </span>
              )}
              <span className="text-3xl font-semibold text-green-600">
                ৳ {product.sale_price}
              </span>
            </div>

            {product.sizes?.length > 0 && (
              <p className="text-gray-800 mt-2 text-sm sm:text-base">
                সাইজ: {product.sizes.join(", ")}
              </p>
            )}

            {/* Quantity & Buttons */}
            <div className="flex items-center gap-2 mt-6 w-full flex-nowrap">
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="bg-gray-200 text-gray-800 rounded-full p-1 hover:bg-gray-300 transition text-xs"
                >
                  <FaMinus className="w-3 h-3" />
                </button>
                <span className="text-sm text-gray-900 font-bold min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="bg-gray-200 text-gray-800 rounded-full p-1 hover:bg-gray-300 transition text-xs"
                >
                  <FaPlus className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition shadow-md text-xs whitespace-nowrap
                  ${
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

              <button
                onClick={handleOrderNow}
                className="flex-1 bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition shadow-md text-xs whitespace-nowrap"
              >
                অর্ডার করুন
              </button>
            </div>
          </div>

          {/* ✅ Contact Section for large screens (Right side beside image) */}
          <div className="hidden lg:block">
            <ContactSection />
          </div>
        </div>
      </div>

      {/* ✅ Contact Section for small & medium screens (below image) */}
      <div className="block lg:hidden mt-10">
        <ContactSection />
      </div>

      {/* Specification Table */}
      <SpecificationTable />

      {/* Product Description */}
      <ProductDescription product={product} />
    </div>
  );
}

// -------------------------------------------------------------
// Contact Section
function ContactSection() {
  return (
    <div className="text-center mt-12 space-y-4">
      <p className="text-gray-800 font-semibold">
        আপনার যেকোন প্রয়োজনে আমাদের সাথে যোগাযোগ করুন
      </p>

      <a
        href="tel:+8801916660952"
        className="flex justify-center items-center gap-2 bg-[#0C2340] text-white py-2 rounded-lg font-semibold hover:bg-[#163d66] transition w-full sm:w-2/3 mx-auto"
      >
        <FaPhoneAlt /> +880 1916660952
      </a>

      <p className="text-gray-700">অর্ডার বা তথ্যের জন্য WhatsApp করুন</p>

      <a
        href="https://wa.me/8801916660952"
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center gap-2 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition w-full sm:w-2/3 mx-auto"
      >
        <FaWhatsapp /> +880 1916660952
      </a>
    </div>
  );
}

// -------------------------------------------------------------
// Specification Table
const specifications = [
  { label: "Brand", value: "Legacy Lungi" },
  { label: "Fabric Type", value: "Cotton" },
  { label: "Weave Type", value: "Plain" },
  { label: "Length", value: "50-53 Inch" },
  { label: "Width", value: "95-98 Inch" },
  { label: "Finished Type", value: "Mechanical Processed" },
  { label: "Color", value: "100% guarantee" },
  { label: "Care/Wash Type", value: "Regular Wash" },
  { label: "Additional", value: "Stitched Lungi" },
];

function SpecificationTable() {
  return (
    <div className="bg-white p-4 sm:p-6 mt-10 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Specification</h2>
      <dl className="divide-y divide-gray-200 border-t border-b border-gray-200">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className="flex justify-between py-3 sm:grid sm:grid-cols-3 sm:gap-4"
          >
            <dt className="text-base font-medium text-gray-600 sm:col-span-1 pr-4">
              {spec.label}
            </dt>
            <dd className="text-base text-gray-600 sm:col-span-2">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// -------------------------------------------------------------
// Product Description
function ProductDescription({ product }) {
  return (
    <div className="text-gray-500 mt-10 leading-relaxed space-y-3 border-t border-gray-200 pt-6">
      <p>লুঙ্গির দাম নির্ভর করে সুতা, রং এবং মার্সরাইজড কোয়ালিটির ওপর।</p>
      <p className="font-semibold">Legacy Lungi বৈশিষ্ট্য:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>১০০% সুতি</li>
        <li>১০০% পাকা রং</li>
        <li>চিকন সুতার টেকসই লুঙ্গি</li>
        <li>১০০% ঢাকার মার্সরাইজড</li>
        <li>সফট ও আরামদায়ক</li>
        <li>অ্যাকুরেট সেলাই</li>
        <li>রুচিশীল ও মার্জিত ডিজাইন</li>
      </ul>
      <p>
        <strong>বিঃ দ্রঃ</strong> অনেকেই ডিজাইন কপি করে কিন্তু নিম্নমানের সুতা ও
        রং ব্যবহার করে, তাই মান যাচাই করে নিন।
      </p>
      <p className="font-semibold text-green-700">
        Legacy Lungi – আমাদের লুঙ্গির গুণগত মান যেন শিল্প।
      </p>
    </div>
  );
}
