import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/layout/page-shell';
import { getInfoPage, infoPageSlugs } from '@/lib/pages';

export const dynamicParams = false;

export function generateStaticParams() {
  return infoPageSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getInfoPage(params.slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
  };
}

export default function InfoPageRoute({ params }: { params: { slug: string } }) {
  const page = getInfoPage(params.slug);
  if (!page) notFound();

  return (
    <PageShell eyebrow={page.eyebrow} title={page.title} description={page.description}>
      {page.legal ? (
        <p className="mb-10 rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-sm text-muted-foreground">
          MailGuardian AI is a demonstration product. This page shows the structure of a real policy and is not a binding legal document.
        </p>
      ) : null}
      <div className="space-y-10">
        {page.sections.map((section) => (
          <section key={section.heading} aria-labelledby={`${page.slug}-${section.heading}`.replace(/\s+/g, '-').toLowerCase()}>
            <h2 id={`${page.slug}-${section.heading}`.replace(/\s+/g, '-').toLowerCase()} className="text-2xl font-semibold">
              {section.heading}
            </h2>
            <div className="mt-3 space-y-4 leading-relaxed text-muted-foreground">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="mt-14 text-sm text-muted-foreground">
        Questions?{' '}
        <Link href="/#contact" className="text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Get in touch
        </Link>
        .
      </p>
    </PageShell>
  );
}
