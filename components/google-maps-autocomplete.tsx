"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

export interface GoogleMapsAddress {
  street: string;
  streetNumber: string;
  city: string;
  county: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  formattedAddress: string;
}

interface GoogleMapsAutocompleteProps {
  onAddressSelect: (address: GoogleMapsAddress) => void;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

/**
 * Google Maps Autocomplete component for address selection
 *
 * Setup Instructions:
 * 1. Get API key from Google Cloud Console
 * 2. Enable the following APIs:
 *    - Places API
 *    - Geocoding API
 *    - Maps JavaScript API
 * 3. Add API key to .env.local:
 *    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
 * 4. Add Google Maps script to app/layout.tsx or this component
 *
 * Restrictions for Romania:
 * - The autocomplete is restricted to Romania (componentRestrictions: { country: "ro" })
 * - This ensures only Romanian addresses can be selected
 */
export default function GoogleMapsAutocomplete({
  onAddressSelect,
  placeholder = "Start typing your address...",
  defaultValue = "",
  className = "",
}: GoogleMapsAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wait for Google Maps to be loaded
    const checkGoogleMapsLoaded = () => {
      if (typeof window !== "undefined" && (window as any).google?.maps?.places) {
        setIsLoaded(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkGoogleMapsLoaded()) {
      return;
    }

    // Poll every 100ms for up to 10 seconds
    let attempts = 0;
    const maxAttempts = 100;
    const interval = setInterval(() => {
      attempts++;
      if (checkGoogleMapsLoaded()) {
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        console.error("Google Maps JavaScript API failed to load after 10 seconds");
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Only initialize when Google Maps is loaded and input ref is ready
    if (!isLoaded || !inputRef.current) return;

    // Initialize autocomplete with Romania restriction
    autocompleteRef.current = new (window as any).google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: "ro" }, // Restrict to Romania
        fields: ["address_components", "formatted_address", "geometry"],
        types: ["address"], // Only show full addresses, not establishments
      }
    );

    // Add place changed listener
    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();

      if (!place || !place.address_components || !place.geometry) {
        console.warn("No address details available");
        return;
      }

      // Parse address components
      const addressComponents = place.address_components;
      const addressData: Partial<GoogleMapsAddress> = {
        formattedAddress: place.formatted_address || "",
        latitude: place.geometry.location?.lat() || 0,
        longitude: place.geometry.location?.lng() || 0,
      };

      // Extract individual components
      addressComponents.forEach((component: any) => {
        const types = component.types;

        if (types.includes("street_number")) {
          addressData.streetNumber = component.long_name;
        }
        if (types.includes("route")) {
          addressData.street = component.long_name;
        }
        if (types.includes("locality")) {
          addressData.city = component.long_name;
        }
        if (types.includes("administrative_area_level_1")) {
          addressData.county = component.long_name;
        }
        if (types.includes("postal_code")) {
          addressData.postalCode = component.long_name;
        }
        if (types.includes("country")) {
          addressData.country = component.long_name;
        }
      });

      // Validate that we have the minimum required fields
      if (!addressData.street || !addressData.city || !addressData.country) {
        console.error("Address is missing required components:", addressData);
        return;
      }

      // Call the callback with the parsed address
      onAddressSelect(addressData as GoogleMapsAddress);

      // Update input value
      setInputValue(place.formatted_address || "");
    });

    return () => {
      // Cleanup listeners
      if (autocompleteRef.current && (window as any).google) {
        (window as any).google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isLoaded, onAddressSelect]);

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
      <Input
        ref={inputRef}
        type="text"
        placeholder={isLoaded ? placeholder : "Loading Google Maps..."}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`pl-10 ${className}`}
        autoComplete="off"
        disabled={!isLoaded}
      />
    </div>
  );
}

/**
 * Script loader component to add Google Maps to your app
 * Add this to your app/layout.tsx or page component
 */
export function GoogleMapsScript() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.warn(
      "Google Maps API key not found. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local"
    );
    return null;
  }

  return (
    <script
      src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=Function.prototype`}
      async
      defer
    />
  );
}
