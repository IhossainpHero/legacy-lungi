import ProductCard from "@/app/components/Product/ProductCard";

// 🧠 Server Component — তাই এখানে "use client" থাকবে না
export const revalidate = 60; // প্রতি ১ মিনিটে cache refresh হবে

export default async function ProductGrid() {
  const API_BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      next: { revalidate: 60 }, // ISR: প্রতি ১ মিনিটে নতুন ডেটা
      cache: "force-cache", // দ্রুত cache করা response serve করবে
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await res.json();

    if (!products || products.length === 0) {
      return (
        <p className="text-center text-gray-500 py-10">No products found 😞</p>
      );
    }

    return (
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
               gap-1
               sm:px-3 md:px-4"
      >
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
            stock_status={p.stock_status}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error("ProductGrid Error:", error);
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load products 😞
      </p>
    );
  }
}
