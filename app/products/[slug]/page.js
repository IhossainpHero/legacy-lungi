import { products } from "@/app/data/products"; // তোমার product data file import করো

export default async function ProductPage({ params }) {
  const { slug } = await params; // ✅ params কে await করো
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <div className="p-10 text-center">Product not found!</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-md rounded-lg mb-6"
      />
      <p className="text-lg text-gray-700 mb-3">{product.description}</p>
      <p className="text-xl font-bold text-green-700">৳ {product.price}</p>
    </div>
  );
}
