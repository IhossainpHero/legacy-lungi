// lib/cloudinary.js

import { v2 as cloudinary } from "cloudinary";

// একটি ইউটিলিটি ফাংশন তৈরি করুন যা শুধুমাত্র একবার কনফিগারেশন চেক করবে
const configureCloudinary = () => {
  // যদি আগে থেকেই কনফিগার করা থাকে, তবে নতুন করে আর কনফিগার করার দরকার নেই
  if (cloudinary.config().cloud_name) {
    return cloudinary;
  }

  // আপনার .env ফাইল যদি লোড না হয় (আপনার বর্তমান সমস্যা)
  const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

  if (CLOUDINARY_URL) {
    // 1. যদি .env ফাইল লোড হয়, তবে সেটি ব্যবহার করুন (সবচেয়ে নিরাপদ)
    cloudinary.config({
      cloudinary_url: CLOUDINARY_URL,
    });
    console.log("Cloudinary: Configured securely via CLOUDINARY_URL.");
  } else {
    // 2. .env লোড না হলে, অস্থায়ীভাবে হার্ডকোডেড ভ্যালু ব্যবহার করুন
    // ⚠️ এই ভ্যালুগুলোই আমরা এখন কোড থেকে রিমুভ করব!
    cloudinary.config({
      cloud_name: "dghqkfz7d",
      api_key: "688585913789319",
      api_secret: "BE3H8WBSNhMUkup6Mox9zFsRaUI",
    });
    console.warn(
      "Cloudinary: WARNING! Configured using HARDCODED keys. Please fix .env loading."
    );
  }

  return cloudinary;
};

// যখনই এই ফাইলটি ইম্পোর্ট হবে, তখনই কনফিগারেশন কল হবে
const configuredCloudinary = configureCloudinary();

export default configuredCloudinary;
