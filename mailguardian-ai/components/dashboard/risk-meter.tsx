import { cn } from '@/lib/utils';

export function riskTone(risk: number) {
  if (risk >= 85) return { text: 'text-destructive', bar: 'bg-destructive' };
  if (risk >= 65) return { text: 'text-warning', bar: 'bg-warning' };
  return { text: 'text-primary', bar: 'bg-primary' };
}

/** Numeric risk score with a slim bar, so severity never relies on colour alone. */
export function RiskMeter({ risk, className }: { risk: number; className?: string }) {
  const tone = riskTone(risk);
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className={cn('w-7 font-mono text-sm font-semibold tabular-nums', tone.text)}>{risk}</span>
      <span className="h-1.5 w-14 overflow-hidden rounded-full bg-border" aria-hidden="true">
        <span className={cn('block h-full rounded-full', tone.bar)} style={{ width: `${risk}%` }} />
      </span>
    </div>
  );
}
