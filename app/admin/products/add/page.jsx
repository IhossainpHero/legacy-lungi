"use client";

import { Button } from "@/app/components/UI/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/UI/Card";
import { Input } from "@/app/components/UI/input";
import { Label } from "@/app/components/UI/label";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const categories = [
  { name: "ডিপ কালেকশন", slug: "deep-collection", image: "/images/DL-1.jpg" },
  {
    name: "স্ট্রাইপ এবং চেক লুঙ্গি",
    slug: "stripe-check",
    image: "/images/DL-2.jpg",
  },
  { name: "ফ্যান্সি লুঙ্গি", slug: "fancy-lungi", image: "/images/DL-3.jpg" },
  { name: "টু পার্ট লুঙ্গি", slug: "two-part", image: "/images/DL-7.jpg" },
  { name: "এক কালার লুঙ্গি", slug: "one-color", image: "/images/DL-1.jpg" },
  {
    name: "সাদা এবং অন্যান্য",
    slug: "white-and-others",
    image: "/images/DL-2.jpg",
  },
];

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(categories[0].slug);
  const [sizes, setSizes] = useState("");
  const [brand, setBrand] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ---------------- Image Upload ----------------
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    try {
      const options = {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 750,
        useWebWorker: true,
        fileType: "image/webp",
        initialQuality: 0.7,
      };
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        toast.success("✅ Image ready for preview!");
        setUploading(false);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error(error);
      toast.error("❌ Error during compression!");
      setUploading(false);
    }
  };

  // ---------------- Add Product ----------------
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!image) return toast.error("Please upload an image first!");
    if (!name) return toast.error("Product name is required!");
    if (!sku) return toast.error("SKU is required!");

    setSubmitting(true);

    const sizeArray = sizes
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const productData = {
      name,
      sku,
      category,
      brand,
      regular_price: Number(regularPrice) || 0,
      sale_price: Number(salePrice) || 0,
      description,
      discount: Number(discount) || 0,
      image,
      sizes: sizeArray,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("✅ Product added successfully!");
        console.log("Saved Product:", result);

        // ফর্ম রিসেট
        setName("");
        setSku("");
        setCategory(categories[0].slug);
        setBrand("");
        setRegularPrice("");
        setSalePrice("");
        setDescription("");
        setDiscount("");
        setImage(null);
        setSizes("");
      } else {
        toast.error(result.message || "❌ Failed to add product!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("❌ Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10 sm:px-6 lg:px-8 bg-gray-100">
      <Card className="max-w-3xl mx-auto shadow-xl rounded-2xl border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-2xl text-white p-6">
          <CardTitle className="text-3xl font-extrabold">
            Add New Product
          </CardTitle>
          <p className="mt-2 text-sm text-white/90">
            Fill out the form below to add a new product.
          </p>
        </CardHeader>

        <CardContent className="space-y-6 p-6 bg-white rounded-b-2xl">
          <form onSubmit={handleAdd} className="space-y-6">
            {/* Image Upload */}
            <div className="flex flex-col text-gray-700 gap-4">
              <Label>Upload Product Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {uploading && (
                <p className="text-blue-500 text-sm mt-1">Processing...</p>
              )}
              {image && (
                <Image
                  src={image}
                  alt="preview"
                  width={150}
                  height={150}
                  className="rounded-lg mt-2 object-cover border"
                />
              )}
            </div>

            {/* Product Name */}
            <div className="flex flex-col">
              <Label>Product Name</Label>
              <Input
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* SKU */}
            <div className="flex flex-col">
              <Label>SKU</Label>
              <Input
                placeholder="Enter SKU"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <Label>Category</Label>
              <select
                className="border border-gray-300 rounded-md p-2 text-black"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sizes */}
            <div className="flex flex-col">
              <Label>Sizes</Label>
              <Input
                placeholder="e.g., 4 Haat, 5 Haat"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
              />
            </div>

            {/* Brand */}
            <div className="flex flex-col">
              <Label>Brand</Label>
              <Input
                placeholder="Brand name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            {/* Prices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Label>Old Price</Label>
                <Input
                  type="number"
                  placeholder="Old Price"
                  value={regularPrice}
                  onChange={(e) => setRegularPrice(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <Label>New Price</Label>
                <Input
                  type="number"
                  placeholder="New Price"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <Label>Short Description</Label>
              <textarea
                className="border border-gray-300 rounded-md p-2 w-full min-h-[100px]"
                placeholder="Short description about the product"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Discount */}
            <div className="flex flex-col">
              <Label>Discount %</Label>
              <Input
                type="number"
                placeholder="Discount %"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className={`w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-all duration-200 ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
