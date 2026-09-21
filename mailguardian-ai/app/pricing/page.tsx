import { Faq } from '@/components/sections/faq';
import { FinalCta } from '@/components/sections/final-cta';
import { Pricing } from '@/components/sections/pricing';
import { Testimonials } from '@/components/sections/testimonials';

export default function PricingPage() {
  return (
    <>
      <Pricing />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
