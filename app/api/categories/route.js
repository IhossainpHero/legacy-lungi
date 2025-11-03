import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import fs from "fs";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const name = formData.get("name"); // বাংলা নাম
    const slug = formData.get("slug"); // আলাদা slug
    const file = formData.get("file");

    if (!name || !slug || !file) {
      return NextResponse.json(
        { message: "❌ Name, slug এবং image প্রয়োজন" },
        { status: 400 }
      );
    }

    // ✅ Upload folder তৈরি করো
    const uploadDir = path.join(process.cwd(), "public/uploads/categories");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // ✅ নতুন ফাইল সেভ করো
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);
    const imageUrl = `/uploads/categories/${filename}`;

    // ✅ পুরনো category আছে কিনা চেক করো
    const existingCategory = await Category.findOne({ slug });

    // ✅ Update বা create করো
    const updatedCategory = await Category.findOneAndUpdate(
      { slug },
      { name, slug, image: imageUrl },
      { new: true, upsert: true }
    );

    // ✅ আগের image থাকলে মুছে ফেলো
    if (
      existingCategory &&
      existingCategory.image &&
      existingCategory.image !== imageUrl
    ) {
      const oldPath = path.join(
        process.cwd(),
        "public",
        existingCategory.image
      );
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
        console.log("🗑️ পুরনো ছবি ডিলিট হয়েছে:", existingCategory.image);
      }
    }

    return NextResponse.json({
      message: "✅ Category added/updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("❌ Category API Error:", error);
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// =========================
// GET all categories
// =========================
export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find(
      {},
      { name: 1, slug: 1, image: 1, _id: 0 }
    );
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch categories" }),
      { status: 500 }
    );
  }
}
