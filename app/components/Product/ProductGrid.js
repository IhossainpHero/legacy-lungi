"use client";

import ProductCard from "@/app/components/Product/ProductCard";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductGrid() {
  const API_BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_API_URL;

  // SWR দিয়ে fetch + revalidate every 30s
  const { data: products, error } = useSWR(
    `${API_BASE_URL}/api/products`,
    fetcher,
    {
      refreshInterval: 30000, // 30 সেকেন্ড
    }
  );

  if (error) {
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load products 😞
      </p>
    );
  }

  if (!products) {
    return (
      <p className="text-center text-gray-500 py-10">Loading products...</p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">No products found 😞</p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-5 px-2 sm:px-3 md:px-4">
      {products.map((p) => (
        <ProductCard
          key={p._id}
          _id={p._id}
          name={p.name}
          sale_price={p.sale_price}
          regular_price={p.regular_price}
          image={p.main_image || p.images?.[0]}
          slug={p.slug || p.sku}
          discount={p.discount}
          description={p.description}
          sizes={p.sizes || []}
          sku={p.sku}
          quantity={p.quantity} // যদি stock দেখাতে চাও
        />
      ))}
    </div>
  );
}
