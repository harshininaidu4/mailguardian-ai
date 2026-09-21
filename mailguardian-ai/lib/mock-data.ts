/**
 * Synthetic data that powers the interactive SOC dashboard preview.
 * Everything here is fictional: IPs use the RFC 5737 documentation ranges
 * (192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24) and domains are invented.
 */
import { colors } from '@/lib/theme';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ThreatCategory = 'Phishing' | 'BEC' | 'Malware' | 'Spam';
export type ThreatAction = 'Blocked' | 'Quarantined' | 'Warned';
export type AuthResult = 'pass' | 'fail' | 'none';
export type Severity = 'critical' | 'high' | 'medium';

export interface GeoPoint {
  city: string;
  cc: string;
  lat: number;
  lng: number;
}

export interface Ioc {
  type: 'domain' | 'ip' | 'url' | 'sha256';
  value: string;
}

export interface ThreatTemplate {
  sender: string;
  subject: string;
  risk: number;
  category: ThreatCategory;
  geo: GeoPoint;
  auth: { spf: AuthResult; dkim: AuthResult; dmarc: AuthResult };
  signals: string[];
  iocs: Ioc[];
  latencyMs: number;
}

export interface ThreatEvent extends ThreatTemplate {
  id: string;
  action: ThreatAction;
  detectedAt: number;
  live: boolean;
}

export interface AttackOrigin {
  id: string;
  city: string;
  cc: string;
  lat: number;
  lng: number;
  count: number;
  severity: Severity;
  targetId: string;
}

