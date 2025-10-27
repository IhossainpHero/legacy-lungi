"use client";

import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";

// --- Filters ---
// --- Filters ---
const CATEGORIES = [
  { label: "সকল ক্যাটাগরি", value: "all" },
  { label: "ডিপ কালেকশন", value: "deep-collection" },
  { label: "স্ট্রাইপ এবং চেক লুঙ্গি", value: "stripe-check" },
  { label: "ফ্যান্সি লুঙ্গি", value: "fancy-lungi" },
  { label: "টু পার্ট লুঙ্গি", value: "two-part" },
  { label: "এক কালার লুঙ্গি", value: "one-color" },
  { label: "সাদা এবং অন্যান্য", value: "white-and-others" },
];

const PRICE_RANGES = [
  { label: "সকল মূল্য", min: 0, max: 99999 },
  { label: "৳0 - ৳500", min: 0, max: 500 },
  { label: "৳501 - ৳1000", min: 501, max: 1000 },
  { label: "৳1001 - ৳1500", min: 1001, max: 1500 },
  { label: "৳1501+", min: 1501, max: 99999 },
];

// --- DropdownFilter Component ---
function DropdownFilter({ title, options, activeValue, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLabel =
    typeof activeValue === "object" ? activeValue.label : activeValue;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-1/2" ref={dropdownRef}>
      <label className="text-xs font-semibold text-gray-500 mb-1 block">
        {title}
      </label>

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

      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {options.map((option, index) => {
            const optionLabel =
              typeof option === "object" ? option.label : option;
            const isSelected = optionLabel === currentLabel;
            return (
              <button
                key={index}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
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

// --- Product Card Component ---
function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const {
    _id,
    name,
    sale_price,
    regular_price,
    image,
    slug,
    discount,
    description,
    sizes = [],
  } = product;

  const mainImage =
    image && image.startsWith("data:image")
      ? image
      : image || "/placeholder.png";

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
        className="relative w-full h-48 sm:h-56 md:h-60 lg:h-56 rounded-t-2xl overflow-hidden"
      >
        <Image
          src={mainImage}
          alt={name || "Product image"}
          fill
          unoptimized
          loading="lazy"
          className="object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
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

// --- Main Page ---
export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]); // "ডিপ কালেকশন"
  // ✅ Default category
  const [activePriceRange, setActivePriceRange] = useState(PRICE_RANGES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      activeCategory.value === "all" ||
      product.category?.toLowerCase() === activeCategory.value.toLowerCase();

    const priceMatch =
      product.sale_price >= activePriceRange.min &&
      product.sale_price <= activePriceRange.max;

    const searchMatch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return categoryMatch && priceMatch && searchMatch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky mt-12 top-0 z-10 bg-white shadow-md p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 p-2 rounded-full">
            <Search className="h-4 w-4 text-white" />
          </button>
        </div>
      </header>

      <main className="flex-grow p-4 pb-4">
        <div className="text-sm text-gray-500 mb-3">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>{" "}
          / <span className="font-semibold text-gray-700">Shop</span>
          <span className="float-right font-semibold text-gray-700">
            {loading ? "লোড হচ্ছে..." : `${filteredProducts.length} টি পণ্য`}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 mb-6 grid grid-cols-2 gap-4">
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

        {loading ? (
          <p className="text-center text-gray-500 py-10">লোড হচ্ছে...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            কোন প্রোডাক্ট পাওয়া যায়নি 😞
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
