import Link from 'next/link';
import { Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { LeadForm } from '@/components/shared/lead-form';
import { footerLinks, siteConfig } from '@/lib/config';

const socials = [
  { label: `${siteConfig.shortName} on X`, href: siteConfig.social.x, icon: Twitter },
  { label: `${siteConfig.shortName} on LinkedIn`, href: siteConfig.social.linkedin, icon: Linkedin },
  { label: `${siteConfig.shortName} on GitHub`, href: siteConfig.social.github, icon: Github },
  { label: `${siteConfig.shortName} on YouTube`, href: siteConfig.social.youtube, icon: Youtube },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/70 bg-background/60" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Logo />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              AI-powered email threat detection, geolocation and forensic intelligence for security teams that need answers, not alert fatigue.
            </p>

            <div className="mt-8">
              <p className="font-display text-sm font-semibold">Get the monthly threat brief</p>
              <p className="mt-1 text-sm text-muted-foreground">New attack patterns and product updates. No spam.</p>
              <LeadForm
                source="newsletter"
                size="default"
                label="Email address for the newsletter"
                placeholder="you@company.com"
                buttonLabel="Subscribe"
                successMessage="You are subscribed. Watch for the next brief."
                className="mt-4 max-w-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            {Object.entries(footerLinks).map(([group, links]) => (
              <nav key={group} aria-label={group}>
                <h3 className="font-display text-sm font-semibold text-foreground">{group}</h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="rounded text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-border/70 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}, Inc. All rights reserved.
          </p>
          <ul className="flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
