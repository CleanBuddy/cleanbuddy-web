import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ApolloClientProvider } from "@/components/providers/apollo-provider";
import { DialogProvider } from "@/components/providers/dialog-provider";
import { TeamProvider } from "@/components/providers/team-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: "SaaS Starter - Next.js Template",
  keywords: ["SaaS", "Next.js", "React", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Your Company" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SaaS Starter",
    url: "./",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
            <ApolloClientProvider>
              <TeamProvider>
                <DialogProvider>
                  {children}
                </DialogProvider>
              </TeamProvider>
            </ApolloClientProvider>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
