import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n.config";

export default async function ArchivePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  const lang = resolvedParams.lang;

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader
        lang={lang}
        nav={dict.nav}
        activePage="archive"
        ctaText={dict.nav.letsTalk}
        ctaHref={`/${lang}/#connect`}
      />

      {/* Archive Header */}
      <section className="bg-surface pt-32 pb-20 md:pt-48 md:pb-32 w-full border-b border-outline-variant/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col items-start text-left">
          <div className="w-full flex items-end border-b border-outline/30 pb-4 mb-10">
            <Link href={`/${lang}`} className="font-label-caps text-label-caps text-primary hover:text-secondary uppercase transition-colors inline-flex items-center gap-2 shrink-0">
              <ArrowLeft className="w-4 h-4" /> {dict.common.backHome}
            </Link>
          </div>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 text-on-surface">
            {dict.archive.title}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-on-surface-variant leading-relaxed">
            {dict.archive.subtitle}
          </p>
        </div>
      </section>

      {/* Archive Grid */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-x-gutter">
          {projects.map((project) => (
            <Link href={`/${lang}/archive/${project.slug}`} key={project.slug} className="group cursor-pointer block">
              <div className={`relative w-full border border-outline/10 ${project.aspectRatio} mb-6 overflow-hidden`}>
                <Image src={project.image} alt={project.title} fill unoptimized className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" referrerPolicy="no-referrer" sizes="(max-width: 768px) 100vw, 50vw" />
                {/* Overlay with Blur and Text */}
                <div className="absolute inset-0 bg-surface/10 backdrop-blur-[2px] transition-all duration-500 z-10 flex items-center justify-center">
                  <span className="bg-on-surface text-surface shadow-xl font-label-caps text-xs md:text-sm tracking-wider uppercase px-8 py-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {dict.common.viewProject}
                  </span>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-secondary-fixed text-on-secondary-fixed font-label-caps text-[10px] px-3 py-1 rounded-full uppercase">{project.type}</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline-sm text-headline-sm mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md">{project.shortDescription}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter lang={lang} footer={dict.footer} />
    </div>
  );
}
