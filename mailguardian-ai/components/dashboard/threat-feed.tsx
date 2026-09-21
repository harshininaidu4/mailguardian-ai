'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Archive, Pause, Play, ShieldCheck, type LucideIcon } from 'lucide-react';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { RiskMeter } from '@/components/dashboard/risk-meter';
import type { ThreatAction, ThreatEvent } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const actionStyle: Record<ThreatAction, { variant: BadgeProps['variant']; icon: LucideIcon }> = {
  Blocked: { variant: 'success', icon: ShieldCheck },
  Quarantined: { variant: 'warning', icon: Archive },
  Warned: { variant: 'violet', icon: AlertTriangle },
};

interface ThreatFeedProps {
  events: ThreatEvent[];
  selectedId: string;
  onSelect: (event: ThreatEvent) => void;
  paused: boolean;
  onTogglePause: () => void;
}

export function ThreatFeed({ events, selectedId, onSelect, paused, onTogglePause }: ThreatFeedProps) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 px-4 pb-3">
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            {!paused && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60 motion-reduce:animate-none" />}
            <span className={cn('relative inline-flex h-2 w-2 rounded-full', paused ? 'bg-muted-foreground' : 'bg-success')} />
          </span>
          {paused ? 'Feed paused' : 'Streaming live'}
        </p>
        <button
          type="button"
          onClick={onTogglePause}
          aria-pressed={paused}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {paused ? <Play className="h-3 w-3" aria-hidden="true" /> : <Pause className="h-3 w-3" aria-hidden="true" />}
          {paused ? 'Resume feed' : 'Pause feed'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <caption className="sr-only">Live feed of detected email threats. Select a row to open its forensic detail.</caption>
          <thead>
            <tr className="border-y border-border/70 text-xs text-muted-foreground">
              {['Sender', 'Subject', 'Risk score', 'Geo', 'Action'].map((heading) => (
                <th key={heading} scope="col" className="px-4 py-2.5 font-medium">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {events.map((event) => {
                const selected = event.id === selectedId;
                const { variant, icon: ActionIcon } = actionStyle[event.action];
                return (
                  <motion.tr
                    key={event.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    tabIndex={0}
                    aria-current={selected ? 'true' : undefined}
                    onClick={() => onSelect(event)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelect(event);
                      }
                    }}
                    className={cn(
                      'cursor-pointer border-b border-border/50 outline-none transition-colors last:border-b-0 hover:bg-white/[0.03] focus-visible:bg-white/[0.05] focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring',
                      selected && 'bg-primary/[0.07] shadow-[inset_2px_0_0_hsl(var(--primary))]',
                      event.live && 'animate-flash',
                    )}
                  >
                    <td className="px-4 py-3">
                      <p className="max-w-[210px] truncate font-mono text-xs text-foreground" title={event.sender}>
                        {event.sender}
                      </p>
                      <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{new Date(event.detectedAt).toLocaleTimeString('en-GB')}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="max-w-[230px] truncate text-foreground/90" title={event.subject}>
                        {event.subject}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{event.category}</p>
                    </td>
                    <td className="px-4 py-3">
                      <RiskMeter risk={event.risk} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                      {event.geo.city}, {event.geo.cc}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={variant}>
                        <ActionIcon className="h-3 w-3" aria-hidden="true" />
                        {event.action}
                      </Badge>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
