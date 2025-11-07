import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration utility
const configureCloudinary = () => {
  // যদি আগে থেকেই কনফিগার করা থাকে, আবার কনফিগার করার দরকার নেই
  if (cloudinary.config().cloud_name) {
    return cloudinary;
  }

  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;

  // যদি .env থেকে ভ্যালু পাওয়া যায়
  if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
    console.log("✅ Cloudinary configured via .env.local");
  } else {
    // fallback (শুধু dev ডিবাগিং-এর জন্য)
    console.warn(
      "⚠️ Cloudinary .env values not found! Please check your .env.local configuration."
    );
  }

  return cloudinary;
};

// Ensure Cloudinary is configured once
const configuredCloudinary = configureCloudinary();

export default configuredCloudinary;
