import { Reveal } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { SpotlightCard } from '@/components/shared/spotlight-card';
import { features } from '@/lib/content';

export function FeaturesGrid() {
  return (
    <section id="features" aria-labelledby="features-heading" className="py-24 lg:py-32">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="features-heading"
            eyebrow="Features"
            title="Everything a security team needs, in one inbox layer"
            description="Detection, enrichment and response share one data model, so an alert already carries the evidence an analyst would have gone looking for."
          />
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <li key={feature.title}>
              <Reveal delay={(i % 3) * 0.07} className="h-full">
                <SpotlightCard className="h-full p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold leading-snug">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
