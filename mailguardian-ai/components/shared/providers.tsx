'use client';

import { MotionConfig } from 'framer-motion';

/** Honour the OS-level "reduce motion" setting for every framer-motion animation. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
