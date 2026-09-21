'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { steps } from '@/lib/content';

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="relative border-y border-border/60 bg-white/[0.015] py-24 lg:py-32">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="how-heading"
            title="From inbound message to sealed case file in seconds"
            description="No MX changes and no mail-flow downtime. Connect through your email platform’s API and protection starts on the next message."
          />
        </Reveal>

        <div className="relative mt-20">
          {/* Animated connector for md and up */}
          <div aria-hidden="true" className="absolute left-[16.6%] right-[16.6%] top-7 hidden h-px md:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-primary via-accent to-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 1.3, ease: 'easeInOut' }}
            />
            <motion.span
              className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-primary shadow-[0_0_14px_hsl(var(--primary))]"
              initial={{ left: '0%', opacity: 0 }}
              animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3.4, delay: 1.4, repeat: Infinity, repeatDelay: 0.8, ease: 'linear' }}
            />
          </div>

          <ol className="grid gap-14 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <li key={step.title} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
                {i < steps.length - 1 ? (
                  <span aria-hidden="true" className="absolute bottom-[-3.5rem] left-7 top-16 w-px bg-gradient-to-b from-primary/60 to-accent/30 md:hidden" />
                ) : null}
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-background text-primary shadow-[0_0_32px_-8px_hsl(var(--primary)/0.7)]">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-xs font-bold text-primary-foreground">
                    <span className="sr-only">Step </span>
                    {i + 1}
                  </span>
                </div>
                <Reveal delay={i * 0.12} className="md:mt-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:mx-auto md:max-w-xs">{step.description}</p>
                  <code className="mt-4 inline-block rounded-md border border-border bg-background/70 px-2.5 py-1 font-mono text-xs text-primary">
                    {step.code}
                  </code>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
