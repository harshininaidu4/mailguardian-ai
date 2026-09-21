import { Quote } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { testimonials } from '@/lib/content';

/** Fictional customers. Replace with approved quotes, names and companies before publishing. */
export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="py-24 lg:py-32">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="testimonials-heading"
            eyebrow="Customers"
            title="Security leaders on what changed"
            description="The teams that switch tend to mention the same two things: faster triage and evidence they can hand straight to legal."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="h-full">
              <figure className="glass flex h-full flex-col rounded-2xl p-7">
                <Quote className="h-7 w-7 text-accent" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 text-pretty text-base leading-relaxed text-foreground/90">{t.quote}</blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-border/70 pt-5">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-accent/30 font-display text-sm font-semibold ring-1 ring-border"
                  >
                    {t.initials}
                  </span>
                  <span className="text-sm">
                    <span className="block font-medium">{t.name}</span>
                    <span className="block text-muted-foreground">
                      {t.role}, {t.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
