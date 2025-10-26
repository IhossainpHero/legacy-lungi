"use client";

import { ChevronDown, Heart, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react"; // useRef, useEffect যোগ করা হলো

// --- Data ---
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Extra LARGE Lungi কোড-০১",
    price: 950,
    oldPrice: 1450,
    imageUrl: "/product-lungi-1.jpg",
    discount: 34,
  },
  {
    id: 2,
    name: "Extra LARGE Lungi কোড-০২",
    price: 950,
    oldPrice: 1450,
    imageUrl: "/product-lungi-2.jpg",
    discount: 34,
  },
  {
    id: 3,
    name: "Luxury Khesh Lungi",
    price: 1200,
    oldPrice: 1800,
    imageUrl: "/product-lungi-3.jpg",
    discount: 33,
  },
  {
    id: 4,
    name: "Checkered Fancy Lungi",
    price: 750,
    oldPrice: 1000,
    imageUrl: "/product-lungi-4.jpg",
    discount: 25,
  },
];

const CATEGORIES = [
  "সকল ক্যাটাগরি",
  "ডিপ কালেকশন",
  "স্ট্রাইপ এবং চেক লুঙ্গি",
  "ফ্যান্সি লুঙ্গি",
  "টু পার্ট লুঙ্গি",
  "এক কালার লুঙ্গি",
  "সাদা এবং অন্যান্য",
];

const PRICE_RANGES = [
  { label: "সকল মূল্য", min: 0, max: 99999 },
  { label: "৳0 - ৳500", min: 0, max: 500 },
  { label: "৳501 - ৳1000", min: 501, max: 1000 },
  { label: "৳1001 - ৳1500", min: 1001, max: 1500 },
  { label: "৳1501+", min: 1501, max: 99999 },
];

// --- Reusable Dropdown Filter Component ---
function DropdownFilter({ title, options, activeValue, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Determine the label to display based on whether activeValue is an object or string
  const currentLabel =
    typeof activeValue === "object" ? activeValue.label : activeValue;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelection = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full sm:w-1/2" ref={dropdownRef}>
      <label className="text-xs font-semibold text-gray-500 mb-1 block">
        {title}
      </label>

      {/* Select Box / Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm text-gray-700 hover:border-blue-500 transition focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      >
        <span>{currentLabel}</span>
        <ChevronDown
          className={`h-4 w-4 ml-2 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {options.map((option, index) => {
            // option can be a string (category) or an object (price range)
            const optionValue = typeof option === "object" ? option : option;
            const optionLabel =
              typeof option === "object" ? option.label : option;
            const isSelected = optionLabel === currentLabel;

            return (
              <button
                key={index}
                onClick={() => handleSelection(optionValue)}
                className={`w-full text-left px-3 py-2 text-sm transition ${
                  isSelected
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {optionLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// 1. Header কম্পোনেন্ট (ক্যাটাগরি বাটন সরানো হয়েছে)
function ShopHeader() {
  return (
    <header className="sticky mt-12 top-0 z-10 bg-white shadow-md p-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 p-2 rounded-full">
          <Search className="h-4 w-4 text-white" />
        </button>
      </div>
    </header>
  );
}

// 2. Product Card কম্পোনেন্ট (অপরিবর্তিত)
function ProductCard({ product }) {
  const { id, name, price, oldPrice, imageUrl, discount } = product;
  return (
    <Link
      href={`/product/${id}`}
      className="block border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300 bg-white overflow-hidden relative"
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-lg z-10">
          -{discount}%
        </span>
      )}
      <div className="relative w-full h-32 bg-gray-100">
        {/* Placeholder image tag for Next.js Image component */}
        {/* In a real Next.js app, ensure the images exist in /public or mock them */}
        <Image
          src={
            imageUrl ||
            "https://placehold.co/150x150/EEEEEE/333333?text=Product"
          }
          alt={name}
          fill
          sizes="(max-width: 600px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="p-2"
        />
        {/* Wishlist Icon */}
        <Heart className="absolute top-2 right-2 h-6 w-6 text-white fill-current z-10 p-1 bg-black bg-opacity-30 rounded-full" />
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-10">
          {name}
        </h3>

        {/* Price & Discount */}
        <div className="mt-1">
          <p className="text-sm font-bold text-gray-400 line-through">
            ৳{oldPrice}
          </p>
          <p className="text-base font-bold text-blue-600">৳{price}</p>
        </div>
      </div>

      {/* Button Group */}
      <div className="flex flex-col space-y-1 p-3 pt-0">
        <button className="w-full bg-cyan-500 text-white text-sm py-2 rounded-lg hover:bg-cyan-600 transition duration-300">
          বিস্তারিত দেখুন
        </button>
        <button className="w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          অর্ডার করুন
        </button>
      </div>
    </Link>
  );
}

// --- Main Page Component ---
export default function ShopPage() {
  // ক্যাটাগরি এবং প্রাইস রেঞ্জের জন্য স্টেট। ডিফল্ট মান প্রথম অপশন
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [activePriceRange, setActivePriceRange] = useState(PRICE_RANGES[0]);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    // এখানে আপনি API থেকে নতুন প্রোডাক্ট ফেচ করার লজিক লিখতে পারেন
    console.log(`Filtering by: ${category}`);
  };

  const handlePriceRangeSelect = (range) => {
    setActivePriceRange(range);
    // এখানে আপনি API থেকে নতুন প্রোডাক্ট ফেচ করার লজিক লিখতে পারেন
    console.log(`Filtering by price range: ৳${range.min} - ৳${range.max}`);
  };

  // পণ্যের সংখ্যা ফিল্টারের উপর ভিত্তি করে পরিবর্তনশীল হতে পারে
  const filteredProductCount = MOCK_PRODUCTS.length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with Search */}
      <ShopHeader />

      <main className="flex-grow p-4 pb-4">
        {/* Breadcrumb and Result Count */}
        <div className="text-sm text-gray-500 mb-3">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>{" "}
          / <span className="font-semibold text-gray-700">Shop</span>
          <span className="float-right font-semibold text-gray-700">
            {filteredProductCount} টি পণ্য
          </span>
        </div>

        {/* Filters Container (Dropdowns) */}
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 mb-6 grid grid-cols-2 gap-4">
          {/* Category Dropdown */}
          <DropdownFilter
            title="ক্যাটাগরি"
            options={CATEGORIES}
            activeValue={activeCategory}
            onSelect={handleCategorySelect}
          />

          {/* Price Range Dropdown */}
          <DropdownFilter
            title="মূল্য পরিসীমা"
            options={PRICE_RANGES}
            activeValue={activePriceRange}
            onSelect={handlePriceRangeSelect}
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Note: Modals are removed as per new requirements */}
    </div>
  );
}
