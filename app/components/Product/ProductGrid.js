import ProductCard from "@/app/components/Product/ProductCard";

export default async function ProductGrid() {
  // Base URL environment অনুযায়ী সেট করা
  const API_BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000" // development-এ local server
      : process.env.NEXT_PUBLIC_API_URL; // production-এ vercel link

  let products = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      next: { revalidate: 60 }, // cache 60 সেকেন্ড
    });

    if (!res.ok) {
      console.error("Failed to fetch products:", res.status);
      products = [];
    } else {
      products = await res.json();
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    products = [];
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
          key={p._id + (p.sizes?.[0] || "")}
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
