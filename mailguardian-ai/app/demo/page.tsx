import { DashboardPreview } from '@/components/sections/dashboard-preview';
import { SenderLocationLookup } from '@/components/dashboard/sender-location-lookup';
import { FinalCta } from '@/components/sections/final-cta';

export default function DemoPage() {
  return (
    <>
      <DashboardPreview />
      <div className="container pb-24 lg:pb-32">
        <SenderLocationLookup />
      </div>
      <FinalCta />
    </>
  );
}
