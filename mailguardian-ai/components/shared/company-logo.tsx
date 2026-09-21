import type { LogoMark } from '@/lib/content';
import { cn } from '@/lib/utils';

function Mark({ mark }: { mark: LogoMark }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      {mark === 'hex' && <polygon points="12,2.5 20.5,7.25 20.5,16.75 12,21.5 3.5,16.75 3.5,7.25" {...common} />}
      {mark === 'ring' && (
        <>
          <circle cx="12" cy="12" r="9" {...common} />
          <circle cx="12" cy="12" r="3.5" {...common} />
        </>
      )}
      {mark === 'triangle' && <polygon points="12,3 21.5,20 2.5,20" {...common} />}
      {mark === 'stack' && (
        <>
          <rect x="4" y="4" width="16" height="4.5" rx="1" {...common} />
          <rect x="4" y="10" width="16" height="4.5" rx="1" {...common} />
          <rect x="4" y="16" width="16" height="4.5" rx="1" {...common} />
        </>
      )}
      {mark === 'wave' && <path d="M2.5 9c3 0 3-3 6-3s3 3 6 3 3-3 6-3M2.5 17c3 0 3-3 6-3s3 3 6 3 3-3 6-3" {...common} />}
      {mark === 'diamond' && <rect x="5.5" y="5.5" width="13" height="13" rx="1.5" transform="rotate(45 12 12)" {...common} />}
    </svg>
  );
}

/** Wordmark-style logo for illustrative (fictional) customers. */
export function CompanyLogo({ name, mark, className }: { name: string; mark: LogoMark; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2 text-muted-foreground/80 grayscale transition-colors duration-300 hover:text-foreground', className)}>
      <Mark mark={mark} />
      <span className="font-display text-lg font-semibold tracking-tight">{name}</span>
    </span>
  );
}
