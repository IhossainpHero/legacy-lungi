import { products } from "@/app/data/products";

export default async function CategoryPage({ params }) {
  // await params to access slug
  const { slug } = await params;

  const filtered = products.filter((p) => p.category === slug);

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🩳 {slug.charAt(0).toUpperCase() + slug.slice(1)} Lungi Collection
      </h1>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <div key={product.slug} className="border p-4 rounded-lg">
              <img
                src={product.images?.[0] || "/images/default-lungi.jpg"}
                alt={product.name}
                className="w-full h-60 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
              <p className="text-blue-600 font-semibold">৳{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
