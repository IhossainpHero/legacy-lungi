import cloudinary from "@/lib/cloudinary";
import streamifier from "streamifier";

// ✅ Next.js 14+ runtime declaration
export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // ✅ Debugging log (production-safe)
    console.log("🚀 Upload started to Cloudinary...");

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "products",
          format: "webp",
          transformation: [
            { width: 800, height: 800, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        },
        (err, result) => {
          if (err) {
            console.error("❌ Cloudinary Upload Error:", err);
            reject(err);
          } else {
            console.log("✅ Cloudinary Upload Success:", result.secure_url);
            resolve(result);
          }
        }
      );
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });

    return new Response(
      JSON.stringify({
        urls: [uploadResult.secure_url],
        success: true,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("🔥 Upload API Error:", err);
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 500,
    });
  }
}
