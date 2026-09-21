import { FeaturesGrid } from '@/components/sections/features-grid';
import { Integrations } from '@/components/sections/integrations';
import { Pillars } from '@/components/sections/pillars';

export default function FeaturesPage() {
  return (
    <>
      <Pillars />
      <FeaturesGrid />
      <Integrations />
    </>
  );
}
