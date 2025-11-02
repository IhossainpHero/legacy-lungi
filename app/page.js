import CategorySlider from "./components/Product/CategorySlider";
import ProductGrid from "./components/Product/ProductGrid";
import Hero from "./components/UI/Hero";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* 🏞️ Hero Banner Section */}
      <Hero />

      {/* 🔹 Category Slider */}
      <section className="w-full px-4 py-6">
        <CategorySlider />
      </section>

      {/* 🔹 Product Grid */}
      <section className="w-full px-4 py-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">
          🛍️ আমাদের জনপ্রিয় কালেকশন
        </h2>
        <ProductGrid />
      </section>
    </main>
  );
}
