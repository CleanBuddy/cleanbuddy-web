# Google Maps Platform Setup Guide

This guide explains how to set up Google Maps Platform API for the CleanBuddy address autocomplete feature.

## Required APIs

You need to enable the following APIs in Google Cloud Console:

1. **Places API** - For address autocomplete
2. **Geocoding API** - For converting addresses to coordinates
3. **Maps JavaScript API** - For the maps interface

## Setup Steps

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID

### 2. Enable Required APIs

1. Navigate to **APIs & Services** > **Library**
2. Search for and enable each of these APIs:
   - Places API
   - Geocoding API
   - Maps JavaScript API

### 3. Create API Credentials

1. Navigate to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API Key**
3. Copy the API key

### 4. Restrict Your API Key (IMPORTANT for security)

#### Application Restrictions
1. Click on your API key to edit it
2. Under **Application restrictions**, select **HTTP referrers (web sites)**
3. Add your domains:
   ```
   localhost:3000/*
   yourdomain.com/*
   *.yourdomain.com/*
   ```

#### API Restrictions
1. Under **API restrictions**, select **Restrict key**
2. Select only these APIs:
   - Places API
   - Geocoding API
   - Maps JavaScript API

### 5. Configure Billing

Google Maps Platform requires a billing account:

1. Navigate to **Billing** in Google Cloud Console
2. Link a billing account to your project
3. Set up budget alerts (recommended: 50 EUR/month for MVP)

**Pricing Notes:**
- First $200/month is free (Google Cloud free tier)
- Places Autocomplete: ~$2.83 per 1,000 requests
- Geocoding: ~$5 per 1,000 requests
- For MVP with ~1000 users: ~10-20 EUR/month estimated

### 6. Add API Key to Environment Variables

Create or update `.env.local` in the root of the web project:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

**Important:** Never commit this file to Git. It's already in `.gitignore`.

### 7. Add Google Maps Script to Your App

Add the following to your `app/layout.tsx`:

```typescript
import { GoogleMapsScript } from "@/components/google-maps-autocomplete";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <GoogleMapsScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Usage in Address Management

The Google Maps autocomplete is integrated into the address management page:

```typescript
import GoogleMapsAutocomplete, {
  GoogleMapsAddress,
} from "@/components/google-maps-autocomplete";

function AddressForm() {
  const handleAddressSelect = (address: GoogleMapsAddress) => {
    console.log("Selected address:", address);
    // Address contains:
    // - street
    // - streetNumber
    // - city
    // - county
    // - postalCode
    // - country
    // - latitude
    // - longitude
    // - formattedAddress
  };

  return (
    <GoogleMapsAutocomplete
      onAddressSelect={handleAddressSelect}
      placeholder="Start typing your address..."
    />
  );
}
```

## Romanian Market Configuration

The autocomplete is configured specifically for the Romanian market:

- **Country restriction**: Only Romanian addresses (`componentRestrictions: { country: "ro" }`)
- **Address types**: Only full addresses, not businesses or landmarks
- **Language**: Defaults to Romanian based on user locale

## Testing

### Local Testing

1. Ensure `.env.local` has your API key
2. Run the development server: `npm run dev`
3. Navigate to `/dashboard/addresses`
4. Try typing a Bucharest address like "Strada Victoriei 12"

### Test Addresses for Romania

Use these addresses to test the autocomplete:

- `Strada Victoriei 12, București`
- `Bulevardul Unirii 45, București`
- `Calea Victoriei 155, București`
- `Piața Universității 1, București`

## Troubleshooting

### "Google Maps JavaScript API not loaded"

**Solution:** Make sure `GoogleMapsScript` is added to your layout and the API key is set in `.env.local`.

### Autocomplete not showing suggestions

**Possible causes:**
1. API key restrictions are too strict
2. Places API is not enabled
3. Billing is not set up
4. Browser is blocking the script (check console)

### "This API project is not authorized to use this API"

**Solution:**
1. Go to Google Cloud Console
2. Ensure Places API is enabled
3. Check your API key restrictions

### Addresses outside Romania appearing

**Solution:** The component already restricts to Romania. If this happens:
1. Check the component code for `componentRestrictions: { country: "ro" }`
2. Clear browser cache
3. Verify you're using the latest version of the component

## Security Best Practices

1. **Never expose API key in client-side code** - Use environment variables
2. **Restrict API key** - Add HTTP referrer restrictions
3. **Limit API access** - Only enable required APIs
4. **Monitor usage** - Set up budget alerts in Google Cloud
5. **Rotate keys** - If compromised, create new key and update environment

## Cost Optimization

To minimize costs during MVP:

1. **Cache results** - Store selected addresses in database
2. **Implement debouncing** - Wait 300ms before triggering autocomplete
3. **Use session tokens** - Group requests in sessions (already implemented in component)
4. **Set budget limits** - Use Google Cloud budget alerts

## Production Checklist

Before deploying to production:

- [ ] API key is stored in environment variables (not in code)
- [ ] API key restrictions are configured
- [ ] Billing account is set up with alerts
- [ ] All required APIs are enabled
- [ ] HTTP referrers include production domain
- [ ] Budget alerts are configured (recommended: 100 EUR/month)
- [ ] Error handling is implemented in the component
- [ ] Usage monitoring is set up in Google Cloud Console

## Support

For issues with Google Maps Platform:
- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Places API Documentation](https://developers.google.com/maps/documentation/places/web-service)
- [Google Cloud Support](https://cloud.google.com/support)
