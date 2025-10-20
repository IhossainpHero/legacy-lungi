"use client";

import { useEffect, useState } from "react";

export default function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Component is mounted in browser
  }, []);

  if (!mounted) return null; // Prevent server-side rendering

  return children;
}
