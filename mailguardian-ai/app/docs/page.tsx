import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/layout/page-shell';
import { CodeBlock } from '@/components/shared/code-block';
import { apiRequestSample, apiResponseSample } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Quickstart and API reference for MailGuardian AI: connect a mailbox, analyse a message and receive verdicts by webhook.',
  alternates: { canonical: '/docs' },
};

const toc = [
  { id: 'quickstart', label: 'Quickstart' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'analyze', label: 'Analyze a message' },
  { id: 'webhooks', label: 'Webhooks' },
  { id: 'errors', label: 'Errors and limits' },
];

const webhookSample = `{
  "event": "message.quarantined",
  "message_id": "msg_01J8XK2Q",
  "risk_score": 97,
  "category": "bec",
  "geo": { "origin": "Lagos, NG" },
  "created_at": "2026-09-21T09:14:07Z"
}`;

const errors = [
  { code: '400', meaning: 'The message could not be parsed as RFC 822.' },
  { code: '401', meaning: 'The API key is missing or invalid.' },
  { code: '413', meaning: 'The message exceeds the 25 MB limit.' },
  { code: '429', meaning: 'Too many requests. Retry after the number of seconds in the Retry-After header.' },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-border/70 pt-10 first:border-t-0 first:pt-0">
      <h2 id={`${id}-title`} className="text-2xl font-semibold">
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">{children}</code>;
}

export default function DocsPage() {
  return (
    <PageShell
      eyebrow="Documentation"
      title="Connect a mailbox and get your first verdict in minutes"
      description="Everything you need to deploy MailGuardian AI, call the analysis API and route verdicts into your SOC tooling."
      width="wide"
    >
      <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-medium text-muted-foreground">On this page</p>
          <ul className="mt-3 space-y-1 border-l border-border">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-3xl space-y-12">
          <Section id="quickstart" title="Quickstart">
            <ol className="list-decimal space-y-3 pl-5 marker:text-primary">
              <li>Start a trial from the <Link href="/#contact" className="text-primary underline-offset-4 hover:underline">home page</Link> and sign in to the console.</li>
              <li>Connect Microsoft 365 through the Microsoft Graph API, or Google Workspace through the Gmail API. No MX record changes are needed.</li>
              <li>Create an API key under Settings, then call the analysis endpoint below with any <InlineCode>.eml</InlineCode> file.</li>
            </ol>
          </Section>

          <Section id="authentication" title="Authentication">
            <p>
              Send your key as a bearer token in the <InlineCode>Authorization</InlineCode> header. Keys are scoped per environment and can be rotated at any time. Keep them out of client-side code and version control.
            </p>
          </Section>

          <Section id="analyze" title="Analyze a message">
            <p>
              <InlineCode>POST /v1/analyze</InlineCode> accepts a raw RFC 822 message and returns a verdict, risk score, geolocation, authentication results and extracted indicators.
            </p>
            <CodeBlock title="Request" code={apiRequestSample} />
            <CodeBlock title="Response" code={apiResponseSample} />
          </Section>

          <Section id="webhooks" title="Webhooks">
            <p>
              Register an HTTPS endpoint under Settings to receive events such as <InlineCode>message.quarantined</InlineCode> and <InlineCode>message.blocked</InlineCode>. Each delivery is signed so you can verify it came from us.
            </p>
            <CodeBlock title="Event payload" code={webhookSample} />
          </Section>

          <Section id="errors" title="Errors and limits">
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[420px] text-left text-sm">
                <caption className="sr-only">API error codes</caption>
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground">
                    <th scope="col" className="px-4 py-2.5 font-medium">Status</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {errors.map((row) => (
                    <tr key={row.code} className="border-b border-border/60 last:border-b-0">
                      <td className="px-4 py-3 font-mono text-foreground">{row.code}</td>
                      <td className="px-4 py-3">{row.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>
      </div>
    </PageShell>
  );
}
