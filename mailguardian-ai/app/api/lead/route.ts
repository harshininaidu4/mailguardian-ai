import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Captures trial / newsletter sign-ups.
 * - Validates the address and drops honeypot hits silently.
 * - If LEAD_WEBHOOK_URL is set, forwards the lead there as JSON (Slack, Zapier, CRM proxy...).
 * - For production traffic, add rate limiting at your edge (Vercel Firewall, Cloudflare, etc.).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real visitors never fill this field. Pretend success so bots learn nothing.
  if (typeof body.company === 'string' && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Enter a valid work email address.' }, { status: 400 });
  }

  const lead = {
    email,
    source: body.source === 'newsletter' ? 'newsletter' : 'trial',
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
    } catch (error) {
      console.error('[lead] webhook delivery failed', error);
      return NextResponse.json({ ok: false, error: 'We could not save your request. Please try again.' }, { status: 502 });
    }
  } else if (process.env.NODE_ENV !== 'production') {
    console.info('[lead] captured (set LEAD_WEBHOOK_URL to forward)', lead);
  }

  return NextResponse.json({ ok: true });
}
