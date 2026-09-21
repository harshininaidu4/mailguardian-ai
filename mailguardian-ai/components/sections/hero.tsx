'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bug,
  Fish,
  Globe2,
  Mail,
  MailCheck,
  MailWarning,
  Paperclip,
  Play,
  ShieldAlert,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LiveCounter } from '@/components/shared/live-counter';
import { MatrixRain } from '@/components/shared/matrix-rain';
import { WorldMap } from '@/components/shared/world-map';
import { cn } from '@/lib/utils';

const floaters: { Icon: LucideIcon; className: string; delay: number; duration: number; tone: string }[] = [
  { Icon: Mail, className: 'left-[5%] top-[18%]', delay: 0, duration: 7, tone: 'text-primary' },
  { Icon: Fish, className: 'left-[12%] top-[58%] hidden md:block', delay: 1.2, duration: 8, tone: 'text-destructive' },
  { Icon: Paperclip, className: 'left-[27%] top-[9%] hidden lg:block', delay: 0.6, duration: 9, tone: 'text-accent' },
  { Icon: ShieldAlert, className: 'right-[6%] top-[22%]', delay: 0.9, duration: 7.5, tone: 'text-warning' },
  { Icon: MailCheck, className: 'right-[13%] top-[60%] hidden md:block', delay: 2, duration: 8.5, tone: 'text-success' },
  { Icon: Bug, className: 'right-[28%] top-[10%] hidden lg:block', delay: 0.3, duration: 9.5, tone: 'text-destructive' },
  { Icon: MailWarning, className: 'left-[3%] top-[80%] hidden xl:block', delay: 1.6, duration: 8, tone: 'text-warning' },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      {/* Background stack */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <MatrixRain className="opacity-[0.09] [mask-image:radial-gradient(ellipse_at_50%_30%,#000_10%,transparent_70%)]" />
        <div className="absolute inset-x-0 top-24 mx-auto w-[min(1200px,140%)] opacity-70 sm:top-16">
          <WorldMap variant="backdrop" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
        {floaters.map(({ Icon, className, delay, duration, tone }, i) => (
          <motion.div
            key={i}
            className={cn('absolute', className)}
            animate={{ y: [0, -18, 0], rotate: [-5, 5, -5] }}
            transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-card/50 backdrop-blur', tone)}>
              <Icon className="h-5 w-5" />
            </span>
          </motion.div>
        ))}
      </div>

      <div className="container pb-20 pt-16 text-center sm:pt-24 lg:pb-28 lg:pt-28">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link href="/#how-it-works" className="inline-block rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Badge variant="outline" className="gap-2 px-3 py-1 text-sm backdrop-blur hover:border-primary/50 hover:text-foreground">
              <Globe2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              New: impossible-travel detection for every sender
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Badge>
          </Link>
        </motion.div>

        <motion.h1
          id="hero-heading"
          className="mx-auto mt-8 max-w-4xl text-balance text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          Stop Email Threats <span className="text-gradient">Before They Reach Your Inbox</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
        >
          MailGuardian fuses machine learning, IP geolocation and digital forensics to catch phishing, BEC, malware and spear-phishing in under 50
          milliseconds, then hands your SOC the evidence to prove it.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/#contact">
              Start Free Trial
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link href="/#demo">
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Watch 2-min Demo
            </Link>
          </Button>
        </motion.div>

        <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
          <LiveCounter />
        </motion.div>

        <ScanCard />
      </div>
    </section>
  );
}

/** Hero centrepiece: a BEC email being caught mid-scan, with the evidence that convicted it. */
function ScanCard() {
  const circumference = 2 * Math.PI * 30;
  const riskScore = 97;

  return (
    <motion.figure
      className="glass relative mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl text-left shadow-[0_0_80px_-30px_hsl(var(--primary)/0.5)]"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      aria-label="Example: a business email compromise attempt caught by MailGuardian"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-border/70 px-4 py-3" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">inbound / scanning message 8f3a…c21</span>
      </div>

      <div className="grid md:grid-cols-[1.35fr_1fr]">
        {/* Message */}
        <div className="relative border-b border-border/70 p-6 md:border-b-0 md:border-r">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-primary/15 to-transparent"
            animate={{ top: ['-15%', '100%'] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
          />
          <dl className="space-y-1.5 font-mono text-xs">
            <div className="flex gap-3">
              <dt className="w-14 shrink-0 text-muted-foreground">From</dt>
              <dd className="break-all text-foreground">
                Sam Whitaker &lt;ceo.office@<span className="rounded bg-destructive/20 px-1 text-destructive">northbridge-exec.co</span>&gt;
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-14 shrink-0 text-muted-foreground">Subject</dt>
              <dd className="text-foreground">Urgent: wire transfer needed before 3pm</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-14 shrink-0 text-muted-foreground">Origin</dt>
              <dd className="text-foreground">203.0.113.42 · Lagos, NG</dd>
            </div>
          </dl>
          <p className="mt-5 text-sm leading-relaxed text-foreground/90">
            Hi Alex, I’m in a board meeting and can’t take calls. I need you to process a{' '}
            <mark className="rounded bg-warning/20 px-1 text-warning">confidential wire of $184,500</mark> today.{' '}
            <mark className="rounded bg-warning/20 px-1 text-warning">Reply only to this address</mark> and keep it between us.
          </p>
        </div>

        {/* Verdict */}
        <div className="flex flex-col justify-between gap-6 p-6">
          <div className="flex items-center gap-5">
            <div className="relative h-[72px] w-[72px] shrink-0">
              <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90" aria-hidden="true">
                <circle cx="36" cy="36" r="30" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                <motion.circle
                  cx="36"
                  cy="36"
                  r="30"
                  fill="none"
                  stroke="hsl(var(--destructive))"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference * (1 - riskScore / 100) }}
                  transition={{ duration: 1.4, delay: 1, ease: 'easeOut' }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-display text-xl font-bold tabular-nums">{riskScore}</span>
            </div>
            <div>
              <Badge variant="danger">Business email compromise</Badge>
              <p className="mt-2 font-display text-lg font-semibold">Quarantined in 41 ms</p>
              <p className="text-sm text-muted-foreground">SOC alerted with full evidence</p>
            </div>
          </div>

          <ul className="space-y-2 text-sm text-muted-foreground">
            {['Lookalike of an executive domain', 'SPF and DMARC failed, DKIM missing', 'First contact from this region', 'Payment urgency plus secrecy language'].map((signal) => (
              <li key={signal} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" aria-hidden="true" />
                {signal}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.figure>
  );
}
