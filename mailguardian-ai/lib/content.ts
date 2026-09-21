import {
  Ban,
  BadgeCheck,
  Banknote,
  Bug,
  FileText,
  FlaskConical,
  Hash,
  Kanban,
  KeyRound,
  LayoutGrid,
  Link2,
  Mail,
  MailWarning,
  Plane,
  Radar,
  Crosshair,
  ScanSearch,
  Search,
  Send,
  ShieldCheck,
  Webhook,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Trust bar (fictional customers: replace with real, approved logos)   */
/* ------------------------------------------------------------------ */

export type LogoMark = 'hex' | 'ring' | 'triangle' | 'stack' | 'wave' | 'diamond';

export const trustedCompanies: { name: string; mark: LogoMark }[] = [
  { name: 'Halcyon Bank', mark: 'hex' },
  { name: 'Meridian Health', mark: 'ring' },
  { name: 'Orbital Systems', mark: 'triangle' },
  { name: 'Northgate Energy', mark: 'stack' },
  { name: 'Kestrel Logistics', mark: 'wave' },
  { name: 'Vertex Capital', mark: 'diamond' },
];

/* ------------------------------------------------------------------ */
/* Problem stats                                                       */
/* ------------------------------------------------------------------ */

export const problemStats: {
  icon: LucideIcon;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  detail: string;
  source: string;
}[] = [
  {
    icon: MailWarning,
    value: 91,
    suffix: '%',
    label: 'of cyberattacks start with email',
    detail:
      'A single convincing message is still the cheapest way into a network, and one click can hand over credentials, sessions or a foothold.',
    source: 'Widely cited industry estimate',
  },
  {
    icon: Banknote,
    prefix: '$',
    value: 2.9,
    suffix: 'B',
    decimals: 1,
    label: 'lost to business email compromise in 2023',
    detail:
      'BEC has no malware to catch. The message is the weapon, so detection has to understand who is asking for what, and from where.',
    source: 'FBI IC3 Internet Crime Report, 2023',
  },
  {
    icon: Send,
    value: 3.4,
    suffix: 'B',
    decimals: 1,
    label: 'phishing emails sent every day',
    detail:
      'Attackers automate at massive scale and now use generative AI to write flawless, personalised lures that slip past static rules.',
    source: 'Industry estimate',
  },
];

/* ------------------------------------------------------------------ */
/* Three pillars                                                       */
/* ------------------------------------------------------------------ */

export const pillars = [
  {
    id: 'detection',
    title: 'AI-powered threat detection',
    description:
      'Language models read intent, tone and urgency. Behavioural models learn what normal looks like for every sender and mailbox. Unknown files detonate in a sandbox before anyone can open them.',
    bullets: [
      'NLP analysis of intent, urgency and impersonation',
      'Per-sender and per-recipient behavioural baselines',
      'Attachment and URL sandbox detonation',
      'Zero-day and polymorphic payload detection',
    ],
    metric: { value: '<50 ms', label: 'median time to verdict' },
  },
  {
    id: 'geolocation',
    title: 'Geolocation intelligence',
    description:
      'Every hop in the message path is mapped and scored, so a sign-in or sender that makes no geographic sense is flagged before damage is done.',
    bullets: [
      'IP-to-location mapping across every Received hop',
      'Impossible-travel detection for senders and sessions',
      'Risk policies by region, ASN and hosting provider',
      'VPN, proxy and Tor exit-node identification',
    ],
    metric: { value: '200+', label: 'countries with ASN and proxy intelligence' },
  },
  {
    id: 'forensics',
    title: 'Forensic intelligence',
    description:
      'Every verdict ships with the evidence behind it: tamper-evident, exportable and ready for your incident-response or legal team.',
    bullets: [
      'Chain of custody with cryptographic hashing',
      'Automatic IOC extraction: domains, IPs, hashes, URLs',
      'Interactive attack timeline and campaign clustering',
      'Export to PDF, JSON and STIX 2.1',
    ],
    metric: { value: '100%', label: 'of verdicts carry an evidence trail' },
  },
] as const;

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

export const steps: { icon: LucideIcon; title: string; description: string; code: string }[] = [
  {
    icon: Mail,
    title: 'Email arrives',
    description:
      'The message is intercepted through the Microsoft Graph or Gmail API. The AI engine scans headers, body, links and attachments in under 50 ms.',
    code: 'scan.latency = 42ms',
  },
  {
    icon: Radar,
    title: 'Threat detected',
    description:
      'The verdict is enriched with geolocation for every hop, ASN reputation and impossible-travel checks, then the message is blocked or quarantined.',
    code: 'geo.origin = "Lagos, NG"',
  },
  {
    icon: ScanSearch,
    title: 'Forensic report generated',
    description:
      'IOCs are extracted, evidence is hashed and a full attack timeline is built. Your SOC is alerted in Slack, your SIEM and your ticketing tool.',
    code: 'report.status = "sealed"',
  },
];

/* ------------------------------------------------------------------ */
/* Feature grid                                                        */
/* ------------------------------------------------------------------ */

export const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Zap,
    title: 'Real-time detection',
    description: 'Inline verdicts in under 50 ms, so threats never reach the mailbox or slow down delivery.',
  },
  {
    icon: Bug,
    title: 'Zero-day protection',
    description: 'Behavioural and intent-based models catch novel attacks that signature engines have never seen.',
  },
  {
    icon: BadgeCheck,
    title: 'SPF, DKIM and DMARC validation',
    description: 'Authenticate every sender, detect spoofing and see exactly which domains fail alignment.',
  },
  {
    icon: FlaskConical,
    title: 'Attachment sandboxing',
    description: 'Detonate documents, archives and scripts in an isolated environment and read the behaviour report.',
  },
  {
    icon: Link2,
    title: 'URL reputation',
    description: 'Time-of-click scanning follows redirect chains, unwraps QR codes and blocks weaponised links.',
  },
  {
    icon: Plane,
    title: 'Impossible travel alerts',
    description: 'Flag sessions and senders that jump between distant regions faster than any flight could.',
  },
  {
    icon: Ban,
    title: 'IOC auto-blocking',
    description: 'Push extracted domains, IPs and hashes to your gateway and endpoint tools automatically.',
  },
  {
    icon: FileText,
    title: 'Compliance reports',
    description: 'Audit-ready evidence packs mapped to GDPR, HIPAA and SOC 2 control requirements.',
  },
  {
    icon: Webhook,
    title: 'API and SIEM integration',
    description: 'REST API, webhooks and native connectors for Splunk, Sentinel and your ticketing stack.',
  },
];

