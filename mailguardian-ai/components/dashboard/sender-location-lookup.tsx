'use client';

import { FormEvent, useState } from 'react';
import { Globe2, Loader2, Search } from 'lucide-react';

type LookupResult = {
  ip: string;
  city: string | null;
  region: string | null;
  country: string;
  countryCode: string | null;
  latitude: number | null;
  longitude: number | null;
  timezone: string | null;
  network: string | null;
  asn: string | null;
  isAnonymous: boolean;
  isHosting: boolean;
  accuracy: string;
};

export function SenderLocationLookup() {
  const [ip, setIp] = useState('');
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch('/api/geolocate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip }),
      });
      const data = (await response.json()) as LookupResult | { error: string };

      if (!response.ok || 'error' in data) {
        setError('error' in data ? data.error : 'Could not look up this address.');
        return;
      }

      setResult(data);
    } catch {
      setError('Could not reach the local geolocation endpoint.');
    } finally {
      setLoading(false);
    }
  }

  const location = result ? [result.city, result.region, result.country].filter(Boolean).join(', ') : '';

  return (
    <section className="mt-10 rounded-2xl border border-border bg-card/40 p-5 sm:p-6" aria-labelledby="sender-location-heading">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
          <Globe2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 id="sender-location-heading" className="font-display text-lg font-semibold">Sender IP location lookup</h2>
          <p className="mt-1 text-sm text-muted-foreground">Paste the public originating IP from a trusted <code>Received</code> email header. Do not use the sample dashboard IPs; they are deliberately non-routable.</p>
        </div>
      </div>

      <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="sender-ip">Sender IP address</label>
        <input
          id="sender-ip"
          value={ip}
          onChange={(event) => setIp(event.target.value)}
          placeholder="Example: 8.8.8.8"
          inputMode="text"
          autoComplete="off"
          className="h-11 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 font-mono text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/25"
        />
        <button type="submit" disabled={loading} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Search className="h-4 w-4" aria-hidden="true" />}
          Look up IP
        </button>
      </form>

      {error ? <p className="mt-3 text-sm text-destructive" role="alert">{error}</p> : null}
      {result ? (
        <div className="mt-5 rounded-xl border border-border/70 bg-background/60 p-4 text-sm">
          <p className="font-medium">{location}</p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">{result.ip}{result.asn ? ` · ${result.asn}` : ''}{result.network ? ` · ${result.network}` : ''}</p>
          <p className="mt-3 text-xs text-muted-foreground">Coordinates: {result.latitude ?? 'not available'}, {result.longitude ?? 'not available'}{result.timezone ? ` · ${result.timezone}` : ''}</p>
          {result.isAnonymous || result.isHosting ? <p className="mt-2 text-xs text-amber-300">Network flag: {result.isAnonymous ? 'anonymous/proxy-like' : 'hosting provider'}.</p> : null}
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{result.accuracy}</p>
        </div>
      ) : null}
    </section>
  );
}
