'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { Check } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ANNUAL_DISCOUNT, pricingTiers, type PricingTier } from '@/lib/content';
import { cn } from '@/lib/utils';

function formatPrice(value: number): string {
  return Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;
}

function TierCard({ tier, annual }: { tier: PricingTier; annual: boolean }) {
  const price = tier.monthly === null ? null : annual ? tier.monthly * (1 - ANNUAL_DISCOUNT) : tier.monthly;

  return (
    <div
      className={cn(
        'glass relative flex h-full flex-col rounded-2xl p-7',
        tier.popular && 'border-primary/50 shadow-[0_0_60px_-24px_hsl(var(--primary)/0.65)]',
      )}
    >
      {tier.popular ? (
        <Badge variant="gradient" className="absolute -top-3 left-1/2 -translate-x-1/2">
          MOST POPULAR
        </Badge>
      ) : null}

      <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
      <p className="mt-2 min-h-[3.75rem] text-sm leading-relaxed text-muted-foreground">{tier.description}</p>

      <div className="mt-6 min-h-[5.5rem]">
        {price === null ? (
          <p className="font-display text-4xl font-bold tracking-tight">Custom</p>
        ) : (
          <>
            <p className="flex items-baseline gap-1.5">
              <span className="font-display text-5xl font-bold tracking-tight tabular-nums">{formatPrice(price)}</span>
              <span className="text-sm text-muted-foreground">per user / month</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground" aria-live="polite">
              {annual ? `Billed annually. You save ${Math.round(ANNUAL_DISCOUNT * 100)}%.` : 'Billed monthly.'}
            </p>
          </>
        )}
        <p className="mt-2 text-xs font-medium text-foreground/80">{tier.users}</p>
      </div>

      <Button asChild variant={tier.popular ? 'default' : 'outline'} size="lg" className="mt-6 w-full">
        <Link href={tier.href}>{tier.cta}</Link>
      </Button>

      <div className="mt-8 border-t border-border/70 pt-6">
        {tier.featuresIntro ? <p className="mb-4 text-sm font-medium">{tier.featuresIntro}</p> : null}
        <ul className="space-y-3">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const switchId = useId();

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-24 lg:py-32">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="pricing-heading"
            eyebrow="Pricing"
            title="Simple per-user pricing that scales with your team"
            description="Every plan starts with a 14-day free trial and no credit card."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-10 flex items-center justify-center gap-4">
          <label htmlFor={switchId} className={cn('cursor-pointer text-sm font-medium transition-colors', !annual ? 'text-foreground' : 'text-muted-foreground')}>
            Monthly
          </label>
          <Switch id={switchId} checked={annual} onCheckedChange={setAnnual} aria-label="Bill annually and save 20 percent" />
          <span className={cn('flex items-center gap-2 text-sm font-medium transition-colors', annual ? 'text-foreground' : 'text-muted-foreground')}>
            <button type="button" onClick={() => setAnnual(true)} className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Annual
            </button>
            <Badge variant="success">Save {Math.round(ANNUAL_DISCOUNT * 100)}%</Badge>
          </span>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 0.08} className="h-full">
              <TierCard tier={tier} annual={annual} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">Prices in USD, excluding taxes. Annual billing shown as an effective monthly rate per user.</p>
      </div>
    </section>
  );
}
