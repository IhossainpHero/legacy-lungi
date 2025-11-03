"use client";

import { Button } from "@/app/components/UI/Button";
import { Input } from "@/app/components/UI/input";
import { useState } from "react"; // ✅ React থেকে import
import { toast } from "react-toastify";

const categories = [
  { name: "ডিপ কালেকশন", slug: "deep-collection" },
  { name: "স্ট্রাইপ এবং চেক লুঙ্গি", slug: "stripe-check" },
  { name: "ফ্যান্সি লুঙ্গি", slug: "fancy-lungi" },
  { name: "টু পার্ট লুঙ্গি", slug: "two-part" },
  { name: "জ্যাকার্ড লুঙ্গি", slug: "jacquard-lungi" },
  { name: "এক কালার লুঙ্গি", slug: "one-color" },
  { name: "সাদা এবং অন্যান্য", slug: "white-and-others" },
];

export default function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

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
    formData.append("name", selectedCategory.name); // ✅ বাংলা নাম
    formData.append("slug", selectedCategory.slug); // ✅ ইংরেজি slug

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);

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
              {cat.name}
            </option>
          ))}
        </select>

        <Input
          type="file"
          onChange={handleImageUpload}
          className="text-gray-800"
        />

        <Button onClick={handleAddCategory} disabled={uploading}>
          {uploading ? "Adding..." : "Add Category"}
        </Button>
      </div>
    </div>
  );
}