export interface ProtectedSite {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

/* ------------------------------------------------------------------ */
/* Headline numbers                                                    */
/* ------------------------------------------------------------------ */

/** Shared by the hero live counter and the dashboard KPI so they agree. */
export const BLOCKED_TODAY_BASE = 1_204_318;
export const SCANNED_TODAY_BASE = 48_312_904;

/* ------------------------------------------------------------------ */
/* Geography                                                           */
/* ------------------------------------------------------------------ */

const G = {
  lagos: { city: 'Lagos', cc: 'NG', lat: 6.52, lng: 3.38 },
  bucharest: { city: 'Bucharest', cc: 'RO', lat: 44.43, lng: 26.1 },
  hanoi: { city: 'Hanoi', cc: 'VN', lat: 21.03, lng: 105.85 },
  saoPaulo: { city: 'São Paulo', cc: 'BR', lat: -23.55, lng: -46.63 },
  moscow: { city: 'Moscow', cc: 'RU', lat: 55.75, lng: 37.62 },
  istanbul: { city: 'Istanbul', cc: 'TR', lat: 41.01, lng: 28.98 },
  amsterdam: { city: 'Amsterdam', cc: 'NL', lat: 52.37, lng: 4.9 },
  jakarta: { city: 'Jakarta', cc: 'ID', lat: -6.2, lng: 106.85 },
  singapore: { city: 'Singapore', cc: 'SG', lat: 1.35, lng: 103.82 },
  mumbai: { city: 'Mumbai', cc: 'IN', lat: 19.08, lng: 72.88 },
  frankfurt: { city: 'Frankfurt', cc: 'DE', lat: 50.11, lng: 8.68 },
  toronto: { city: 'Toronto', cc: 'CA', lat: 43.65, lng: -79.38 },
  johannesburg: { city: 'Johannesburg', cc: 'ZA', lat: -26.2, lng: 28.04 },
  ashburn: { city: 'Ashburn', cc: 'US', lat: 39.04, lng: -77.49 },
  manila: { city: 'Manila', cc: 'PH', lat: 14.6, lng: 120.98 },
  bogota: { city: 'Bogotá', cc: 'CO', lat: 4.71, lng: -74.07 },
} satisfies Record<string, GeoPoint>;

export const protectedSites: ProtectedSite[] = [
  { id: 'nyc', name: 'New York HQ', lat: 40.71, lng: -74.01 },
  { id: 'lon', name: 'London SOC', lat: 51.51, lng: -0.13 },
];

export const attackOrigins: AttackOrigin[] = [
  { id: 'lagos', ...G.lagos, count: 48_210, severity: 'critical', targetId: 'lon' },
  { id: 'moscow', ...G.moscow, count: 61_940, severity: 'critical', targetId: 'lon' },
  { id: 'bucharest', ...G.bucharest, count: 37_460, severity: 'high', targetId: 'nyc' },
  { id: 'hanoi', ...G.hanoi, count: 29_880, severity: 'high', targetId: 'nyc' },
  { id: 'saoPaulo', ...G.saoPaulo, count: 33_150, severity: 'high', targetId: 'nyc' },
  { id: 'istanbul', ...G.istanbul, count: 22_310, severity: 'medium', targetId: 'lon' },
  { id: 'amsterdam', ...G.amsterdam, count: 54_730, severity: 'high', targetId: 'nyc' },
  { id: 'jakarta', ...G.jakarta, count: 19_720, severity: 'medium', targetId: 'lon' },
  { id: 'singapore', ...G.singapore, count: 26_400, severity: 'medium', targetId: 'nyc' },
  { id: 'mumbai', ...G.mumbai, count: 31_270, severity: 'high', targetId: 'lon' },
  { id: 'frankfurt', ...G.frankfurt, count: 44_050, severity: 'high', targetId: 'nyc' },
  { id: 'johannesburg', ...G.johannesburg, count: 14_860, severity: 'medium', targetId: 'lon' },
  { id: 'manila', ...G.manila, count: 17_930, severity: 'medium', targetId: 'nyc' },
  { id: 'bogota', ...G.bogota, count: 12_480, severity: 'medium', targetId: 'nyc' },
];

export const severityColor: Record<Severity, string> = {
  critical: colors.red,
  high: colors.amber,
  medium: colors.cyan,
};

/* ------------------------------------------------------------------ */
/* Charts                                                              */
/* ------------------------------------------------------------------ */

export const threatTypeBreakdown = [
  { name: 'Phishing', value: 45, color: colors.cyan },
  { name: 'BEC', value: 25, color: colors.violet },
  { name: 'Malware', value: 20, color: colors.red },
  { name: 'Spam', value: 10, color: colors.amber },
] as const;

/** Blocked-per-day series, oldest first; the last entry is "today". */
export const weeklyBlocked = [1_021_480, 1_083_920, 1_152_610, 1_109_770, 1_187_340, 1_161_050, BLOCKED_TODAY_BASE];

/** Labels for the last 7 days ending today (computed client-side). */
export function getLast7DayLabels(now: Date = new Date()): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const offset = 6 - i;
    if (offset === 0) return 'Today';
    const d = new Date(now);
    d.setDate(now.getDate() - offset);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  });
}

/* ------------------------------------------------------------------ */
/* Threat feed                                                         */
/* ------------------------------------------------------------------ */

