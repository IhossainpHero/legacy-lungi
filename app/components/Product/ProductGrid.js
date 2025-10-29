import ProductCard from "@/app/components/Product/ProductCard";

export default async function ProductGrid() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    cache: "force-cache",
  });
  const products = await res.json();

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">No products found 😞</p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 p-4">
      {products.map((p) => (
        <ProductCard
          key={p._id + (p.sizes[0] || "")}
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
