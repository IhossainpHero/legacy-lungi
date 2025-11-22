"use client";

import { useEffect } from "react";

export default function BrowserTracking() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // -------------------------------
    // 1️⃣ TIME ON PAGE TRACKING
    // -------------------------------

    const startTime = Date.now();

    const sendTimeOnPage = () => {
      const duration = Math.floor((Date.now() - startTime) / 1000);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "time_on_page",
        duration_seconds: duration,
      });

      console.log("⏱ TIME ON PAGE:", duration, "sec");

      // OPTIONAL → server log
      fetch("/api/track-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: "TimeOnPage",
          duration_seconds: duration,
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
        }),
      });
    };

    window.addEventListener("beforeunload", sendTimeOnPage);
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        sendTimeOnPage();
      }
    });

    // -------------------------------
    // 2️⃣  SCROLL DEPTH TRACKING
    // -------------------------------

    let scroll25 = false;
    let scroll50 = false;
    let scroll75 = false;
    let scroll100 = false;

    const handleScroll = () => {
      const scrollPercent = Math.floor(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );

      if (scrollPercent >= 25 && !scroll25) {
        scroll25 = true;
        fireScrollEvent("Scroll_25", 25);
      }
      if (scrollPercent >= 50 && !scroll50) {
        scroll50 = true;
        fireScrollEvent("Scroll_50", 50);
      }
      if (scrollPercent >= 75 && !scroll75) {
        scroll75 = true;
        fireScrollEvent("Scroll_75", 75);
      }
      if (scrollPercent >= 100 && !scroll100) {
        scroll100 = true;
        fireScrollEvent("Scroll_100", 100);
      }
    };

    const fireScrollEvent = (eventName, percent) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        scroll_percent: percent,
      });

      console.log("📜 SCROLL EVENT →", percent, "%");

      // (Optional) send to server
      fetch("/api/track-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: eventName,
          scroll_percent: percent,
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
        }),
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", sendTimeOnPage);
    };
  }, []);

  return null;
}
