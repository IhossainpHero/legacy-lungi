// app/components/DataLayerInit.jsx (Client Component)
"use client";

import { useEffect } from "react";

export default function DataLayerInit() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];

      // Initial page view
      window.dataLayer.push({
        event: "page_view",
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  return null;
}
