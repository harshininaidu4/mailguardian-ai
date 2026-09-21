import { Badge } from '@/components/ui/badge';

interface PageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  width?: 'narrow' | 'wide';
}

/** Shared header + spacing for secondary pages. Offsets the fixed navbar. */
export function PageShell({ eyebrow, title, description, children, width = 'narrow' }: PageShellProps) {
  return (
    <div className="pb-24 pt-32 lg:pb-32 lg:pt-40">
      <div className={width === 'narrow' ? 'container max-w-3xl' : 'container'}>
        <header className="max-w-3xl">
          <Badge variant="outline" className="mb-5">
            {eyebrow}
          </Badge>
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] sm:text-5xl">{title}</h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">{description}</p>
        </header>
        <div className="mt-12">{children}</div>
      </div>
    </div>
  );
}
