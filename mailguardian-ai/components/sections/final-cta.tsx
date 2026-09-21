import { Reveal } from '@/components/shared/reveal';
import { LeadForm } from '@/components/shared/lead-form';
import { siteConfig } from '@/lib/config';

export function FinalCta() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 lg:py-32">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card/60 px-6 py-16 text-center backdrop-blur sm:px-12 lg:py-20">
            <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,hsl(var(--primary)/0.18),transparent),radial-gradient(50%_70%_at_90%_100%,hsl(var(--accent)/0.2),transparent)]"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 id="contact-heading" className="text-balance text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">
                Ready to secure your inbox?
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Start a 14-day trial with no credit card, or talk to our team about a pilot on your own mail flow.
              </p>
              <div className="mx-auto mt-9 max-w-xl text-left">
                <LeadForm
                  source="trial"
                  label="Work email address"
                  placeholder="Work email"
                  buttonLabel="Start free trial"
                  successMessage="Thanks. Check your inbox for next steps."
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Prefer to talk first? Email{' '}
                <a href={`mailto:${siteConfig.emails.sales}`} className="text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {siteConfig.emails.sales}
                </a>
                .
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
