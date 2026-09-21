import { ShieldCheck } from 'lucide-react';
import { tickerItems } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

function TickerList({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden ? true : undefined}>
      {tickerItems.map((item) => (
        <li key={item.id} className="flex items-center gap-2 whitespace-nowrap px-5 font-mono text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden="true" />
          <span className="font-semibold text-success">Blocked</span>
          <span className="text-foreground/90">{item.category}</span>
          <span>{item.ip}</span>
          <span>
            {item.city}, {item.cc}
          </span>
          <span className="text-primary">{item.latencyMs} ms</span>
          <span aria-hidden="true" className="pl-3 text-border">
            |
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Endless right-to-left ticker of blocked messages. Pauses on hover, focus and when the feed is paused. */
export function BlockedTicker({ paused }: { paused: boolean }) {
  return (
    <div
      role="group"
      aria-label="Ticker of recently blocked threats"
      className="group overflow-hidden border-b border-border/70 bg-background/50 py-2.5 motion-reduce:overflow-x-auto"
    >
      <div
        className={cn(
          'flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none',
          paused && '[animation-play-state:paused]',
        )}
      >
        <TickerList />
        <TickerList hidden />
      </div>
    </div>
  );
}
