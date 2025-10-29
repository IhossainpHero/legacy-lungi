// app/shop/page.jsx
import ShopPageClient from "./ShopPageClient"; // Client Component

export default async function ShopPage() {
  // ✅ Server side fetch
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    cache: "no-store",
  });
  const products = await res.json();

  return <ShopPageClient products={products} />;
}