export const apiRequestSample = `curl https://api.mailguardian.ai/v1/analyze \\
  -H "Authorization: Bearer $MG_API_KEY" \\
  -H "Content-Type: message/rfc822" \\
  --data-binary @suspicious.eml`;

export const apiResponseSample = `{
  "verdict": "malicious",
  "category": "bec",
  "risk_score": 97,
  "latency_ms": 42,
  "geo": { "origin": "Lagos, NG", "impossible_travel": true },
  "auth": { "spf": "fail", "dkim": "none", "dmarc": "fail" },
  "iocs": ["northbridge-exec.co", "203.0.113.42"],
  "action": "quarantined"
}`;

/* ------------------------------------------------------------------ */
/* Integrations                                                        */
/* Text tiles on purpose: drop in each vendor’s official brand asset,   */
/* following their brand guidelines, before you go live.               */
/* ------------------------------------------------------------------ */

export const integrations: { name: string; category: string; icon: LucideIcon }[] = [
  { name: 'Microsoft 365', category: 'Email platform', icon: LayoutGrid },
  { name: 'Google Workspace', category: 'Email platform', icon: Mail },
  { name: 'Slack', category: 'Alerting and chat', icon: Hash },
  { name: 'Splunk', category: 'SIEM', icon: Search },
  { name: 'Microsoft Sentinel', category: 'SIEM and SOAR', icon: ShieldCheck },
  { name: 'CrowdStrike', category: 'Endpoint response', icon: Crosshair },
  { name: 'Okta', category: 'Identity', icon: KeyRound },
  { name: 'Jira', category: 'Ticketing', icon: Kanban },
  { name: 'ServiceNow', category: 'ITSM', icon: Workflow },
];

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

export const ANNUAL_DISCOUNT = 0.2;

