import Image from "next/image";
import Link from "next/link";
import {
  Blocks,
  Network,
  AppWindow,
  MonitorSmartphone,
  Megaphone,
  LineChart,
  ArrowRight,
  Mail,
  MapPin
} from "lucide-react";
import PricingComparison from "../components/PricingComparison";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n.config";

export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  const lang = resolvedParams.lang;

  return (
    <div className="flex flex-col min-h-screen w-full min-w-0 overflow-x-clip">
      <SiteHeader
        lang={lang}
        nav={dict.nav}
        activePage="home"
        ctaText={dict.nav.letsTalk}
        ctaHref={`/${lang}/#connect`}
      />

      {/* Hero Section */}
      <section className="w-full max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col items-center justify-center text-center py-20 sm:py-28 lg:py-section-gap">
        <div className="w-16 h-px bg-tertiary mb-8 mx-auto" />
        <h1 className="font-display-lg-mobile w-full min-w-0 mx-auto mb-6 text-on-surface text-center whitespace-pre-line break-normal sm:break-words px-1 text-[2.125rem] leading-[1.25] tracking-[-0.02em] sm:text-[3.375rem] sm:leading-[1.15] md:text-[4.25rem] md:leading-[1.12] lg:text-[5rem] lg:leading-[1.1] xl:text-[5.5rem] xl:leading-[1.08] max-w-[17.5rem] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl">
          {dict.hero.title}
        </h1>
        <p className="font-body-lg text-body-lg w-full max-w-2xl mx-auto text-on-surface-variant mb-10 sm:mb-12 text-balance">
          {dict.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center w-full max-w-sm sm:max-w-none mx-auto">
          <Link href={`/${lang}/archive`} className="bg-primary text-on-primary font-label-caps text-label-caps uppercase px-8 py-4 rounded hover:bg-surface-tint transition-colors duration-300 text-center">
            {dict.hero.explore}
          </Link>
          <Link href={`/${lang}/#connect`} className="bg-transparent text-tertiary font-label-caps text-label-caps uppercase px-8 py-4 rounded border border-outline hover:bg-surface-container-low transition-colors duration-300 text-center">
            {dict.hero.startConv}
          </Link>
        </div>
      </section>

      {/* Our Capabilities */}
      <section className="bg-surface-container-low py-section-gap w-full">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-headline-md text-headline-md mb-16 text-center text-on-surface">{dict.capabilities.title}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            {/* Capability 1 */}
            <div className="bg-surface p-10 border border-outline-variant/30 group hover:bg-surface-bright transition-colors duration-500">
              <Blocks className="w-10 h-10 text-primary mb-6" />
              <h3 className="font-headline-sm text-headline-sm mb-4">{dict.capabilities.webApps}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                {dict.capabilities.webAppsDesc}
              </p>
              <div className="h-32 border border-outline/20 relative overflow-hidden flex items-center justify-center bg-surface-container-lowest">
                <Network className="w-16 h-16 text-tertiary/50" />
              </div>
            </div>
            {/* Capability 2 */}
            <div className="bg-surface p-10 border border-outline-variant/30 group hover:bg-surface-bright transition-colors duration-500">
              <AppWindow className="w-10 h-10 text-primary mb-6" />
              <h3 className="font-headline-sm text-headline-sm mb-4">{dict.capabilities.webDev}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                {dict.capabilities.webDevDesc}
              </p>
              <div className="h-32 border border-outline/20 relative overflow-hidden flex items-center justify-center bg-surface-container-lowest">
                <MonitorSmartphone className="w-16 h-16 text-tertiary/50" />
              </div>
            </div>
            {/* Capability 3 */}
            <div className="bg-surface p-10 border border-outline-variant/30 group hover:bg-surface-bright transition-colors duration-500">
              <Megaphone className="w-10 h-10 text-primary mb-6" />
              <h3 className="font-headline-sm text-headline-sm mb-4">{dict.capabilities.ads}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                {dict.capabilities.adsDesc}
              </p>
              <div className="h-32 border border-outline/20 relative overflow-hidden flex items-center justify-center bg-surface-container-lowest">
                <LineChart className="w-16 h-16 text-tertiary/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PricingComparison dict={dict} />

      {/* Selected References */}
      <section className="w-full py-section-gap">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop w-full min-w-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end mb-16 border-b border-outline/30 pb-4">
          <h2 className="font-headline-md text-headline-md text-on-surface break-words min-w-0">{dict.references.title}</h2>
          <Link href={`/${lang}/archive`} className="font-label-caps text-label-caps text-primary hover:text-secondary uppercase transition-colors inline-flex items-center gap-2 shrink-0 self-start sm:self-auto">
            {dict.references.viewArchive} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-gutter">
          {/* Reference 1 */}
          <Link href={`/${lang}/archive/dekant.rs`} className="lg:col-span-8 group cursor-pointer block">
            <div className="relative w-full border border-outline/10 aspect-[4/3] mb-6 overflow-hidden">
              <Image 
                src="/projects/dekant.rs/dekantrs-marbay.png" 
                alt="Web Application Mockup" 
                fill
                unoptimized
                className="object-cover md:group-hover:scale-105 transition-transform duration-700 ease-out" 
                referrerPolicy="no-referrer"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              {/* Overlay with Blur and Text */}
              <div className="absolute inset-0 bg-surface/10 backdrop-blur-[2px] transition-all duration-500 z-10 flex items-center justify-center">
                <span className="bg-on-surface text-surface shadow-xl font-label-caps text-xs md:text-sm tracking-wider uppercase px-8 py-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {dict.common.viewProject}
                </span>
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-secondary-fixed text-on-secondary-fixed font-label-caps text-[10px] px-3 py-1 rounded-full uppercase">{dict.references.webApp}</span>
              </div>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-2 group-hover:text-primary transition-colors">{dict.references.finDash}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
              {dict.references.finDashDesc}
            </p>
          </Link>
          {/* Reference 2 */}
          <Link href={`/${lang}/archive/perfect-studio`} className="lg:col-span-4 lg:mt-24 group cursor-pointer block">
            <div className="relative w-full border border-outline/10 aspect-[4/3] mb-6 overflow-hidden">
              <Image 
                src="/projects/perfect-studio/perfect-studio-marbay.png" 
                alt="Mobile Website Mockup" 
                fill
                unoptimized
                className="object-cover md:group-hover:scale-105 transition-transform duration-700 ease-out" 
                referrerPolicy="no-referrer"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              {/* Overlay with Blur and Text */}
              <div className="absolute inset-0 bg-surface/10 backdrop-blur-[2px] transition-all duration-500 z-10 flex items-center justify-center">
                <span className="bg-on-surface text-surface shadow-xl font-label-caps text-xs md:text-sm tracking-wider uppercase px-8 py-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {dict.common.viewProject}
                </span>
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-secondary-fixed text-on-secondary-fixed font-label-caps text-[10px] px-3 py-1 rounded-full uppercase">{dict.references.website}</span>
              </div>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-2 group-hover:text-primary transition-colors">{dict.references.botanical}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {dict.references.botanicalDesc}
            </p>
          </Link>
        </div>
        </div>
      </section>

      {/* Start a Conversation */}
      <section id="connect" className="bg-surface-container-high py-section-gap w-full">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-gutter items-start lg:items-center">
          <div>
            <h2 className="font-headline-md text-headline-md mb-6 text-on-surface">{dict.connect.title}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-md">
              {dict.connect.subtitle}
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-tertiary">
                <Mail className="w-6 h-6" />
                <span className="font-body-md">marko@marbaysolutions.com</span>
              </div>
              <div className="flex items-center gap-4 text-tertiary">
                <MapPin className="w-6 h-6" />
                <span className="font-body-md">{dict.connect.address}</span>
              </div>
            </div>
          </div>
          <div className="bg-surface p-8 lg:p-12 border border-outline-variant/30 w-full">
            <form className="flex flex-col gap-8">
              <div className="relative pt-4">
                <input 
                  className="w-full bg-transparent border-0 border-b border-outline/40 py-2 focus:ring-0 focus:border-primary transition-colors peer text-on-surface focus:outline-none" 
                  id="name" 
                  placeholder=" " 
                  required 
                  type="text" 
                />
                <label 
                  className="absolute left-0 top-6 font-label-caps text-label-caps text-on-surface-variant transition-all peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] uppercase pointer-events-none" 
                  htmlFor="name"
                >
                  {dict.connect.name}
                </label>
              </div>
              <div className="relative pt-4">
                <input 
                  className="w-full bg-transparent border-0 border-b border-outline/40 py-2 focus:ring-0 focus:border-primary transition-colors peer text-on-surface focus:outline-none" 
                  id="email" 
                  placeholder=" " 
                  required 
                  type="email" 
                />
                <label 
                  className="absolute left-0 top-6 font-label-caps text-label-caps text-on-surface-variant transition-all peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] uppercase pointer-events-none" 
                  htmlFor="email"
                >
                  {dict.connect.email}
                </label>
              </div>
              <div className="relative pt-4">
                <textarea 
                  className="w-full bg-transparent border-0 border-b border-outline/40 py-2 focus:ring-0 focus:border-primary transition-colors peer text-on-surface resize-none focus:outline-none" 
                  id="message" 
                  placeholder=" " 
                  required 
                  rows={3} 
                />
                <label 
                  className="absolute left-0 top-6 font-label-caps text-label-caps text-on-surface-variant transition-all peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] uppercase pointer-events-none" 
                  htmlFor="message"
                >
                  {dict.connect.details}
                </label>
              </div>
              <button className="bg-primary text-on-primary font-label-caps text-label-caps uppercase px-8 py-4 rounded hover:bg-surface-tint transition-colors duration-300 w-full mt-4" type="submit">
                {dict.connect.submit}
              </button>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} footer={dict.footer} />
    </div>
  );
}
