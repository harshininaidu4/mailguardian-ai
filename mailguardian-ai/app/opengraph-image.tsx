import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'MailGuardian AI: AI email threat detection, geolocation and forensics';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          color: '#f4f7fb',
          background: 'linear-gradient(135deg, #0b1020 0%, #05070f 45%, #140b2e 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              display: 'flex',
              background: 'linear-gradient(135deg, #31dff6, #9a64f7)',
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 700, display: 'flex' }}>MailGuardian AI</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            Stop email threats before they reach the inbox
          </div>
          <div style={{ fontSize: 30, color: '#9fb0c8', display: 'flex' }}>
            AI detection, IP geolocation and court-ready forensics.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, fontSize: 24, color: '#31dff6' }}>
          <div style={{ display: 'flex' }}>Phishing</div>
          <div style={{ display: 'flex', color: '#4b5b75' }}>/</div>
          <div style={{ display: 'flex' }}>BEC</div>
          <div style={{ display: 'flex', color: '#4b5b75' }}>/</div>
          <div style={{ display: 'flex' }}>Malware</div>
          <div style={{ display: 'flex', color: '#4b5b75' }}>/</div>
          <div style={{ display: 'flex' }}>Spear-phishing</div>
        </div>
      </div>
    ),
    size,
  );
}
