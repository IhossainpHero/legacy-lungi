// app/shop/ShopPageClient.jsx
"use client";

import DropdownFilter from "@/app/components/DropdownFilter";
import ProductCard from "@/app/components/Product/ProductCard";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- Cookie Helper ---
function getCookie(name) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// --- Generate _fbc from fbclid ---
function generateFbc() {
  if (typeof window === "undefined") return null;

  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get("fbclid");

  if (!fbclid) return null;

  return `fb.1.${Date.now()}.${fbclid}`;
}

// --- Filters ---
const CATEGORIES = [
  { label: "সকল ক্যাটাগরি", value: "all" },
  { label: "ডিপ কালেকশন", value: "deep-collection" },
  { label: "স্ট্রাইপ এবং চেক লুঙ্গি", value: "stripe-check" },
  { label: "ফ্যান্সি লুঙ্গি", value: "fancy-lungi" },
  { label: "টু পার্ট লুঙ্গি", value: "two-part" },
  { label: "জ্যাকার্ড লুঙ্গি", value: "jacquard-lungi" },
  { label: "এক কালার লুঙ্গি", value: "one-color" },
  { label: "সাদা এবং অন্যান্য", value: "white-and-others" },
  { label: "বাটিক লুঙ্গি", value: "batik-lungi" },
  { label: "হ্যান্ডলুম লুঙ্গি", value: "handloom-lungi" },
];

const PRICE_RANGES = [
  { label: "সকল মূল্য", min: 0, max: 99999 },
  { label: "৳0 - ৳500", min: 0, max: 500 },
  { label: "৳501 - ৳1000", min: 501, max: 1000 },
  { label: "৳1001 - ৳1500", min: 1001, max: 1500 },
  { label: "৳1501+", min: 1501, max: 99999 },
];

export default function ShopPageClient({ products }) {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [activePriceRange, setActivePriceRange] = useState(PRICE_RANGES[0]);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Track Shop Page View
  useEffect(() => {
    if (typeof window !== "undefined") {
      // ---- Read Cookies ----
      const fbp = getCookie("_fbp") || null;
      let fbc = getCookie("_fbc") || null;

      // If no cookie exists but fbclid exists → generate new fbc
      if (!fbc) {
        const generated = generateFbc();
        if (generated) fbc = generated;
      }

      // ---- Push to DataLayer ----
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "shop_page_view",
        page_title: "Shop Page",
        timestamp: new Date().toISOString(),
      });

      // ---- Send to Facebook CAPI ----
      fetch("/api/track-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: "PageView",
          event_id: `shop-${Date.now()}`,
          custom_data: {
            page_title: "Shop Page",
            page_path: "/shop",
          },
          user_data: {
            client_user_agent: navigator.userAgent || null,
            fbp: fbp,
            fbc: fbc,
            external_id: null, // যদি user logged-in থাকে → hashed ID পাঠাতে হবে
          },
        }),
      });
    }
  }, []);

  // ✅ Track Category Filter Change
  useEffect(() => {
    if (typeof window !== "undefined" && activeCategory.value !== "all") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "filter_change_category",
        filter_value: activeCategory.label,
        timestamp: new Date().toISOString(),
      });
    }
  }, [activeCategory]);

  // ✅ Track Price Range Filter Change
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      activePriceRange.label !== "সকল মূল্য"
    ) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "filter_change_price",
        filter_value: activePriceRange.label,
        timestamp: new Date().toISOString(),
      });
    }
  }, [activePriceRange]);

  // ✅ Track Search Query Change (Debounced)
  useEffect(() => {
    if (typeof window !== "undefined" && searchQuery.trim() !== "") {
      const timeout = setTimeout(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "search_query",
          search_term: searchQuery,
          timestamp: new Date().toISOString(),
        });
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [searchQuery]);

  // ✅ Filter Logic
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      activeCategory.value === "all" ||
      product.category?.toLowerCase() === activeCategory.value.toLowerCase();

    const priceMatch =
      product.sale_price >= activePriceRange.min &&
      product.sale_price <= activePriceRange.max;

    const searchMatch = product.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    return categoryMatch && priceMatch && searchMatch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Search Header */}
      <header className="sticky top-[80px] z-40 bg-white shadow-md p-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border text-gray-900 border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow lg:mt-19 p-4 pb-4">
        <div className="sticky top-[140px] z-30 bg-gray-50 text-sm text-gray-500 mb-3 mt-3 py-2">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>{" "}
          / <span className="font-semibold text-gray-700">Shop</span>
          <span className="float-right font-semibold text-gray-700">
            {filteredProducts.length} টি পণ্য
          </span>
        </div>

        {/* Filters */}
        <div className="  sticky top-[140px] z-30  bg-white p-4 rounded-xl shadow-lg border border-gray-200 mb-6 grid grid-cols-2 gap-4">
          <DropdownFilter
            title="ক্যাটাগরি"
            options={CATEGORIES}
            activeValue={activeCategory}
            onSelect={setActiveCategory}
          />
          <DropdownFilter
            title="মূল্য পরিসীমা"
            options={PRICE_RANGES}
            activeValue={activePriceRange}
            onSelect={setActivePriceRange}
          />
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            কোন প্রোডাক্ট পাওয়া যায়নি 😞
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                _id={product._id}
                name={product.name || "No Name"}
                sale_price={product.sale_price || 0}
                regular_price={product.regular_price || 0}
                image={
                  product.main_image || product.image || "/placeholder.png"
                }
                slug={product.slug || product.sku || ""}
                discount={product.discount || 0}
                description={product.description || ""}
                sizes={product.sizes || []}
                sku={product.sku || ""}
                stock_status={product.stock_status || "In Stock"}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
