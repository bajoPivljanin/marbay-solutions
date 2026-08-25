import type { Metadata } from 'next';
import { Libre_Caslon_Text, DM_Sans } from 'next/font/google';
import '../globals.css';
import SmoothScroll from '../components/SmoothScroll';
import { getDictionary } from '@/lib/dictionary';
import { i18n, type Locale } from '@/i18n.config';

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
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
