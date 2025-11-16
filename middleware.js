// middleware.js
import { jwtVerify } from "jose"; // <-- jose ইমপোর্ট করুন
import { NextResponse } from "next/server";

// Middleware ফাংশনকে async করুন
export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    // 💡 jose ব্যবহার করে টোকেন যাচাই (await ব্যবহার করুন)
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET) // JWT_SECRET কে এনকোড করুন
    );

    // টোকেন যাচাই সফল
    return NextResponse.next();
  } catch (error) {
    // টোকেন যাচাই ব্যর্থ
    console.error("Token verification failed:", error.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = { matcher: ["/admin/:path*"] };
