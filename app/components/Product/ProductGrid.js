"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 animate-pulse">Loading products...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products found</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 p-4">
      {products.map((p) => (
        <ProductCard
          key={p._id}
          _id={p._id}
          name={p.name}
          sale_price={p.sale_price} // ✅ নাম ঠিক করে দেওয়া হলো
          regular_price={p.regular_price} // ✅ নাম ঠিক করে দেওয়া হলো
          image={p.image}
          slug={p.slug || p.sku}
          discount={p.discount}
          description={p.description}
          sizes={p.sizes}
          sku={p.sku}
        />
      ))}
    </div>
  );
}
