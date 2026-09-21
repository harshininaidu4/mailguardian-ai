import { isIP } from 'node:net';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

type IpinfoLookup = {
  ip?: string;
  geo?: {
    city?: string;
    region?: string;
    country?: string;
    country_code?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
  };
  as?: { asn?: string; name?: string; domain?: string; type?: string };
  is_anonymous?: boolean;
  is_hosting?: boolean;
};

function isPublicIp(ip: string): boolean {
  if (isIP(ip) === 4) {
    const [first, second] = ip.split('.').map(Number);
    if (first === 0 || first === 10 || first === 127 || first >= 224) return false;
    if (first === 169 && second === 254) return false;
    if (first === 172 && second >= 16 && second <= 31) return false;
    if (first === 192 && (second === 0 || second === 168)) return false;
    if (first === 198 && (second === 18 || second === 19 || second === 51)) return false;
    if (first === 203 && second === 0) return false;
    return true;
  }

  if (isIP(ip) === 6) {
    const normalized = ip.toLowerCase();
    return normalized !== '::1' && !normalized.startsWith('fc') && !normalized.startsWith('fd') && !normalized.startsWith('fe80:') && !normalized.startsWith('2001:db8:');
  }

  return false;
}

export async function POST(request: NextRequest) {
  let ip: unknown;

  try {
    ({ ip } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Send a JSON body containing an IP address.' }, { status: 400 });
  }

  if (typeof ip !== 'string' || !isPublicIp(ip.trim())) {
    return NextResponse.json({ error: 'Enter a valid public IPv4 or IPv6 address.' }, { status: 400 });
  }

  const token = process.env.IPINFO_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'IP geolocation is not configured. Add IPINFO_TOKEN to .env.local.' }, { status: 503 });
  }

  const senderIp = ip.trim();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(`https://api.ipinfo.io/lookup/${encodeURIComponent(senderIp)}?token=${encodeURIComponent(token)}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'The geolocation provider could not look up this address.' }, { status: 502 });
    }

    const data = (await response.json()) as IpinfoLookup;
    if (!data.geo?.country) {
      return NextResponse.json({ error: 'No location data is available for this address.' }, { status: 404 });
    }

    return NextResponse.json({
      ip: data.ip ?? senderIp,
      city: data.geo.city ?? null,
      region: data.geo.region ?? null,
      country: data.geo.country,
      countryCode: data.geo.country_code ?? null,
      latitude: data.geo.latitude ?? null,
      longitude: data.geo.longitude ?? null,
      timezone: data.geo.timezone ?? null,
      network: data.as?.name ?? null,
      asn: data.as?.asn ?? null,
      isAnonymous: data.is_anonymous ?? false,
      isHosting: data.is_hosting ?? false,
      accuracy: 'IP-based location is approximate and may identify a VPN, proxy, or provider instead of the sender.',
    });
  } catch {
    return NextResponse.json({ error: 'The geolocation service is temporarily unavailable.' }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
