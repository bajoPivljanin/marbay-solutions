import type { Metadata } from 'next';
import { Libre_Caslon_Text, DM_Sans } from 'next/font/google';
import '../globals.css';
import SmoothScroll from '../components/SmoothScroll';

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

export const metadata: Metadata = {
  title: 'MarBay Solutions - Homepage',
  description: 'Bespoke Web Applications, Websites, and Strategic Meta Advertising for focused growth.',
};

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
