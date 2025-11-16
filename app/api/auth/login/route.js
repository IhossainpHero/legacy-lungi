// /api/auth/login/route.js
import { SignJWT } from "jose"; // <-- jose ইমপোর্ট করুন
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // 💡 jose ব্যবহার করে টোকেন তৈরি
    const token = await new SignJWT({ email, role: "admin" })
      .setProtectedHeader({ alg: "HS256" }) // অ্যালগরিদম সেট করুন
      .setIssuedAt()
      .setExpirationTime("1h") // টোকেনের মেয়াদ সেট করুন
      // JWT_SECRET কে Uint8Array-তে এনকোড করতে হবে
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const res = NextResponse.json({ user: { email, role: "admin" } });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
      sameSite: "lax", // নিশ্চিত করুন এটি "lax" আছে
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
