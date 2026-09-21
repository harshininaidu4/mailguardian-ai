'use client';

import { useId, useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface LeadFormProps {
  source: 'trial' | 'newsletter';
  buttonLabel: string;
  placeholder?: string;
  label: string;
  successMessage: string;
  size?: 'default' | 'lg';
  className?: string;
}

/** Email capture form that posts to /api/lead. Includes a honeypot field and accessible status messages. */
export function LeadForm({ source, buttonLabel, placeholder = 'Work email', label, successMessage, size = 'lg', className }: LeadFormProps) {
  const inputId = useId();
  const statusId = useId();
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, company: honeypot }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong. Try again in a moment.');
        return;
      }
      setStatus('success');
      setMessage(successMessage);
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('We could not reach the server. Check your connection and try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('w-full', className)}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={inputId} className="sr-only">
            {label}
          </label>
          <Input
            id={inputId}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            aria-invalid={status === 'error'}
            aria-describedby={message ? statusId : undefined}
            className={size === 'default' ? 'h-11' : undefined}
          />
        </div>
        {/* Honeypot: hidden from people and assistive tech, tempting to bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </label>
        </div>
        <Button type="submit" size={size} disabled={status === 'loading'} className="sm:w-auto">
          {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {buttonLabel}
          {status !== 'loading' ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
        </Button>
      </div>
      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className={cn('mt-3 flex min-h-5 items-center gap-2 text-sm', status === 'success' ? 'text-success' : 'text-destructive')}
      >
        {message ? (
          <>
            {status === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
            {message}
          </>
        ) : null}
      </p>
    </form>
  );
}
