import type { MetadataRoute } from 'next';
import { i18n } from '@/i18n.config';
import { projects } from '@/lib/data';

const SITE_URL = 'https://www.marbaysolutions.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/services', '/archive', ...projects.map((p) => `/archive/${p.slug}`)];

  return routes.map((route) => ({
    url: `${SITE_URL}/${i18n.defaultLocale}${route}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(i18n.locales.map((locale) => [locale, `${SITE_URL}/${locale}${route}`])),
    },
  }));
}
