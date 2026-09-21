'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MAP_HEIGHT, MAP_WIDTH, arcPath, graticulePath, landPath, project } from '@/lib/geo';
import { attackOrigins, protectedSites, severityColor } from '@/lib/mock-data';
import { colors } from '@/lib/theme';
import { cn, formatNumber } from '@/lib/utils';

interface WorldMapProps {
  /** `backdrop` is decorative (hero); `interactive` has tooltips and keyboard focus. */
  variant?: 'backdrop' | 'interactive';
  className?: string;
}

interface Tooltip {
  key: string;
  x: number;
  y: number;
  title: string;
  detail: string;
}

const sitePoints = protectedSites.map((site) => ({ ...site, xy: project(site.lat, site.lng) }));

const originPoints = attackOrigins.map((origin, index) => {
  const xy = project(origin.lat, origin.lng);
  const site = sitePoints.find((s) => s.id === origin.targetId) ?? sitePoints[0];
  return { ...origin, xy, index, targetName: site.name, arc: arcPath(xy, site.xy) };
});

export function WorldMap({ variant = 'interactive', className }: WorldMapProps) {
  const interactive = variant === 'interactive';
  const reduceMotion = useReducedMotion();
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const origins = useMemo(() => (interactive ? originPoints : originPoints.filter((_, i) => i % 2 === 0)), [interactive]);

  const show = (t: Tooltip) => interactive && setTooltip(t);
  const hide = () => setTooltip(null);

  return (
    <div className={cn('relative', className)}>
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="h-auto w-full"
        role={interactive ? 'group' : undefined}
        aria-label={interactive ? 'World map of email attack origins and the sites they target' : undefined}
        aria-hidden={interactive ? undefined : true}
      >
        <path d={graticulePath} fill="none" stroke={colors.cyan} strokeOpacity={interactive ? 0.07 : 0.05} strokeWidth={0.6} />
        <path
          d={landPath}
          fill={colors.cyan}
          fillOpacity={interactive ? 0.075 : 0.06}
          stroke={colors.cyan}
          strokeOpacity={interactive ? 0.32 : 0.22}
          strokeWidth={0.7}
          strokeLinejoin="round"
        />

        {/* Attack arcs */}
        {origins.map((o) => {
          const color = severityColor[o.severity];
          return reduceMotion ? (
            <path key={`arc-${o.id}`} d={o.arc} fill="none" stroke={color} strokeOpacity={0.35} strokeWidth={1.2} />
          ) : (
            <motion.path
              key={`arc-${o.id}`}
              d={o.arc}
              fill="none"
              stroke={color}
              strokeWidth={1.4}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 0.85, 0] }}
              transition={{ duration: 3.4, delay: (o.index * 0.6) % 4.2, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut', times: [0, 0.55, 1] }}
            />
          );
        })}

        {/* Origin dots */}
        {origins.map((o) => {
          const color = severityColor[o.severity];
          const [x, y] = o.xy;
          const active = tooltip?.key === o.id;
          return (
            <g
              key={o.id}
              role={interactive ? 'img' : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={interactive ? `${o.city}, ${o.cc}: ${formatNumber(o.count)} threats blocked, ${o.severity} severity` : undefined}
              onMouseEnter={() => show({ key: o.id, x, y, title: `${o.city}, ${o.cc}`, detail: `${formatNumber(o.count)} blocked · targeting ${o.targetName}` })}
              onMouseLeave={hide}
              onFocus={() => show({ key: o.id, x, y, title: `${o.city}, ${o.cc}`, detail: `${formatNumber(o.count)} blocked · targeting ${o.targetName}` })}
              onBlur={hide}
              className={cn(interactive && 'cursor-pointer outline-none')}
            >
              {interactive && <circle cx={x} cy={y} r={16} fill="transparent" />}
              {!reduceMotion && (
                <motion.circle
                  cx={x}
                  cy={y}
                  fill="none"
                  stroke={color}
                  strokeWidth={1.2}
                  initial={{ r: 3, opacity: 0.7 }}
                  animate={{ r: [3, 15], opacity: [0.7, 0] }}
                  transition={{ duration: 2.4, delay: (o.index * 0.37) % 2.4, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              {active && <circle cx={x} cy={y} r={10} fill="none" stroke="#fff" strokeOpacity={0.85} strokeWidth={1.5} />}
              <circle cx={x} cy={y} r={3.6} fill={color} />
            </g>
          );
        })}

        {/* Protected sites */}
        {sitePoints.map((s) => {
          const [x, y] = s.xy;
          const active = tooltip?.key === s.id;
          return (
            <g
              key={s.id}
              role={interactive ? 'img' : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={interactive ? `Protected site: ${s.name}` : undefined}
              onMouseEnter={() => show({ key: s.id, x, y, title: s.name, detail: 'Protected by MailGuardian' })}
              onMouseLeave={hide}
              onFocus={() => show({ key: s.id, x, y, title: s.name, detail: 'Protected by MailGuardian' })}
              onBlur={hide}
              className={cn(interactive && 'cursor-pointer outline-none')}
            >
              {interactive && <circle cx={x} cy={y} r={18} fill="transparent" />}
              <circle cx={x} cy={y} r={active ? 12 : 9} fill={colors.violet} fillOpacity={0.22} />
              <circle cx={x} cy={y} r={4.6} fill={colors.violet} stroke="#fff" strokeWidth={1.4} />
            </g>
          );
        })}
      </svg>

      {interactive && tooltip ? (
        <div
          role="status"
          className="glass pointer-events-none absolute z-10 max-w-[240px] -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-lg px-3 py-2 text-xs shadow-xl"
          style={{ left: `${(tooltip.x / MAP_WIDTH) * 100}%`, top: `${(tooltip.y / MAP_HEIGHT) * 100}%` }}
        >
          <p className="font-display text-sm font-semibold text-foreground">{tooltip.title}</p>
          <p className="mt-0.5 text-muted-foreground">{tooltip.detail}</p>
        </div>
      ) : null}
    </div>
  );
}
