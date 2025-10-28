import mongoose from "mongoose";

// ⚠️ গ্লোবাল ক্যাশ ভেরিয়েবল সেট করা হয়েছে
// এটি সার্ভারলেস ফাংশনে একই MongoDB সংযোগ পুনরায় ব্যবহার করতে সাহায্য করে।
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error("❌ Please define MONGO_URI in .env.local");

export default async function connectDB() {
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection from global cache");
    return cached.conn; // ✅ ক্যাশ করা সংযোগটি ফেরত দিন
  }

  if (!cached.promise) {
    const opts = {
      dbName: "lungiStore", // bufferCommands: false, // Mongoose 6+ এ প্রায়শই অপ্রয়োজনীয়
    }; // সংযোগের প্রতিশ্রুতিটি ক্যাশ করা

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB Connected: New connection established");
      return mongoose;
    });
  } // সংযোগ স্থাপন হওয়ার জন্য অপেক্ষা করুন এবং ক্যাশ আপডেট করুন

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    // সংযোগ ব্যর্থ হলে প্রমিস রিসেট করুন
    cached.promise = null;
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("MongoDB connection failed");
  }
}
