"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", {
          cache:
            process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
          next: { revalidate: 60 },
        });

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

  // 🟡 Loading Skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 p-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-gray-200 animate-pulse rounded-xl"
          ></div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">No products found 😞</p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 p-4">
      {products.map((p) => (
        <ProductCard
          key={p._id + (p.sizes[0] || "")} // ✅ Cart collision avoid
          _id={p._id}
          name={p.name}
          sale_price={p.sale_price}
          regular_price={p.regular_price}
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
