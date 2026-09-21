'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { BLOCKED_TODAY_BASE } from '@/lib/mock-data';
import { formatNumber, randInt } from '@/lib/utils';

/** "1.2M threats blocked today" ticker used in the hero. */
export function LiveCounter() {
  const [count, setCount] = useState(BLOCKED_TODAY_BASE);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setCount((c) => c + randInt(1, 7)), 900);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-border bg-white/[0.03] px-4 py-2 backdrop-blur">
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
      </span>
      <p className="text-sm text-muted-foreground">
        <span className="sr-only">Over 1.2 million threats blocked today</span>
        <span aria-hidden="true">
          <span className="font-mono text-base font-semibold tabular-nums text-foreground">{formatNumber(count)}</span> threats
          blocked today
        </span>
      </p>
    </div>
  );
}
