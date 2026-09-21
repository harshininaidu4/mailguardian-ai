import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, description, align = 'center', className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}>
      {eyebrow ? (
        <Badge variant="outline" className="mb-5">
          {eyebrow}
        </Badge>
      ) : null}
      <h2 id={id} className="text-balance text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className={cn('mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg', align === 'center' && 'mx-auto max-w-2xl')}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
