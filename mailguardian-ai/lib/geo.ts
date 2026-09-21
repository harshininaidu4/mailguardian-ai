import { feature } from 'topojson-client';
import { geoGraticule10, geoNaturalEarth1, geoPath } from 'd3-geo';
import type { GeometryCollection, Topology } from 'topojson-specification';
import land110 from 'world-atlas/land-110m.json';

/** Logical SVG canvas for the world map. */
export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 500;

const topology = land110 as unknown as Topology<{ land: GeometryCollection }>;
const land = feature(topology, topology.objects.land);

const projection = geoNaturalEarth1().fitExtent(
  [
    [6, 6],
    [MAP_WIDTH - 6, MAP_HEIGHT - 6],
  ],
  { type: 'Sphere' },
);

const path = geoPath(projection);

/** Pre-computed once at module load: land masses and a faint graticule. */
export const landPath: string = path(land) ?? '';
export const graticulePath: string = path(geoGraticule10()) ?? '';
export const spherePath: string = path({ type: 'Sphere' }) ?? '';

/** Project a lat/lng pair into SVG coordinates. */
export function project(lat: number, lng: number): [number, number] {
  const point = projection([lng, lat]);
  return point ? [point[0], point[1]] : [0, 0];
}

/** Curved arc (quadratic Bezier) between two projected points. */
export function arcPath(from: [number, number], to: [number, number]): string {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const distance = Math.hypot(x2 - x1, y2 - y1);
  const cx = mx;
  const cy = my - distance * 0.28;
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}
