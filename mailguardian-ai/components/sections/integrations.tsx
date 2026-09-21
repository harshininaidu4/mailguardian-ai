import { Reveal } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { integrations } from '@/lib/content';

/**
 * Text tiles with generic icons on purpose. Before launch, replace each icon with the vendor's
 * official brand asset and follow that vendor's brand guidelines.
 */
export function Integrations() {
  return (
    <section id="integrations" aria-labelledby="integrations-heading" className="py-24 lg:py-32">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="integrations-heading"
            eyebrow="Integrations"
            title="Plugs into the stack you already run"
            description="Connect mail platforms in minutes, then route verdicts to the SIEM, endpoint, identity and ticketing tools your team lives in."
          />
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {integrations.map((item, i) => (
            <li key={item.name}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <div className="glass group flex h-full items-center gap-4 rounded-2xl p-5 transition-colors hover:border-primary/40">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-white/[0.03] text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-base font-semibold">{item.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{item.category}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted-foreground">
            Need something else? The REST API and webhooks cover the rest, and IOCs export as JSON or STIX 2.1.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
