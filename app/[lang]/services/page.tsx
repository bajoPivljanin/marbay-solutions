import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, MonitorSmartphone, Search, Layout, Target, PenTool, LineChart, GitMerge, Code, Database } from "lucide-react";
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
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 md:pt-32 lg:pt-40 pb-section-gap">
          <div className="space-y-32 md:space-y-48 lg:space-y-64">
            
            {/* Service 1 */}
            <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-gutter items-start">
              <div className="md:col-span-1">
                <span className="font-label-caps text-label-caps text-tertiary-fixed-dim">01</span>
              </div>
              <div className="md:col-span-6">
                <h2 className="font-headline-md text-3xl md:text-4xl text-primary mb-6">{dict.services.webDevTitle}</h2>
                <p className="font-body-md text-lg text-on-surface-variant leading-relaxed">
                  {dict.services.webDevDesc}
                </p>
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <h3 className="font-label-caps text-[10px] uppercase tracking-widest text-tertiary mb-6 border-b border-outline-variant/30 pb-2">
                  {dict.services.deliverables}
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <MonitorSmartphone className="w-5 h-5 text-tertiary shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <span className="font-body-md font-medium text-on-surface block">{dict.services.responsive}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Search className="w-5 h-5 text-tertiary shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <span className="font-body-md font-medium text-on-surface block">{dict.services.seo}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Layout className="w-5 h-5 text-tertiary shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <span className="font-body-md font-medium text-on-surface block">{dict.services.cms}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </article>

            {/* Service 2 */}
            <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-gutter items-start pt-16 md:pt-0 border-t border-outline-variant/30 md:border-t-0">
              <div className="md:col-span-1">
                <span className="font-label-caps text-label-caps text-tertiary-fixed-dim">02</span>
              </div>
              <div className="md:col-span-6">
                <h2 className="font-headline-md text-3xl md:text-4xl text-primary mb-6">{dict.services.adsTitle}</h2>
                <p className="font-body-md text-lg text-on-surface-variant leading-relaxed">
                  {dict.services.adsDesc}
                </p>
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <h3 className="font-label-caps text-[10px] uppercase tracking-widest text-tertiary mb-6 border-b border-outline-variant/30 pb-2">
                  {dict.services.deliverables}
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <Target className="w-5 h-5 text-tertiary shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <span className="font-body-md font-medium text-on-surface block">{dict.services.targeting}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <PenTool className="w-5 h-5 text-tertiary shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <span className="font-body-md font-medium text-on-surface block">{dict.services.creative}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <LineChart className="w-5 h-5 text-tertiary shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <span className="font-body-md font-medium text-on-surface block">{dict.services.reporting}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </article>

            {/* Service 3 */}
            <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-gutter items-start pt-16 md:pt-0 border-t border-outline-variant/30 md:border-t-0">
              <div className="md:col-span-1">
                <span className="font-label-caps text-label-caps text-tertiary-fixed-dim">03</span>
              </div>
              <div className="md:col-span-6">
                <h2 className="font-headline-md text-3xl md:text-4xl text-primary mb-6">{dict.services.webAppsTitle}</h2>
                <p className="font-body-md text-lg text-on-surface-variant leading-relaxed">
                  {dict.services.webAppsDesc}
                </p>
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <h3 className="font-label-caps text-[10px] uppercase tracking-widest text-tertiary mb-6 border-b border-outline-variant/30 pb-2">
                  {dict.services.deliverables}
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <GitMerge className="w-5 h-5 text-tertiary shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <span className="font-body-md font-medium text-on-surface block">{dict.services.userFlow}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Code className="w-5 h-5 text-tertiary shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <span className="font-body-md font-medium text-on-surface block">{dict.services.apiIntegration}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Database className="w-5 h-5 text-tertiary shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <span className="font-body-md font-medium text-on-surface block">{dict.services.dbArch}</span>
                    </div>
                  </li>
                </ul>
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
