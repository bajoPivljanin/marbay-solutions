import { ImageResponse } from 'next/og';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/i18n.config';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#1b1c19',
          color: '#fbf9f4',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', width: '64px', height: '2px', backgroundColor: '#bccbb9', marginBottom: '40px' }} />
        <div style={{ display: 'flex', fontSize: 30, color: '#bccbb9', letterSpacing: '0.1em', marginBottom: '24px' }}>
          MARBAY SOLUTIONS
        </div>
        <div style={{ display: 'flex', fontSize: 64, lineHeight: 1.15, maxWidth: '900px' }}>
          {dict.meta.home.title}
        </div>
      </div>
    ),
    { ...size }
  );
}
