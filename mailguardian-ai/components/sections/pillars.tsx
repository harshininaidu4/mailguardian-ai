'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Check, Fingerprint, Globe2 } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { SpotlightCard } from '@/components/shared/spotlight-card';
import { pillars } from '@/lib/content';

function DetectionIcon() {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl border border-primary/60"
        animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
      />
      <BrainCircuit className="h-8 w-8" aria-hidden="true" />
    </div>
  );
}

function GeoIcon() {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
      <Globe2 className="h-8 w-8" aria-hidden="true" />
      <motion.span
        aria-hidden="true"
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_hsl(var(--accent))]" />
      </motion.span>
    </div>
  );
}

function ForensicIcon() {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-success/30 bg-success/10 text-success">
      <Fingerprint className="h-8 w-8" aria-hidden="true" />
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-1.5 h-0.5 rounded-full bg-success shadow-[0_0_10px_hsl(var(--success))]"
        animate={{ top: ['12%', '84%', '12%'] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

const icons = { detection: DetectionIcon, geolocation: GeoIcon, forensics: ForensicIcon } as const;

export function Pillars() {
  return (
    <section id="platform" aria-labelledby="pillars-heading" className="relative py-24 lg:py-32">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="pillars-heading"
            align="left"
            title="Three engines, one verdict you can defend"
            description="Most tools tell you a message is bad. MailGuardian tells you why, where it came from, and gives you the evidence to act on it."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = icons[pillar.id];
            return (
              <Reveal key={pillar.id} delay={i * 0.08} className="h-full">
                <SpotlightCard className="h-full">
                  <article className="flex h-full flex-col p-8">
                    <Icon />
                    <h3 className="mt-7 text-2xl font-semibold leading-tight">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                    <ul className="mt-6 space-y-3 text-sm">
                      {pillar.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-foreground/90">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-8">
                      <div className="border-t border-border/70 pt-5">
                        <p className="font-display text-3xl font-bold tracking-tight">{pillar.metric.value}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{pillar.metric.label}</p>
                      </div>
                    </div>
                  </article>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
