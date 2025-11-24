import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Security headers to protect against ClickJacking attacks and information leakage
  async headers() {
    // Determine API endpoint based on environment
    const apiEndpoint = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
      ? 'https://api.yourdomain.com'
      : process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8080'

    const wsEndpoint = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
      ? 'wss://api.yourdomain.com'
      : process.env.NEXT_PUBLIC_WS_ENDPOINT || (apiEndpoint?.replace(/^http/, 'ws')) || 'ws://localhost:8080'

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://images.unsplash.com https://lh3.googleusercontent.com https://maps.googleapis.com https://maps.gstatic.com; connect-src 'self' ${apiEndpoint} ${wsEndpoint} https://accounts.google.com https://maps.googleapis.com; frame-src 'self' https://accounts.google.com; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self' https://accounts.google.com;`,
          },
          // Remove server information headers
          {
            key: 'X-Powered-By',
            value: '',
          },
          {
            key: 'Server',
            value: '',
          },
          // Additional security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
