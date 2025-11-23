"use client";

import { Button } from "@/app/components/UI/Button";
import { Input } from "@/app/components/UI/input";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const categories = [
  { name: "ডিপ কালেকশন", slug: "deep-collection" },
  { name: "স্ট্রাইপ এবং চেক লুঙ্গি", slug: "stripe-check" },
  { name: "ফ্যান্সি লুঙ্গি", slug: "fancy-lungi" },
  { name: "টু পার্ট লুঙ্গি", slug: "two-part" },
  { name: "জ্যাকার্ড লুঙ্গি", slug: "jacquard-lungi" },
  { name: "এক কালার লুঙ্গি", slug: "one-color" },
  { name: "সাদা এবং অন্যান্য", slug: "white-and-others" },
  { name: "বাটিক লুঙ্গি", slug: "batik-lungi" },
  { name: "হ্যান্ডলুম লুঙ্গি", slug: "handloom-lungi" },
];

export default function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [productsInCategory, setProductsInCategory] = useState([]);
  const [isCategorySoldOut, setIsCategorySoldOut] = useState(false);

  // ✅ fetch products whenever category changes
  useEffect(() => {
    async function fetchProducts() {
      if (!selectedCategory) return;
      try {
        const res = await fetch(
          `/api/products?category=${selectedCategory.slug}`
        );
        const data = await res.json();
        setProductsInCategory(data);

        // sold out check
        const soldOut =
          !data ||
          data.length === 0 ||
          data.every((p) => p.stock_status?.toLowerCase() === "sold out");
        setIsCategorySoldOut(soldOut);
      } catch (err) {
        console.error("Failed to fetch products for category:", err);
        setProductsInCategory([]);
        setIsCategorySoldOut(true);
      }
    }
    fetchProducts();
  }, [selectedCategory]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
  };

  const handleAddCategory = async () => {
    if (!image || !selectedCategory)
      return toast.error("Category and image required");

    setUploading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", selectedCategory.name);
    formData.append("slug", selectedCategory.slug);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Category added successfully!");
        setSelectedCategory(categories[0]);
        setImage(null);
      } else {
        toast.error(data.message || "Failed to add category");
      }
    } catch (err) {
      toast.error("Error uploading category");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-5 text-gray-800">
      <h2 className="text-xl font-bold mb-4">Add New Category</h2>

      <div className="flex flex-col gap-4 max-w-sm">
        <select
          value={selectedCategory.slug}
          onChange={(e) =>
            setSelectedCategory(
              categories.find((cat) => cat.slug === e.target.value)
            )
          }
          className="border p-2 rounded text-gray-800"
        >
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}{" "}
              {productsInCategory &&
              productsInCategory.every(
                (p) => p.stock_status?.toLowerCase() === "sold out"
              )
                ? "(Sold Out)"
                : ""}
            </option>
          ))}
        </select>

        <Input
          type="file"
          onChange={handleImageUpload}
          className="text-gray-800"
        />

        <Button
          onClick={handleAddCategory}
          disabled={uploading || isCategorySoldOut}
        >
          {uploading
            ? "Adding..."
            : isCategorySoldOut
            ? "Sold Out"
            : "Add Category"}
        </Button>

        {isCategorySoldOut && (
          <p className="text-red-600 text-sm mt-1">
            এই category তে বর্তমানে সব product sold out
          </p>
        )}
      </div>
    </div>
  );
}
