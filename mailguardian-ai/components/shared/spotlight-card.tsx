'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

/** Glass card with a soft cyan glow that follows the cursor. */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn('spotlight glass relative overflow-hidden rounded-2xl transition-colors duration-300 hover:border-primary/40', className)}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
