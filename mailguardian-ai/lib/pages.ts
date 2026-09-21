/** Content for the secondary pages linked from the footer. Rendered by app/[slug]/page.tsx. */

export interface InfoSection {
  heading: string;
  body: string[];
}

export interface InfoPage {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Legal pages carry a notice that this is a demo product. */
  legal?: boolean;
  sections: InfoSection[];
}

export const infoPages: InfoPage[] = [
  {
    slug: 'about',
    eyebrow: 'Company',
    title: 'Built by people who have run the incident call',
    description: 'Why MailGuardian AI exists and how the team thinks about email security.',
    sections: [
      {
        heading: 'Why we exist',
        body: [
          'Most breaches still begin with a message that looked fine at a glance. We built MailGuardian AI so that the person on the receiving end never has to make that call alone.',
          'We combine language models, sender behaviour and IP geolocation into a single verdict, then keep the evidence so the next analyst, auditor or investigator can see exactly why it was made.',
        ],
      },
      {
        heading: 'How we work',
        body: [
          'Every verdict comes with reasons a human can read. If we cannot explain a decision to an analyst, we do not ship it.',
          'Security tooling should reduce work, not create alerts to triage. We measure ourselves on time saved per incident, not on the number of detections.',
        ],
      },
    ],
  },
  {
    slug: 'careers',
    eyebrow: 'Company',
    title: 'Careers',
    description: 'Open roles and how hiring works at MailGuardian AI.',
    sections: [
      {
        heading: 'Open roles',
        body: [
          'We have no open roles listed at the moment. We hire in threat research, detection engineering, product design and customer security engineering.',
          'If your work fits one of those areas, send a short note about something you have built or investigated to careers@mailguardian.ai.',
        ],
      },
      {
        heading: 'How hiring works',
        body: ['A conversation, a practical exercise based on real mail-flow problems, and a team panel. We pay for the exercise and give written feedback either way.'],
      },
    ],
  },
  {
    slug: 'partners',
    eyebrow: 'Company',
    title: 'Partners',
    description: 'Work with MailGuardian AI as a reseller, MSSP or technology partner.',
    sections: [
      {
        heading: 'Managed security providers',
        body: ['MSSPs can run MailGuardian AI across many client tenants from one console, with per-client retention, reporting and billing.'],
      },
      {
        heading: 'Technology partners',
        body: ['If your product consumes email threat data, our REST API, webhooks and STIX 2.1 export make integration straightforward. Email partners@mailguardian.ai with a short description of your use case.'],
      },
    ],
  },
  {
    slug: 'blog',
    eyebrow: 'Resources',
    title: 'Blog',
    description: 'Threat research and product notes from the MailGuardian AI team.',
    sections: [
      {
        heading: 'Nothing published yet',
        body: [
          'Threat research, incident write-ups and product notes will appear here. Subscribe with the newsletter form in the footer and we will email new posts.',
        ],
      },
    ],
  },
  {
    slug: 'security',
    eyebrow: 'Resources',
    title: 'Trust center',
    description: 'How MailGuardian AI protects customer data.',
    sections: [
      {
        heading: 'Data protection',
        body: [
          'Message content is encrypted in transit with TLS 1.2 or later and at rest with AES-256. Each customer is processed in a region-pinned tenant with logical isolation.',
          'Customers control retention and can redact sensitive fields before storage.',
        ],
      },
      {
        heading: 'Access and operations',
        body: [
          'Staff access to customer data is role-based, time-limited and logged. Production changes are reviewed and deployed through an audited pipeline.',
        ],
      },
      {
        heading: 'Reporting a vulnerability',
        body: ['Email security@mailguardian.ai with details and a way to reproduce the issue. We acknowledge reports within two business days and will not pursue good-faith research.'],
      },
    ],
  },
  {
    slug: 'privacy',
    eyebrow: 'Legal',
    title: 'Privacy policy',
    description: 'How MailGuardian AI collects, uses and protects personal data.',
    legal: true,
    sections: [
      {
        heading: 'What we collect on this website',
        body: [
          'When you submit the trial or newsletter form we receive your email address and the form you used. We use it only to reply to you and to send what you asked for.',
          'This site does not set advertising cookies.',
        ],
      },
      {
        heading: 'What we process as a service',
        body: ['When a customer uses the product, we process email metadata and content on their behalf as a processor. That processing is governed by the data processing addendum.'],
      },
      {
        heading: 'Your rights',
        body: ['You can ask to access, correct or delete your personal data at any time by emailing security@mailguardian.ai.'],
      },
    ],
  },
  {
    slug: 'terms',
    eyebrow: 'Legal',
    title: 'Terms of service',
    description: 'The terms that apply when you use the MailGuardian AI website and service.',
    legal: true,
    sections: [
      {
        heading: 'Using the service',
        body: ['You may use the service for your organisation’s internal security purposes. You are responsible for the accounts you create and for the mailboxes you connect.'],
      },
      {
        heading: 'Acceptable use',
        body: ['You must not use the service to intercept mail you are not authorised to inspect, or to attempt to disrupt or reverse engineer it.'],
      },
      {
        heading: 'Plans and billing',
        body: ['Plans are billed per protected user. Trials last 14 days and require no payment details. Annual plans receive a 20% discount against monthly pricing.'],
      },
    ],
  },
  {
    slug: 'dpa',
    eyebrow: 'Legal',
    title: 'Data processing addendum',
    description: 'How MailGuardian AI processes personal data on behalf of customers.',
    legal: true,
    sections: [
      {
        heading: 'Roles',
        body: ['The customer is the controller and MailGuardian AI is the processor of personal data contained in the mail it analyses.'],
      },
      {
        heading: 'Processing and sub-processors',
        body: ['We process data only on documented customer instructions. Sub-processors are bound by equivalent obligations, and customers are notified before any change.'],
      },
      {
        heading: 'Requesting a signed copy',
        body: ['Email security@mailguardian.ai to receive a countersigned DPA. Enterprise customers can also request a business associate agreement.'],
      },
    ],
  },
  {
    slug: 'cookies',
    eyebrow: 'Legal',
    title: 'Cookie policy',
    description: 'Which cookies and similar storage this website uses.',
    legal: true,
    sections: [
      {
        heading: 'What we use',
        body: [
          'This website does not use advertising or cross-site tracking cookies. It does not store anything in your browser beyond what is strictly needed to deliver the page.',
        ],
      },
      {
        heading: 'Changes',
        body: ['If we add analytics or other optional cookies, we will ask for your consent first and update this page.'],
      },
    ],
  },
];

export const infoPageSlugs = infoPages.map((page) => page.slug);

export function getInfoPage(slug: string): InfoPage | undefined {
  return infoPages.find((page) => page.slug === slug);
}
