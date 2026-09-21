import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { Providers } from '@/components/shared/providers';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#05070f',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      sameAs: Object.values(siteConfig.social),
    },
    {
      '@type': 'SoftwareApplication',
      name: siteConfig.name,
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'Web',
      description: siteConfig.description,
      offers: [
        { '@type': 'Offer', name: 'Starter', price: '5', priceCurrency: 'USD' },
        { '@type': 'Offer', name: 'Business', price: '12', priceCurrency: 'USD' },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Providers>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
