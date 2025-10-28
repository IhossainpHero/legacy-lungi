"use client";
import ProductCard from "@/app/components/Product/ProductCard";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
// --- Categories ---
const categories = [
  { name: "ডিপ কালেকশন", slug: "deep-collection" },
  { name: "স্ট্রাইপ এবং চেক লুঙ্গি", slug: "stripe-check" },
  { name: "ফ্যান্সি লুঙ্গি", slug: "fancy-lungi" },
  { name: "টু পার্ট লুঙ্গি", slug: "two-part" },
  { name: "এক কালার লুঙ্গি", slug: "one-color" },
  { name: "সাদা এবং অন্যান্য", slug: "white-and-others" },
];

// --- Price Ranges ---
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
    typeof activeValue === "object"
      ? activeValue.label || activeValue.name
      : activeValue;

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
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {title}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-3 border rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:border-blue-500"
      >
        <span className="text-black font-medium">{currentLabel}</span>
        <ChevronDown
          className={`ml-2 h-4 w-4 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((opt) => {
            const label = opt.label || opt.name;
            const isSelected = currentLabel === label;
            return (
              <button
                key={label}
                onClick={() => {
                  onSelect(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm transition flex items-center gap-2 ${
                  isSelected
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-gray-100 text-black"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// --- Main Category Page ---
export default function CategoryPage({ params }) {
  const router = useRouter();
  const { slug } = use(params);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(
    categories.find((c) => c.slug === slug) || categories[0]
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState(PRICE_RANGES[0]);

  const dropdownRef = useRef(null);

  // Click outside dropdown to close (optional)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // close dropdowns if needed
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch products by category
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError("");

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${slug}`
        );
        if (!res.ok) throw new Error(`Failed to fetch. Status: ${res.status}`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("❌ Could not load products. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  // Handle category change
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    if (cat.slug !== slug) router.push(`/category/${cat.slug}`);
  };

  // Filter products by price range
  const filteredProducts = products.filter(
    (p) =>
      p.sale_price >= selectedPriceRange.min &&
      p.sale_price <= selectedPriceRange.max
  );

  return (
    <section className="container mt-6 mx-auto px-4 py-8">
      <h1 className="text-3xl text-gray-700 font-bold mb-6 text-center">
        🩳 {selectedCategory?.name || "Category"}
      </h1>

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <a href="/" className="text-blue-600 hover:underline">
          Home
        </a>{" "}
        / <span className="ml-1">{selectedCategory?.name || "Category"}</span>
      </div>

      {/* Filters */}
      <div className="flex flex-row justify-center items-start gap-4 mb-8">
        <div className="flex-1 max-w-xs">
          <DropdownFilter
            title="ক্যাটাগরি"
            options={categories}
            activeValue={selectedCategory}
            onSelect={handleSelectCategory}
          />
        </div>
        <div className="flex-1 max-w-xs">
          <DropdownFilter
            title="মূল্য পরিসীমা"
            options={PRICE_RANGES}
            activeValue={selectedPriceRange}
            onSelect={setSelectedPriceRange}
          />
        </div>
      </div>

      {/* Products */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 animate-pulse rounded-xl"
            ></div>
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          কোন পণ্য পাওয়া যায়নি 😞
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id + (product.sizes?.[0] || "")}
              _id={product._id}
              name={product.name || "No Name"}
              sale_price={product.sale_price || 0}
              regular_price={product.regular_price || 0}
              image={product.image || ""}
              slug={product.slug || product.sku || ""}
              discount={product.discount || 0}
              description={product.description || ""}
              sizes={product.sizes || []}
              sku={product.sku || ""}
            />
          ))}
        </div>
      )}
    </section>
  );
}
