// app/api/track-event/route.js (Next.js App Router)
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    // ✅ Validate frontend payload (items optional)
    if (!data.event_name) {
      return NextResponse.json(
        { success: false, error: "Event name missing" },
        { status: 400 }
      );
    }

    // Get client IP & User Agent
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      req.socket?.remoteAddress ||
      undefined;

    const ua = req.headers.get("user-agent") || undefined;

    // Facebook credentials
    const PIXEL_ID = process.env.FB_PIXEL_ID;
    const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

    if (!PIXEL_ID || !ACCESS_TOKEN) {
      return NextResponse.json(
        { success: false, error: "FB Pixel ID or Access Token missing" },
        { status: 500 }
      );
    }

    // Prepare custom_data
    const custom_data = {
      currency: data.currency || "BDT",
      value: Number(data.value) || 0,
      contents: (data.contents || []).map((p) => ({
        id: String(p.id),
        quantity: Number(p.quantity) || 1,
        item_price: Number(p.item_price) || 0,
      })),
      page_title: data.page_title || undefined,
      page_path: data.page_path || undefined,
      transaction_id: data.transaction_id || undefined,
    };

    // Call Facebook Conversion API
    const fbResponse = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              event_name: data.event_name,
              event_time: data.event_time || Math.floor(Date.now() / 1000),
              action_source: data.action_source || "website",
              event_source_url: data.url || undefined,
              user_data: {
                client_ip_address: ip,
                client_user_agent: ua,
              },
              custom_data,
            },
          ],
          test_event_code: data.test_code || undefined,
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
