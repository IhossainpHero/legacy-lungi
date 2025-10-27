/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ images কনফিগারেশন যোগ করুন
  images: {
    // remotePatterns হলো Next.js 13.4+ এর জন্য সঠিক সিনট্যাক্স
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

// 💡 যেহেতু আপনার সিস্টেমে `export default` কাজ করছে, আমরা এটি ব্যবহার করছি
export default nextConfig;
