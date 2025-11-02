import cloudinary from "@/lib/cloudinary"; // Cloudinary utility
import streamifier from "streamifier";

export const config = {
  runtime: "nodejs",
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file)
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
      });

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "products",
          format: "webp",
          transformation: [
            { width: 800, height: 800, crop: "limit" }, // Max size 800x800
            { quality: "auto" }, // Auto quality
            { fetch_format: "auto" }, // Auto format WebP/compatible
          ],
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });

    return new Response(JSON.stringify({ urls: [uploadResult.secure_url] }), {
      status: 200,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 500,
    });
  }
}
