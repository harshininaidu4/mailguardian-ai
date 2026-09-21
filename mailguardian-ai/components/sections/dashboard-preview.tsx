'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { Activity, Gauge, Globe2, MailCheck } from 'lucide-react';
import { BlockedTicker } from '@/components/dashboard/blocked-ticker';
import { ThreatDetail } from '@/components/dashboard/threat-detail';
import { ThreatDonut } from '@/components/dashboard/threat-donut';
import { ThreatFeed } from '@/components/dashboard/threat-feed';
import { ThreatsLineChart } from '@/components/dashboard/threats-line-chart';
import { Reveal } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { WorldMap } from '@/components/shared/world-map';
import { Badge } from '@/components/ui/badge';
import {
  BLOCKED_TODAY_BASE,
  SCANNED_TODAY_BASE,
  attackOrigins,
  createThreatEvent,
  severityColor,
  threatTemplates,
  type Severity,
  type ThreatEvent,
} from '@/lib/mock-data';
import { cn, formatNumber, randInt } from '@/lib/utils';

const MAX_ROWS = 7;
const FEED_INTERVAL_MS = 3200;
const KPI_INTERVAL_MS = 1000;

const severityLegend: { severity: Severity; label: string }[] = [
  { severity: 'critical', label: 'Critical' },
  { severity: 'high', label: 'High' },
  { severity: 'medium', label: 'Medium' },
];

const topOrigins = [...attackOrigins].sort((a, b) => b.count - a.count).slice(0, 4);

