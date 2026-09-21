/**
 * Single source of truth for brand + site-wide settings.
 * Renaming the product? Change `name` / `shortName` / `domain` here.
 */
const normalizeSiteUrl = (value: string | undefined, fallback: string) => {
  const candidate = (value ?? fallback).trim();

  if (!candidate) {
    return fallback;
  }

  try {
    return new URL(candidate).toString().replace(/\/$/, '');
  } catch {
    return fallback;
  }
};

export const siteConfig = {
  name: 'MailGuardian AI',
  shortName: 'MailGuardian',
  domain: 'mailguardian.ai',
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL, 'http://localhost:3000'),
  appUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_APP_URL, 'https://app.mailguardian.ai'),
  title: 'MailGuardian AI | AI Email Threat Detection, Geolocation & Forensics',
  description:
    'Stop phishing, BEC, malware and spear-phishing before they reach the inbox. MailGuardian AI combines machine learning, IP geolocation and digital forensics to give security teams fast verdicts and court-ready evidence.',
  keywords: [
    'email security',
    'phishing protection',
    'business email compromise',
    'BEC detection',
    'email threat detection',
    'IP geolocation',
    'impossible travel detection',
    'email forensics',
    'SOC tools',
    'SIEM integration',
    'Microsoft 365 security',
    'Google Workspace security',
  ],
  emails: {
    sales: 'sales@mailguardian.ai',
    security: 'security@mailguardian.ai',
  },
  social: {
    x: 'https://x.com/mailguardianai',
    linkedin: 'https://www.linkedin.com/company/mailguardian-ai',
    github: 'https://github.com/mailguardian-ai',
    youtube: 'https://www.youtube.com/@mailguardianai',
  },
} as const;

export const navLinks = [
  { label: 'Features', href: '/features' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Live Demo', href: '/demo' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: '/docs' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerLinks = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Live demo', href: '/demo' },
    { label: 'Integrations', href: '/features#integrations' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Partners', href: '/partners' },
    { label: 'Contact', href: '/contact' },
  ],
  Resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'API reference', href: '/docs#analyze' },
    { label: 'Blog', href: '/blog' },
    { label: 'Trust center', href: '/security' },
  ],
  Legal: [
    { label: 'Privacy policy', href: '/privacy' },
    { label: 'Terms of service', href: '/terms' },
    { label: 'Data processing addendum', href: '/dpa' },
    { label: 'Cookie policy', href: '/cookies' },
  ],
} as const;
