import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// 🔥 Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const name = formData.get("name");
    const slug = formData.get("slug");
    const file = formData.get("file");

    if (!name || !slug || !file) {
      return NextResponse.json(
        { message: "❌ Name, slug এবং image প্রয়োজন" },
        { status: 400 }
      );
    }

    // =============================
    //  🔥 Image Upload to Cloudinary
    // =============================
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "categories", // Cloudinary folder
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const imageUrl = uploadResult.secure_url;

    // 🔎 আগের category আছে কিনা
    const existingCategory = await Category.findOne({ slug });

    // 👍 Update বা create
    const updatedCategory = await Category.findOneAndUpdate(
      { slug },
      { name, slug, image: imageUrl },
      { new: true, upsert: true }
    );

    // =============================
    //  🔥 পুরনো image delete (Cloudinary)
    // =============================
    if (
      existingCategory &&
      existingCategory.image &&
      existingCategory.image !== imageUrl
    ) {
      const publicId = existingCategory.image.split("/").pop().split(".")[0];

      await cloudinary.uploader.destroy(`categories/${publicId}`);
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
