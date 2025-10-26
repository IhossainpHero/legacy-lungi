"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { FaMinus, FaPhoneAlt, FaPlus, FaWhatsapp } from "react-icons/fa";

// ✅ Product Page
export default function ProductPage({ params }) {
  // 🆕 unwrap the async params
  const resolvedParams = use(params);
  const { sku } = resolvedParams;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );
        const data = await res.json();

        const found = data.find(
          (item) =>
            item.slug?.toLowerCase() === sku.toLowerCase() ||
            item.sku?.replace("SKU:", "").toLowerCase() === sku.toLowerCase()
        );

        if (found) {
          setProduct(found);
        } else {
          console.warn("⚠️ No product found for:", sku);
        }
      } catch (error) {
        console.error("❌ Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [sku]);

  if (loading)
    return <div className="p-10 text-center text-gray-600">লোড হচ্ছে...</div>;

  if (!product) return notFound();

  return <ProductDetails product={product} />;
}

// -------------------------------------------------------------
// ✅ Product Details (single image)
function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    alert(`${quantity} ${product.name} কার্টে যোগ করা হয়েছে!`);
  };

  const handleOrderNow = () => {
    alert(`অর্ডার হয়েছে ${quantity} ${product.name} এর জন্য!`);
  };

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto bg-white shadow-lg rounded-2xl mt-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/" className="text-blue-600 hover:underline">
          Home
        </Link>{" "}
        / <span className="ml-1">{product.category}</span>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* ✅ Left Side (Single Image) */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
        </div>

        {/* ✅ Right Side (Details) */}
        <div>
          <h6 className="text-2xl lg:text-3xl font-bold text-gray-700">
            {product.name}
          </h6>

          <div className="mt-3">
            {product.regular_price && (
              <span className="line-through text-gray-400 text-lg mr-2">
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

          {/* Quantity + Buttons */}
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
              className="flex-1 bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition shadow-md text-xs whitespace-nowrap"
            >
              কার্টে যোগ করুন
            </button>

            <button
              onClick={handleOrderNow}
              className="flex-1 bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition shadow-md text-xs whitespace-nowrap"
            >
              অর্ডার করুন
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Contact Section */}
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

      <SpecificationTable />

      {/* ✅ Description */}
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
          <strong>বিঃ দ্রঃ</strong> অনেকেই ডিজাইন কপি করে কিন্তু নিম্নমানের সুতা
          ও রং ব্যবহার করে, তাই মান যাচাই করে নিন।
        </p>
        <p className="font-semibold text-green-700">
          Legacy Lungi – আমাদের লুঙ্গির গুণগত মান যেন শিল্প।
        </p>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// ✅ Specification Table
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
