import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, webSiteSchema } from "@/lib/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Pipoh — Where pixels become art.",
  description:
    "The creative studio with premium AI models — curated, not catalogued. Image, video, audio, edit, upscale. All in one flow.",
  metadataBase: new URL("https://pipoh.ai"),
  openGraph: {
    title: "Pipoh — Where pixels become art.",
    description:
      "Premium AI models, curated by humans. Image, video, audio, edit, upscale. All in one creative studio.",
    url: "https://pipoh.ai",
    siteName: "Pipoh",
    images: [{ url: "/og/og-default.png", width: 1200, height: 630, alt: "Pipoh — Where pixels become art." }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pipoh — Where pixels become art.",
    description: "Premium AI creative studio. Curated, not catalogued.",
    images: ["/og/og-default.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Sitewide structured data · Organization + WebSite (Day 48) */}
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        {children}
      </body>
    </html>
  );
}
