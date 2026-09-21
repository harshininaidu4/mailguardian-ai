import { DashboardPreview } from '@/components/sections/dashboard-preview';
import { FeaturesGrid } from '@/components/sections/features-grid';
import { FinalCta } from '@/components/sections/final-cta';
import { Hero } from '@/components/sections/hero';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Integrations } from '@/components/sections/integrations';
import { Pillars } from '@/components/sections/pillars';
import { Pricing } from '@/components/sections/pricing';
import { Problem } from '@/components/sections/problem';
import { TrustBar } from '@/components/sections/trust-bar';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Problem />
      <Pillars />
      <HowItWorks />
      <DashboardPreview />
      <FeaturesGrid />
      <Integrations />
      <Pricing />
      <FinalCta />
    </>
  );
}
