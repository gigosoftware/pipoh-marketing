import type { Metadata } from "next";
import { PricingHero } from "@/components/pricing/pricing-hero";
import { PricingComparison } from "@/components/pricing/pricing-comparison";
import { HowPipsWork } from "@/components/pricing/how-pips-work";
import { PricingFAQ } from "@/components/pricing/pricing-faq";
import { PricingContact } from "@/components/pricing/pricing-contact";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Pricing — Pipoh",
  description:
    "Honest pricing for Pipoh. Pre-paid Pips, no surprise bills. Start free with 200 Pips welcome.",
  openGraph: {
    title: "Pipoh — Honest pricing for creative AI",
    description: "Pre-paid Pips. See the cost before you click. Cancel any time.",
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <PricingHero />
      <PricingComparison />
      <HowPipsWork />
      <PricingFAQ />
      <PricingContact />
      <FinalCTA />
      <Footer />
    </main>
  );
}
