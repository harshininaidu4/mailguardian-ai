import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="container flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">This page was quarantined</h1>
      <p className="mt-4 max-w-md text-muted-foreground">The link may be broken, or the page may have moved. Head back to the home page and try again.</p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Back to home</Link>
      </Button>
    </section>
  );
}
