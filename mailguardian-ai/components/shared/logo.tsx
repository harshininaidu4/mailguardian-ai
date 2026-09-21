import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn('h-8 w-8', className)}>
      <defs>
        <linearGradient id="mg-logo-gradient" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#31dff6" />
          <stop offset="1" stopColor="#9a64f7" />
        </linearGradient>
      </defs>
      <path
        d="M16 2.5 4.5 6.7v8.2c0 7.1 4.7 12.3 11.5 14.6 6.8-2.3 11.5-7.5 11.5-14.6V6.7L16 2.5Z"
        stroke="url(#mg-logo-gradient)"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="url(#mg-logo-gradient)"
        fillOpacity="0.14"
      />
      <path
        d="M10 12.5h12a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-6.5a1 1 0 0 1 1-1Z"
        stroke="url(#mg-logo-gradient)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="m9.5 13.2 6.5 4.6 6.5-4.6" stroke="url(#mg-logo-gradient)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="font-display text-lg font-semibold tracking-tight text-foreground">
        {siteConfig.shortName}
        <span className="text-primary"> AI</span>
      </span>
    </span>
  );
}
