import { Hero } from "@/components/hero/hero";
import { Pain } from "@/components/sections/pain";
import { PipohWay } from "@/components/sections/pipoh-way";
import { Showcase } from "@/components/sections/showcase";
import { Pricing } from "@/components/sections/pricing";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Product structured data · SoftwareApplication (Day 48) */}
      <JsonLd data={softwareApplicationSchema()} />
      <Hero />
      <Pain />
      <PipohWay />
      <Showcase />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
