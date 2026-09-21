interface ChartTooltipProps {
  active?: boolean;
  label?: string | number;
  payload?: { name?: string; value?: number; color?: string; payload?: { name?: string; fill?: string } }[];
  valueSuffix?: string;
  compact?: boolean;
}

/** Shared dark glass tooltip for Recharts. */
export function ChartTooltip({ active, label, payload, valueSuffix = '', compact }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const value = typeof item.value === 'number' ? item.value : 0;
  const formatted = compact ? new Intl.NumberFormat('en-US').format(value) : String(value);
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="font-display text-sm font-semibold text-foreground">{label ?? item.name}</p>
      <p className="mt-0.5 text-muted-foreground">
        <span className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle" style={{ backgroundColor: item.color ?? item.payload?.fill }} />
        {formatted}
        {valueSuffix}
        {label ? ' blocked' : ''}
      </p>
    </div>
  );
}