function Panel({
  title,
  description,
  aside,
  className,
  bodyClassName,
  children,
}: {
  title: string;
  description?: string;
  aside?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={title} className={cn('glass flex flex-col rounded-2xl', className)}>
      <header className="flex items-start justify-between gap-3 px-4 pb-3 pt-4">
        <div>
          <h3 className="font-display text-sm font-semibold">{title}</h3>
          {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
        </div>
        {aside}
      </header>
      <div className={cn('flex-1', bodyClassName)}>{children}</div>
    </section>
  );
}

function Kpi({ icon: Icon, label, value, note }: { icon: typeof Activity; label: string; value: string; note: string }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-3 font-mono text-2xl font-semibold tabular-nums tracking-tight sm:text-[1.7rem]">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

export function DashboardPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: '-10% 0px -10% 0px' });
  const reduceMotion = useReducedMotion();

  const [events, setEvents] = useState<ThreatEvent[]>([]);
  const [pinned, setPinned] = useState<ThreatEvent | null>(null);
  const [paused, setPaused] = useState(false);
  const [blocked, setBlocked] = useState(BLOCKED_TODAY_BASE);
  const [scanned, setScanned] = useState(SCANNED_TODAY_BASE);

  const seq = useRef(0);
  const cursor = useRef(0);

  const nextEvent = useCallback((live: boolean, detectedAt: number) => {
    const template = threatTemplates[cursor.current % threatTemplates.length];
    cursor.current += 1;
    seq.current += 1;
    return createThreatEvent(template, seq.current, detectedAt, live);
  }, []);

  // Seed the feed on the client only, so server and client markup never disagree on timestamps.
  useEffect(() => {
    const now = Date.now();
    const seed = Array.from({ length: 5 }, (_, i) => nextEvent(false, now - (i + 1) * 4200)).reverse();
    setEvents(seed);
  }, [nextEvent]);

  // People who prefer reduced motion get a feed that starts paused; they can resume it themselves.
  useEffect(() => {
    if (reduceMotion) setPaused(true);
  }, [reduceMotion]);

  const streaming = inView && !paused;

  useEffect(() => {
    if (!streaming) return;
    const id = window.setInterval(() => {
      const event = nextEvent(true, Date.now());
      setEvents((current) => [event, ...current].slice(0, MAX_ROWS));
    }, FEED_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [streaming, nextEvent]);

  useEffect(() => {
    if (!streaming) return;
    const id = window.setInterval(() => {
      const blockedStep = randInt(4, 14);
      setBlocked((c) => c + blockedStep);
      setScanned((c) => c + blockedStep * randInt(38, 46));
    }, KPI_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [streaming]);

  const active = pinned ?? events[0] ?? null;

  const handleSelect = useCallback((event: ThreatEvent) => {
    setPinned((current) => (current?.id === event.id ? null : event));
  }, []);

  const totalOrigins = useMemo(() => attackOrigins.length, []);

  return (
    <section ref={sectionRef} id="demo" aria-labelledby="demo-heading" className="relative py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/3 h-[420px] bg-[radial-gradient(60%_60%_at_50%_50%,hsl(var(--accent)/0.10),transparent)]" />
      <div className="container relative">
        <Reveal>
          <SectionHeading
            id="demo-heading"
            eyebrow="Live demo"
            title="Watch the SOC dashboard work in real time"
            description="Every message below is being scored, geolocated and actioned as you watch. Pick any row to open the forensic detail behind the verdict."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div className="overflow-hidden rounded-3xl border border-border bg-background/60 shadow-[0_0_80px_-30px_hsl(var(--primary)/0.45)] backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-semibold">Threat operations</span>
                <span className="hidden text-xs text-muted-foreground sm:inline">Last 24 hours</span>
              </div>
              <Badge variant="outline">Sample data</Badge>
            </div>

            <BlockedTicker paused={paused || !inView} />

            <div className="space-y-4 p-4 sm:p-5">
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <Kpi icon={MailCheck} label="Threats blocked today" value={formatNumber(blocked)} note="Across all protected mailboxes" />
                <Kpi icon={Activity} label="Messages scanned" value={formatNumber(scanned)} note="Inline, before delivery" />
                <Kpi icon={Gauge} label="Median verdict time" value="41 ms" note="Ingest to action" />
                <Kpi icon={Globe2} label="Active attack origins" value={String(totalOrigins)} note="Cities in the last 24 hours" />
              </div>

              <div className="grid gap-4 lg:grid-cols-12">
                <Panel
                  title="Attack origins"
                  description="Where malicious mail is sent from, and which site it targets"
                  className="lg:col-span-8"
                  bodyClassName="px-3 pb-4"
                  aside={
                    <ul className="flex flex-wrap justify-end gap-x-3 gap-y-1" aria-label="Severity legend">
                      {severityLegend.map(({ severity, label }) => (
                        <li key={severity} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ backgroundColor: severityColor[severity] }} />
                          {label}
                        </li>
                      ))}
                    </ul>
                  }
                >
                  <WorldMap variant="interactive" />
                  <ul className="mt-3 grid grid-cols-2 gap-2 px-1 sm:grid-cols-4" aria-label="Top attack origins by volume">
                    {topOrigins.map((origin) => (
                      <li key={origin.id} className="rounded-lg border border-border/70 bg-white/[0.02] px-3 py-2">
                        <p className="text-xs text-muted-foreground">
                          {origin.city}, {origin.cc}
                        </p>
                        <p className="font-mono text-sm font-semibold tabular-nums">{formatNumber(origin.count)}</p>
                      </li>
                    ))}
                  </ul>
                </Panel>

                <Panel title="Threat types" description="Share of blocked messages" className="lg:col-span-4" bodyClassName="px-4 pb-4">
                  <ThreatDonut />
                </Panel>

                <Panel
                  title="Live threat feed"
                  description="Newest first"
                  className="lg:col-span-8"
                  bodyClassName="pb-2"
                >
                  {events.length === 0 ? (
                    <div className="px-4 pb-4" role="status" aria-live="polite">
                      <p className="text-sm text-muted-foreground">Connecting to the sample stream…</p>
                      <div className="mt-4 space-y-3" aria-hidden="true">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="h-10 animate-pulse rounded-md bg-white/[0.04] motion-reduce:animate-none" />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <ThreatFeed
                      events={events}
                      selectedId={active?.id ?? ''}
                      onSelect={handleSelect}
                      paused={paused}
                      onTogglePause={() => setPaused((p) => !p)}
                    />
                  )}
                </Panel>

                <Panel
                  title="Forensic detail"
                  description={pinned ? 'Showing your selection' : 'Following the live feed'}
                  className="lg:col-span-4"
                  bodyClassName="px-4 pb-5"
                >
                  {active ? (
                    <ThreatDetail event={active} pinned={pinned !== null} />
                  ) : (
                    <p className="text-sm text-muted-foreground">Waiting for the first message.</p>
                  )}
                </Panel>

                <Panel title="Threats blocked, last 7 days" description="Daily total across all protected mailboxes" className="lg:col-span-12" bodyClassName="px-4 pb-4">
                  <ThreatsLineChart />
                </Panel>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Simulated data for demonstration. Every IP address comes from a reserved documentation range and every domain is invented.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
