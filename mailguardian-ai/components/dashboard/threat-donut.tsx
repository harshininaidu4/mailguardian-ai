'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartTooltip } from '@/components/dashboard/chart-tooltip';
import { BLOCKED_TODAY_BASE, threatTypeBreakdown } from '@/lib/mock-data';
import { formatCompact, formatNumber } from '@/lib/utils';

export function ThreatDonut() {
  const summary = threatTypeBreakdown.map((t) => `${t.name} ${t.value}%`).join(', ');
  return (
    <div>
      <div className="relative h-[190px]" role="img" aria-label={`Donut chart of threat types: ${summary}`}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[...threatTypeBreakdown]}
              dataKey="value"
              nameKey="name"
              innerRadius="66%"
              outerRadius="94%"
              paddingAngle={3}
              cornerRadius={4}
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {threatTypeBreakdown.map((t) => (
                <Cell key={t.name} fill={t.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip valueSuffix="%" />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-bold tabular-nums">{formatCompact(BLOCKED_TODAY_BASE)}</span>
          <span className="text-xs text-muted-foreground">blocked today</span>
        </div>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {threatTypeBreakdown.map((t) => (
          <li key={t.name} className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-foreground/90">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.color }} aria-hidden="true" />
              {t.name}
            </span>
            <span className="font-mono text-xs text-muted-foreground" title={`${formatNumber((BLOCKED_TODAY_BASE * t.value) / 100)} messages`}>
              {t.value}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
