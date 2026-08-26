import type { Metadata } from 'next';
import { Suspense } from 'react';
import Script from 'next/script';
import { Libre_Caslon_Text, DM_Sans } from 'next/font/google';
import '../globals.css';
import SmoothScroll from '../components/SmoothScroll';
import MetaPixelRouteTracker from '../components/MetaPixelRouteTracker';
import { getDictionary } from '@/lib/dictionary';
import { i18n, type Locale } from '@/i18n.config';

const META_PIXEL_ID = '3075194439342174';

const caslon = Libre_Caslon_Text({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caslon',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm',
});

const SITE_URL = 'https://www.marbaysolutions.com';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.home.title,
      template: `%s | MarBay Solutions`,
    },
    description: dict.meta.home.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(i18n.locales.map((locale) => [locale, `/${locale}`])),
    },
    openGraph: {
      type: 'website',
      siteName: 'MarBay Solutions',
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      url: `/${lang}`,
      locale: lang === 'sr' ? 'sr_RS' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.home.title,
      description: dict.meta.home.description,
    },
  };
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{lang: string}> }) {
  const resolvedParams = await params;
  return (
    <html lang={resolvedParams.lang} className={`${caslon.variable} ${dmSans.variable} light scroll-smooth`}>
      <body className="w-full min-w-0 bg-background text-on-background font-body-md antialiased selection:bg-primary-fixed selection:text-on-primary-fixed" suppressHydrationWarning>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <Suspense fallback={null}>
          <MetaPixelRouteTracker />
        </Suspense>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
