import { products } from "@/app/data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products found</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-4">
      {products.map((p) => (
        <ProductCard key={p.slug} {...p} />
      ))}
    </div>
  );
}
