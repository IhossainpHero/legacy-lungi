"use client";

export function pageview() {
  window.fbq("track", "PageView", {}, { eventID: generateEventId() });
}

export function trackEvent(name, data = {}) {
  const eventId = generateEventId();
  window.fbq("track", name, data, { eventID: eventId });
  return eventId; // send to server for dedupe
}

export function generateEventId() {
  return "evt_" + Date.now() + "_" + Math.random().toString(36).substring(2);
}

export function getFbpFbc() {
  return {
    fbp: getCookie("_fbp") || "",
    fbc: getCookie("_fbc") || "",
  };
}

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
  return match ? match[1] : null;
}
