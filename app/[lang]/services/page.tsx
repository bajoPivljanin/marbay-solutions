import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n.config";

export default async function ServicesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  const lang = resolvedParams.lang;

  const steps = [
    { step: "01", title: dict.services.discovery, desc: dict.services.discoveryDesc },
    { step: "02", title: dict.services.strategy, desc: dict.services.strategyDesc, mt: "md:mt-8" },
    { step: "03", title: dict.services.craft, desc: dict.services.craftDesc, mt: "md:mt-16" },
    { step: "04", title: dict.services.launch, desc: dict.services.launchDesc, mt: "md:mt-24" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface">
      <SiteHeader
        lang={lang}
        nav={dict.nav}
        activePage="services"
        ctaText={dict.services.startProject}
        ctaHref={`/${lang}/#connect`}
      />

      <main>
        {/* Hero Section */}
        <section className="bg-surface pt-32 pb-20 md:pt-48 md:pb-32 w-full border-b border-outline-variant/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col items-start text-left">
            <div className="w-full flex items-end border-b border-outline/30 pb-4 mb-10">
              <Link href={`/${lang}`} className="font-label-caps text-label-caps text-primary hover:text-secondary uppercase transition-colors inline-flex items-center gap-2 shrink-0">
                <ArrowLeft className="w-4 h-4" /> {dict.common.backHome}
              </Link>
            </div>
            <span className="font-label-caps text-label-caps text-secondary mb-4 block tracking-widest uppercase">{dict.services.discipline}</span>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 text-on-surface">
              {dict.services.title}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-on-surface-variant leading-relaxed">
              {dict.services.intro}
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap">
          <div className="space-y-32">
            {/* Service 1 */}
            <article className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start border-t border-outline-variant/30 pt-16">
              <div className="md:col-span-1 flex flex-col items-center">
                <span className="font-label-caps text-label-caps text-tertiary-fixed-dim">01</span>
                <div className="w-px h-16 bg-outline-variant/30 mt-4"></div>
              </div>
              <div className="md:col-span-5">
                <div className="aspect-[4/5] bg-surface-container-low border border-outline-variant/30 p-2 relative overflow-hidden group">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwq-G_3jlqBadA8dsTgC44Qf3pv71I-cxNHGcHgGlxSfO8VTisSVcpgmHyb6ZslzK40hwcS7iuHjxAFeIjO9HJcDyNSn2e8aEL_0juh86qtakg-6aA90fGkNV109oauy7Nj4uva0xQ06Ft7IQgJftO1QKD9R20FR0hlQZp3q1mgvyZUXngQsNLkT_XBwRJfrKIEmCpzk8dxJ8RCfvyQySaXw5Y4UjHgC6UieksvAxMvQyNVb_8tGRyzWe52IEMfvVJeSG4tZ0Ny0A" alt="Custom Web Applications" fill referrerPolicy="no-referrer" className="object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
                </div>
              </div>
              <div className="md:col-span-5 md:col-start-8 flex flex-col justify-center h-full">
                <h2 className="font-headline-md text-headline-md text-primary mb-6">{dict.services.webAppsTitle}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8">{dict.services.webAppsDesc}</p>
                <div className="border-t border-outline-variant/30 pt-6">
                  <h3 className="font-label-caps text-label-caps text-tertiary mb-4">{dict.services.deliverables}</h3>
                  <ul className="space-y-4">
                    <li className="font-body-md text-body-md text-on-surface flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></span>{dict.services.userFlow}</li>
                    <li className="font-body-md text-body-md text-on-surface flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></span>{dict.services.apiIntegration}</li>
                    <li className="font-body-md text-body-md text-on-surface flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></span>{dict.services.dbArch}</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Service 2 */}
            <article className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start border-t border-outline-variant/30 pt-16">
              <div className="md:col-span-1 flex flex-col items-center md:order-last">
                <span className="font-label-caps text-label-caps text-tertiary-fixed-dim">02</span>
                <div className="w-px h-16 bg-outline-variant/30 mt-4"></div>
              </div>
              <div className="md:col-span-5 md:col-start-2 flex flex-col justify-center h-full md:order-1">
                <h2 className="font-headline-md text-headline-md text-primary mb-6">{dict.services.webDevTitle}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8">{dict.services.webDevDesc}</p>
                <div className="border-t border-outline-variant/30 pt-6">
                  <h3 className="font-label-caps text-label-caps text-tertiary mb-4">{dict.services.deliverables}</h3>
                  <ul className="space-y-4">
                    <li className="font-body-md text-body-md text-on-surface flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></span>{dict.services.responsive}</li>
                    <li className="font-body-md text-body-md text-on-surface flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></span>{dict.services.seo}</li>
                    <li className="font-body-md text-body-md text-on-surface flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></span>{dict.services.cms}</li>
                  </ul>
                </div>
              </div>
              <div className="md:col-span-5 md:col-start-7 md:order-2">
                <div className="aspect-[4/5] bg-surface-container-low border border-outline-variant/30 p-2 relative overflow-hidden group">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwq-G_3jlqBadA8dsTgC44Qf3pv71I-cxNHGcHgGlxSfO8VTisSVcpgmHyb6ZslzK40hwcS7iuHjxAFeIjO9HJcDyNSn2e8aEL_0juh86qtakg-6aA90fGkNV109oauy7Nj4uva0xQ06Ft7IQgJftO1QKD9R20FR0hlQZp3q1mgvyZUXngQsNLkT_XBwRJfrKIEmCpzk8dxJ8RCfvyQySaXw5Y4UjHgC6UieksvAxMvQyNVb_8tGRyzWe52IEMfvVJeSG4tZ0Ny0A" alt="Website Development" fill referrerPolicy="no-referrer" className="object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
                </div>
              </div>
            </article>

            {/* Service 3 */}
            <article className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start border-t border-outline-variant/30 pt-16">
              <div className="md:col-span-1 flex flex-col items-center">
                <span className="font-label-caps text-label-caps text-tertiary-fixed-dim">03</span>
                <div className="w-px h-16 bg-outline-variant/30 mt-4"></div>
              </div>
              <div className="md:col-span-5">
                <div className="aspect-[4/5] bg-surface-container-low border border-outline-variant/30 p-2 relative overflow-hidden group">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwq-G_3jlqBadA8dsTgC44Qf3pv71I-cxNHGcHgGlxSfO8VTisSVcpgmHyb6ZslzK40hwcS7iuHjxAFeIjO9HJcDyNSn2e8aEL_0juh86qtakg-6aA90fGkNV109oauy7Nj4uva0xQ06Ft7IQgJftO1QKD9R20FR0hlQZp3q1mgvyZUXngQsNLkT_XBwRJfrKIEmCpzk8dxJ8RCfvyQySaXw5Y4UjHgC6UieksvAxMvQyNVb_8tGRyzWe52IEMfvVJeSG4tZ0Ny0A" alt="Meta Advertising" fill referrerPolicy="no-referrer" className="object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
                </div>
              </div>
              <div className="md:col-span-5 md:col-start-8 flex flex-col justify-center h-full">
                <h2 className="font-headline-md text-headline-md text-primary mb-6">{dict.services.adsTitle}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8">{dict.services.adsDesc}</p>
                <div className="border-t border-outline-variant/30 pt-6">
                  <h3 className="font-label-caps text-label-caps text-tertiary mb-4">{dict.services.deliverables}</h3>
                  <ul className="space-y-4">
                    <li className="font-body-md text-body-md text-on-surface flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></span>{dict.services.targeting}</li>
                    <li className="font-body-md text-body-md text-on-surface flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></span>{dict.services.creative}</li>
                    <li className="font-body-md text-body-md text-on-surface flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></span>{dict.services.reporting}</li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-surface-container-low py-section-gap border-t border-outline-variant/20 w-full">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary tracking-tight">{dict.services.process}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-4 max-w-2xl mx-auto">{dict.services.processSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map(({ step, title, desc, mt }) => (
                <div key={step} className={`p-8 bg-surface border border-outline-variant/20 hover:border-outline-variant/60 transition-colors duration-300 ${mt ?? ""}`}>
                  <div className="font-label-caps text-label-caps text-tertiary-fixed-dim mb-6">{dict.services.step} {step}</div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-3">{title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap text-center">
          <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-8 tracking-tight">{dict.services.readyTitle}</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-xl mx-auto">
            {dict.services.readyDesc}
          </p>
          <Link href={`/${lang}/#connect`} className="inline-flex items-center justify-center gap-3 bg-primary text-on-primary px-8 py-4 rounded hover:bg-surface-tint transition-colors duration-300 font-label-caps text-label-caps uppercase tracking-widest group">
            {dict.services.initiate}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>
      </main>

      <SiteFooter lang={lang} footer={dict.footer} />
    </div>
  );
}
