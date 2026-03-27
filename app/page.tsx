import { Ticker } from '@/components/shared/Ticker';
import { HeroSection } from '@/components/shared/HeroSection';
import { LivePreview } from '@/components/shared/LivePreview';
import { FeaturesGrid } from '@/components/shared/FeaturesGrid';
import { PricingMatrix } from '@/components/shared/PricingMatrix';
import { FinalCTA } from '@/components/shared/FinalCTA';
import { Footer } from '@/components/shared/Footer';

export default function Home() {
  return (
    <>
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black border-b border-black min-h-[90vh]">
        <HeroSection />
        <LivePreview />
      </div>

      <Ticker text="INDUSTRIAL STRENGTH EMAIL INFRASTRUCTURE  ///  SUB-SECOND GLOBAL DELIVERY  ///  ZERO LATENCY ENGINE  ///  BUILT FOR DEVELOPERS BY STRUCUREO" />

      <FeaturesGrid />

      <PricingMatrix />

      <FinalCTA />

      <Footer />
    </>
  );
}