export interface PricingTier {
  id: 'starter' | 'business' | 'enterprise';
  name: string;
  monthly: number | null;
  users: string;
  description: string;
  cta: string;
  href: string;
  popular?: boolean;
  featuresIntro?: string;
  features: string[];
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthly: 5,
    users: 'Up to 50 users',
    description: 'Core AI protection for small teams that need to stop phishing today.',
    cta: 'Start free trial',
    href: '/#contact',
    features: [
      'AI phishing and malware detection',
      'SPF, DKIM and DMARC validation',
      'URL reputation and time-of-click scanning',
      'Microsoft 365 and Google Workspace',
      'IP geolocation on every message',
      '7-day forensic retention',
      'Email support',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    monthly: 12,
    users: 'Up to 500 users',
    description: 'The full detection, geolocation and forensics stack for growing security teams.',
    cta: 'Start free trial',
    href: '/#contact',
    popular: true,
    featuresIntro: 'Everything in Starter, plus:',
    features: [
      'Attachment sandboxing',
      'Impossible travel alerts',
      'Full forensic reports with chain of custody',
      'IOC auto-blocking',
      'Splunk, Sentinel and ServiceNow connectors',
      'GDPR, HIPAA and SOC 2 compliance reports',
      'SSO and role-based access',
      '90-day retention and priority support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthly: null,
    users: 'Unlimited users',
    description: 'Dedicated analysts, data residency and custom controls for regulated enterprises.',
    cta: 'Contact sales',
    href: '/#contact',
    featuresIntro: 'Everything in Business, plus:',
    features: [
      'Dedicated 24/7 SOC analyst team',
      'Custom model tuning on your mail flow',
      'Regional data residency and private tenancy',
      'Custom retention and legal hold',
      '99.99% uptime SLA',
      'Named customer success manager',
      'DPA, BAA and security review support',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials (fictional: replace with approved customer quotes)      */
/* ------------------------------------------------------------------ */

export const testimonials = [
  {
    quote:
      'We stopped a vendor-impersonation BEC attempt worth six figures within minutes of switching it on. The geolocation trail is what convinced our finance team it was real.',
    name: 'Elena Vasquez',
    role: 'CISO',
    company: 'Meridian Health',
    initials: 'EV',
  },
  {
    quote:
      'Our analysts used to spend an hour building a case file for each phish. Now the forensic report is waiting in ServiceNow before they even open the alert.',
    name: 'Marcus Chen',
    role: 'VP of Security Operations',
    company: 'Orbital Systems',
    initials: 'MC',
  },
  {
    quote:
      'Audits used to mean weeks of screenshots. The compliance exports map cleanly to our SOC 2 controls, and our regulators liked the chain-of-custody detail.',
    name: 'Priya Raman',
    role: 'Chief Information Security Officer',
    company: 'Halcyon Bank',
    initials: 'PR',
  },
] as const;

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    question: 'How does deployment work?',
    answer:
      'Most teams connect through the Microsoft Graph or Gmail API in about 15 minutes. There are no MX record changes and no mail-flow downtime. If you prefer an inline gateway or journaling setup, both are supported and can run side by side during a pilot.',
  },
  {
    question: 'What happens to our email data? Is it private?',
    answer:
      'Message content is encrypted in transit and at rest and is processed inside a region-pinned tenant. You control retention and can redact sensitive fields before storage. Your data is never used to train models shared with other customers.',
  },
  {
    question: 'How accurate is detection, and what about false positives?',
    answer:
      'Detection combines language models, behavioural baselines, sandboxing and geolocation signals, so a single noisy indicator does not decide a verdict. Every decision includes an explanation, and analyst feedback tunes your tenant so false positives fall over time. Ask us for benchmark results on your own historical mail.',
  },
  {
    question: 'Which tools does it integrate with?',
    answer:
      'Native connectors cover Microsoft 365, Google Workspace, Slack, Splunk, Microsoft Sentinel, CrowdStrike, Okta, Jira and ServiceNow. Anything else can connect through the REST API and webhooks, and IOCs export as JSON or STIX 2.1.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'Plans are priced per protected user per month, with 20% off when billed annually. Every plan starts with a 14-day free trial and no credit card. Enterprise pricing is custom and includes a dedicated SOC team.',
  },
  {
    question: 'Does it help with GDPR, HIPAA and SOC 2?',
    answer:
      'Yes. Business and Enterprise plans include compliance reports that map evidence, retention and access controls to GDPR, HIPAA and SOC 2 requirements. Regional data residency, a DPA and, for Enterprise, a BAA are available. Request our trust package for current audit documentation.',
  },
] as const;
