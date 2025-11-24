"use client";

import Script from "next/script";
import { useEffect } from "react";

export function GoogleMapsLoader() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    console.log("GoogleMapsLoader mounted");
    console.log("API Key exists:", !!apiKey);
    console.log("API Key (first 10 chars):", apiKey?.substring(0, 10));
  }, [apiKey]);

  if (!apiKey) {
    console.error(
      "❌ Google Maps API key not found. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local"
    );
    return null;
  }

  const scriptSrc = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
  console.log("Loading Google Maps script:", scriptSrc.substring(0, 80) + "...");

  return (
    <Script
      id="google-maps-script"
      src={scriptSrc}
      strategy="afterInteractive"
      onLoad={() => {
        console.log("✅ Google Maps API loaded successfully");
        console.log("window.google exists:", !!(window as any).google);
        console.log("window.google.maps exists:", !!(window as any).google?.maps);
        console.log("window.google.maps.places exists:", !!(window as any).google?.maps?.places);
      }}
      onError={(e) => {
        console.error("❌ Error loading Google Maps API:", e);
      }}
      onReady={() => {
        console.log("📦 Google Maps script ready");
      }}
    />
  );
}
