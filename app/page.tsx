import { Hero } from "@/components/hero/hero";
import { Pain } from "@/components/sections/pain";
import { PipohWay } from "@/components/sections/pipoh-way";
import { Showcase } from "@/components/sections/showcase";
import { Pricing } from "@/components/sections/pricing";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
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
