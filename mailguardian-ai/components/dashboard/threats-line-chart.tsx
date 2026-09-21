'use client';

import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartTooltip } from '@/components/dashboard/chart-tooltip';
import { getLast7DayLabels, weeklyBlocked } from '@/lib/mock-data';
import { colors } from '@/lib/theme';
import { formatCompact } from '@/lib/utils';

export function ThreatsLineChart() {
  const data = useMemo(() => getLast7DayLabels().map((day, i) => ({ day, blocked: weeklyBlocked[i] })), []);
  const summary = data.map((d) => `${d.day}: ${formatCompact(d.blocked)}`).join(', ');

  return (
    <div className="h-[190px]" role="img" aria-label={`Line chart of threats blocked over the last 7 days. ${summary}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="blocked-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.cyan} stopOpacity={0.35} />
              <stop offset="100%" stopColor={colors.cyan} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={colors.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: colors.muted, fontSize: 11 }} />
          <YAxis
            width={44}
            tickLine={false}
            axisLine={false}
            tick={{ fill: colors.muted, fontSize: 11 }}
            tickFormatter={(value: number) => formatCompact(value)}
            domain={[(min: number) => Math.floor(min / 100_000) * 100_000 - 100_000, (max: number) => Math.ceil(max / 100_000) * 100_000]}
          />
          <Tooltip content={<ChartTooltip compact />} cursor={{ stroke: colors.cyan, strokeOpacity: 0.3 }} />
          <Area
            type="monotone"
            dataKey="blocked"
            stroke={colors.cyan}
            strokeWidth={2}
            fill="url(#blocked-fill)"
            activeDot={{ r: 5, stroke: colors.background, strokeWidth: 2, fill: colors.cyan }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
