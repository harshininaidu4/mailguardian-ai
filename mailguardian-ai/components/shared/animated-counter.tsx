'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

/** Counts up from zero the first time it scrolls into view. */
export function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 0, duration = 2, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value.toFixed(decimals) : (0).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(latest.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, decimals, duration]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      <span className="sr-only">
        {prefix}
        {value.toFixed(decimals)}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  );
}
