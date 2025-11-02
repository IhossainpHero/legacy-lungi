import ProductCard from "@/app/components/Product/ProductCard";

export default async function ProductGrid() {
  const API_BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_API_URL;

  let products = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      next: { revalidate: 60 },
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
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-5 px-2 sm:px-3 md:px-4">
      {products.map((p) => (
        <ProductCard
          key={p._id}
          _id={p._id}
          name={p.name}
          sale_price={p.sale_price}
          regular_price={p.regular_price}
          image={p.main_image || p.images?.[0]} // <-- main_image ব্যবহার করুন
          slug={p.slug || p.sku}
          discount={p.discount}
          description={p.description}
          sizes={p.sizes || []}
          sku={p.sku}
        />
      ))}
    </div>
  );
}
