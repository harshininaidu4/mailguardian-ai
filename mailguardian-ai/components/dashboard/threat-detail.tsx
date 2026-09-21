import { Check, Minus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RiskMeter } from '@/components/dashboard/risk-meter';
import { pseudoHash, type AuthResult, type ThreatEvent } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

function AuthChip({ label, result }: { label: string; result: AuthResult }) {
  const Icon = result === 'pass' ? Check : result === 'fail' ? X : Minus;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[11px]',
        result === 'pass' && 'border-success/30 bg-success/10 text-success',
        result === 'fail' && 'border-destructive/30 bg-destructive/10 text-destructive',
        result === 'none' && 'border-border bg-white/[0.02] text-muted-foreground',
      )}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {label}
      <span className="sr-only">: {result}</span>
    </span>
  );
}

export function ThreatDetail({ event, pinned }: { event: ThreatEvent; pinned: boolean }) {
  const timeline = [
    { at: '0 ms', title: 'Message received', detail: 'Intercepted through the mailbox API' },
    { at: `${event.latencyMs} ms`, title: 'AI verdict', detail: `${event.category}, risk score ${event.risk}` },
    { at: `${event.latencyMs + 12} ms`, title: 'Geolocation enriched', detail: `${event.geo.city}, ${event.geo.cc}` },
    { at: `${event.latencyMs + 27} ms`, title: event.action, detail: 'Removed from the recipient mailbox' },
    { at: '1.4 s', title: 'SOC alerted', detail: 'Slack, Splunk and ServiceNow notified' },
  ];

  return (
    <div className="space-y-5">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={event.category === 'Spam' ? 'outline' : event.category === 'Malware' ? 'danger' : event.category === 'BEC' ? 'violet' : 'default'}>
            {event.category}
          </Badge>
          {pinned ? <span className="text-[11px] text-muted-foreground">Pinned. Select again to follow the live feed.</span> : null}
        </div>
        <p className="mt-2 font-display text-base font-semibold leading-snug">{event.subject}</p>
        <p className="mt-1 break-all font-mono text-xs text-muted-foreground">{event.sender}</p>
        <RiskMeter risk={event.risk} className="mt-3" />
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground">Authentication</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <AuthChip label="SPF" result={event.auth.spf} />
          <AuthChip label="DKIM" result={event.auth.dkim} />
          <AuthChip label="DMARC" result={event.auth.dmarc} />
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground">Why it was flagged</p>
        <ul className="mt-2 space-y-1.5 text-sm text-foreground/90">
          {event.signals.map((signal) => (
            <li key={signal} className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {signal}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground">Extracted IOCs</p>
        <ul className="mt-2 space-y-1.5">
          {event.iocs.map((ioc) => (
            <li key={`${ioc.type}-${ioc.value}`} className="flex items-baseline gap-2 font-mono text-xs">
              <span className="w-12 shrink-0 text-muted-foreground">{ioc.type}</span>
              <span className="break-all text-foreground">{ioc.value}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 font-mono text-[11px] text-muted-foreground">
          Evidence hash: <span className="text-primary">sha256:{pseudoHash(event.id + event.sender)}…</span>
        </p>
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground">Attack timeline</p>
        <ol className="mt-3 space-y-3 border-l border-border pl-4">
          {timeline.map((step) => (
            <li key={step.title} className="relative">
              <span aria-hidden="true" className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-primary ring-4 ring-background" />
              <p className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium">{step.title}</span>
                <span className="font-mono text-[11px] text-muted-foreground">{step.at}</span>
              </p>
              <p className="text-xs text-muted-foreground">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
