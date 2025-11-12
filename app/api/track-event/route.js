// 📁 /app/api/track-event/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.event || !data.custom_data) {
      return NextResponse.json(
        { success: false, error: "Event name or custom_data missing" },
        { status: 400 }
      );
    }

    // 🔹 Facebook Conversion API call
    const PIXEL_ID = process.env.FB_PIXEL_ID;
    const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

    if (!PIXEL_ID || !ACCESS_TOKEN) {
      return NextResponse.json(
        { success: false, error: "FB Pixel ID or Access Token not configured" },
        { status: 500 }
      );
    }

    const fbResponse = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              event_name: data.event,
              event_time: Math.floor(Date.now() / 1000),
              user_data: {
                client_ip_address: data.ip || null,
                client_user_agent: data.ua || null,
              },
              custom_data: data.custom_data,
            },
          ],
        }),
      }
    );

    const fbResult = await fbResponse.json();

    return NextResponse.json({ success: true, fbResult });
  } catch (error) {
    console.error("❌ /api/track-event error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