export const threatTemplates: ThreatTemplate[] = [
  {
    sender: 'ceo.office@northbridge-exec.co',
    subject: 'Urgent: wire transfer needed before 3pm',
    risk: 97,
    category: 'BEC',
    geo: G.lagos,
    auth: { spf: 'fail', dkim: 'none', dmarc: 'fail' },
    signals: ['Lookalike of an executive domain', 'Payment urgency + secrecy language', 'Reply-To differs from From'],
    iocs: [
      { type: 'domain', value: 'northbridge-exec.co' },
      { type: 'ip', value: '203.0.113.42' },
    ],
    latencyMs: 41,
  },
  {
    sender: 'it-helpdesk@m365-secure-verify.com',
    subject: 'Action required: password expires in 24 hours',
    risk: 94,
    category: 'Phishing',
    geo: G.bucharest,
    auth: { spf: 'fail', dkim: 'fail', dmarc: 'fail' },
    signals: ['Credential-harvesting page detected', 'Domain registered 2 days ago', 'Brand impersonation'],
    iocs: [
      { type: 'domain', value: 'm365-secure-verify.com' },
      { type: 'url', value: 'hxxps://m365-secure-verify[.]com/login' },
      { type: 'ip', value: '198.51.100.17' },
    ],
    latencyMs: 38,
  },
  {
    sender: 'billing@invoice-portal-pay.top',
    subject: 'Invoice #88213 overdue: final notice',
    risk: 91,
    category: 'Phishing',
    geo: G.hanoi,
    auth: { spf: 'fail', dkim: 'none', dmarc: 'none' },
    signals: ['High-risk TLD', 'Payment-page redirect chain (4 hops)', 'Sender never seen before'],
    iocs: [
      { type: 'domain', value: 'invoice-portal-pay.top' },
      { type: 'ip', value: '192.0.2.88' },
    ],
    latencyMs: 44,
  },
  {
    sender: 'hr-benefits@payrol1-update.net',
    subject: 'Updated benefits enrollment: sign by Friday',
    risk: 88,
    category: 'Phishing',
    geo: G.saoPaulo,
    auth: { spf: 'fail', dkim: 'none', dmarc: 'fail' },
    signals: ['Typosquatted payroll domain', 'Login form posts to third-party host'],
    iocs: [
      { type: 'domain', value: 'payrol1-update.net' },
      { type: 'ip', value: '198.51.100.203' },
    ],
    latencyMs: 47,
  },
  {
    sender: 'noreply@docs-share-secure.io',
    subject: 'Shared with you: Q3_Board_Deck.pdf.html',
    risk: 96,
    category: 'Malware',
    geo: G.moscow,
    auth: { spf: 'pass', dkim: 'fail', dmarc: 'fail' },
    signals: ['Double-extension HTML attachment', 'Sandbox: obfuscated JS drops loader', 'Known campaign cluster'],
    iocs: [
      { type: 'sha256', value: '9f2c…e41a7b03d8' },
      { type: 'domain', value: 'docs-share-secure.io' },
      { type: 'ip', value: '203.0.113.9' },
    ],
    latencyMs: 46,
  },
  {
    sender: 'd.carter@vendor-remit.co',
    subject: 'Updated bank details for next payment run',
    risk: 92,
    category: 'BEC',
    geo: G.istanbul,
    auth: { spf: 'pass', dkim: 'none', dmarc: 'none' },
    signals: ['Vendor impersonation', 'Bank-detail change request', 'Thread hijack indicators'],
    iocs: [
      { type: 'domain', value: 'vendor-remit.co' },
      { type: 'ip', value: '192.0.2.144' },
    ],
    latencyMs: 40,
  },
  {
    sender: 'scanner@office-copier.net',
    subject: 'Scan_00194.zip',
    risk: 89,
    category: 'Malware',
    geo: G.amsterdam,
    auth: { spf: 'fail', dkim: 'none', dmarc: 'fail' },
    signals: ['Password-protected archive', 'Sandbox: macro spawns PowerShell', 'Spoofed internal device name'],
    iocs: [
      { type: 'sha256', value: '4bd1…07c9f2a6e5' },
      { type: 'domain', value: 'office-copier.net' },
    ],
    latencyMs: 49,
  },
  {
    sender: 'legal@counsel-notice.org',
    subject: 'Confidential: subpoena attached',
    risk: 86,
    category: 'Phishing',
    geo: G.jakarta,
    auth: { spf: 'fail', dkim: 'none', dmarc: 'none' },
    signals: ['Authority + fear language', 'QR code hides destination URL'],
    iocs: [
      { type: 'domain', value: 'counsel-notice.org' },
      { type: 'url', value: 'hxxps://counsel-notice[.]org/case/7714' },
    ],
    latencyMs: 43,
  },
  {
    sender: 'cfo@acrne-holdings.com',
    subject: 'Confidential acquisition: keep this between us',
    risk: 95,
    category: 'BEC',
    geo: G.singapore,
    auth: { spf: 'fail', dkim: 'fail', dmarc: 'fail' },
    signals: ['"rn" for "m" lookalike domain', 'First contact with finance team', 'Secrecy + urgency'],
    iocs: [
      { type: 'domain', value: 'acrne-holdings.com' },
      { type: 'ip', value: '198.51.100.71' },
    ],
    latencyMs: 39,
  },
  {
    sender: 'security@bank-alerts-verify.com',
    subject: 'Unusual sign-in detected on your account',
    risk: 90,
    category: 'Phishing',
    geo: G.mumbai,
    auth: { spf: 'fail', dkim: 'none', dmarc: 'fail' },
    signals: ['Impossible travel: London → Mumbai in 4 min', 'Brand impersonation', 'Newly registered domain'],
    iocs: [
      { type: 'domain', value: 'bank-alerts-verify.com' },
      { type: 'ip', value: '203.0.113.118' },
    ],
    latencyMs: 42,
  },
  {
    sender: 'it-admin@vpn-config-update.net',
    subject: 'New VPN client required: install today',
    risk: 93,
    category: 'Malware',
    geo: G.frankfurt,
    auth: { spf: 'fail', dkim: 'none', dmarc: 'fail' },
    signals: ['Unsigned installer (.msi)', 'Sandbox: beacons to C2 on launch', 'Internal IT impersonation'],
    iocs: [
      { type: 'sha256', value: 'c07a…5d19b8e3f0' },
      { type: 'domain', value: 'vpn-config-update.net' },
      { type: 'ip', value: '192.0.2.201' },
    ],
    latencyMs: 48,
  },
  {
    sender: 'recruiter@talent-offers.co',
    subject: 'Offer letter: e-signature required',
    risk: 74,
    category: 'Phishing',
    geo: G.toronto,
    auth: { spf: 'pass', dkim: 'pass', dmarc: 'none' },
    signals: ['Fake e-signature landing page', 'Sender domain 9 days old'],
    iocs: [{ type: 'domain', value: 'talent-offers.co' }],
    latencyMs: 45,
  },
  {
    sender: 'support@delivery-track-now.info',
    subject: 'Package on hold: confirm your address',
    risk: 63,
    category: 'Spam',
    geo: G.manila,
    auth: { spf: 'none', dkim: 'none', dmarc: 'none' },
    signals: ['Bulk-sender fingerprint', 'Tracking link with redirect'],
    iocs: [{ type: 'domain', value: 'delivery-track-now.info' }],
    latencyMs: 36,
  },
  {
    sender: 'offers@med-savings-24.biz',
    subject: 'You have been selected: claim your reward',
    risk: 52,
    category: 'Spam',
    geo: G.bogota,
    auth: { spf: 'none', dkim: 'none', dmarc: 'none' },
    signals: ['Bulk-sender fingerprint', 'Prize-scam language'],
    iocs: [{ type: 'domain', value: 'med-savings-24.biz' }],
    latencyMs: 33,
  },
];

export function actionForRisk(risk: number): ThreatAction {
  if (risk >= 85) return 'Blocked';
  if (risk >= 65) return 'Quarantined';
  return 'Warned';
}

export function createThreatEvent(template: ThreatTemplate, seq: number, detectedAt: number, live: boolean): ThreatEvent {
  return {
    ...template,
    id: `evt-${seq}`,
    action: actionForRisk(template.risk),
    detectedAt,
    live,
  };
}

/* ------------------------------------------------------------------ */
/* Blocked ticker                                                      */
/* ------------------------------------------------------------------ */

export const tickerItems = threatTemplates.map((t, i) => ({
  id: `tick-${i}`,
  category: t.category,
  city: t.geo.city,
  cc: t.geo.cc,
  ip: t.iocs.find((ioc) => ioc.type === 'ip')?.value ?? '198.51.100.7',
  latencyMs: t.latencyMs,
}));

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Deterministic 16-hex-char digest used to illustrate evidence hashes (not cryptographic). */
export function pseudoHash(seed: string): string {
  let h1 = 0xdeadbeef ^ seed.length;
  let h2 = 0x41c6ce57 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    const c = seed.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
}
