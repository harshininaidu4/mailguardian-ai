'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Tiny dependency-free highlighter tuned for the JSON / curl samples on this site. */
const TOKEN_RE =
  /(#[^\n]*)|("(?:\\.|[^"\\])*")(\s*:)?|('(?:\\.|[^'\\])*')|\b(true|false|null)\b|(-?\b\d+(?:\.\d+)?\b)|(?<=\s)(--?[a-zA-Z][\w-]*)|\b(curl|POST|GET)\b/g;

function highlight(code: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let key = 0;
  for (const match of code.matchAll(TOKEN_RE)) {
    const index = match.index ?? 0;
    if (index > cursor) nodes.push(code.slice(cursor, index));
    const [full, comment, str, colon, single, literal, num, flag, keyword] = match;
    let className = '';
    let text = full;
    if (comment) className = 'text-muted-foreground/70 italic';
    else if (str) {
      if (colon) {
        className = 'text-primary';
        text = str;
        nodes.push(
          <span key={key++} className={className}>
            {text}
          </span>,
        );
        nodes.push(colon);
        cursor = index + full.length;
        continue;
      }
      className = 'text-success';
    } else if (single) className = 'text-success';
    else if (literal) className = 'text-accent';
    else if (num) className = 'text-warning';
    else if (flag) className = 'text-accent';
    else if (keyword) className = 'text-primary';
    nodes.push(
      <span key={key++} className={className}>
        {text}
      </span>,
    );
    cursor = index + full.length;
  }
  if (cursor < code.length) nodes.push(code.slice(cursor));
  return nodes;
}

interface CodeBlockProps {
  code: string;
  title?: string;
  className?: string;
}

export function CodeBlock({ code, title, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={cn('glass overflow-hidden rounded-xl', className)}>
      <div className="flex items-center justify-between border-b border-border/70 px-4 py-2.5">
        <span className="font-mono text-xs text-muted-foreground">{title}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={copied ? 'Copied to clipboard' : `Copy ${title ?? 'code'} to clipboard`}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground/90" tabIndex={0}>
        <code>{highlight(code)}</code>
      </pre>
    </div>
  );
}
