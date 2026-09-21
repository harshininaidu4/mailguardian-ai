import { AnimatedCounter } from '@/components/shared/animated-counter';
import { Reveal } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { Card } from '@/components/ui/card';
import { problemStats } from '@/lib/content';

export function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-heading" className="py-24 lg:py-32">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="problem-heading"
            title="Email is still the front door for attackers"
            description="Firewalls and endpoint tools guard the perimeter. Attackers just send a message that asks someone to open the gate."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {problemStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="h-full">
              <Card className="relative h-full overflow-hidden p-8">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                <stat.icon className="h-7 w-7 text-primary" aria-hidden="true" />
                <p className="mt-6 font-display text-5xl font-bold tracking-tight sm:text-6xl">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
                </p>
                <p className="mt-2 font-display text-lg font-medium leading-snug">{stat.label}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{stat.detail}</p>
                <p className="mt-6 border-t border-border/70 pt-4 text-xs text-muted-foreground/80">Source: {stat.source}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
