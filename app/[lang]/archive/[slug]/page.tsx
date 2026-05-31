import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/lib/data";
import { notFound } from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n.config";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string; lang: Locale }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);
  const dict = await getDictionary(resolvedParams.lang);
  const lang = resolvedParams.lang;

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader
        lang={lang}
        nav={dict.nav}
        activePage="archive"
        ctaText={dict.nav.letsTalk}
        ctaHref={`/${lang}/#connect`}
      />

      {/* Project Details */}
      <section className="bg-surface py-section-gap w-full flex-grow">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-4 md:mt-8">
          <Link href={`/${lang}/archive`} className="inline-flex items-center gap-2 font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" /> {dict.common.backArchive}
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16">
            <div className="lg:col-span-5 flex flex-col justify-start">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-secondary-fixed text-on-secondary-fixed font-label-caps text-[10px] px-3 py-1 rounded-full uppercase">{project.type}</span>
              </div>
              <h1 className="font-display-md-mobile text-display-md-mobile md:font-display-md md:text-display-md mb-8 text-on-surface">{project.title}</h1>
              <div className="w-16 h-px bg-tertiary mb-8"></div>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 whitespace-pre-wrap">{(project.fullDescription as any)[lang] || project.fullDescription}</p>
              <div className="mt-4">
                <h3 className="font-label-caps text-label-caps text-tertiary uppercase mb-4">{dict.archive.techUsed}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="bg-surface-container-low border border-outline/20 text-on-surface-variant font-label-m text-xs px-3 py-1.5 rounded">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="relative w-full border border-outline/10 aspect-[4/3] overflow-hidden shadow-xl shadow-surface-container-lowest/50">
                <Image src={project.image} alt={project.title} fill unoptimized className="object-cover" referrerPolicy="no-referrer" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      {(project as any).challenge && (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter mt-24">
          <div className="md:col-span-4">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6">{dict.archive.theChallenge}</h2>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">{(project as any).challenge?.[lang] || (project as any).challenge}</p>
          </div>
        </section>
      )}

      {/* Main Mockup */}
      {(project as any).mainMockup && (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
          <div className="border border-outline-variant/30 p-2 bg-surface-container-lowest">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
              <Image src={(project as any).mainMockup} alt={`${project.title} Mockup`} fill unoptimized className="object-cover" />
            </div>
          </div>
        </section>
      )}
      
      {/* The Solution */}
      {(project as any).solution && (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6">{dict.archive.theSolution}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-wrap">{(project as any).solution?.[lang] || (project as any).solution}</p>
          </div>
          {(project as any).solutionImage && (
            <div className="md:col-span-6 md:col-start-7 mt-12 md:mt-0">
              <div className="border border-outline-variant/30 bg-surface-container-low p-6">
                <div className="relative w-full aspect-square">
                  <Image src={(project as any).solutionImage} alt="Solution Detail" fill unoptimized className="object-cover" />
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Impact */}
      {(project as any).impact && (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-12 text-center md:text-left">{dict.archive.impact}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-gutter border-t border-outline-variant/30 pt-12">
            {(project as any).impact.map((imp: any, i: number) => (
              <div key={i} className="text-center md:text-left">
                <span className="block font-display-lg-mobile text-display-lg-mobile text-primary mb-4">{imp.stat}</span>
                <h3 className="font-body-lg text-body-lg text-on-surface">{imp.text}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {(project as any).gallery && (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {((project as any).gallery as string[]).map((imgUrl, idx) => (
              <div key={idx} className={`border border-outline-variant/30 p-2 bg-surface-container-lowest ${idx % 2 === 0 ? 'md:mt-24' : 'mb-24 md:mb-0'}`}>
                 <div className={`relative w-full ${idx % 2 === 0 ? 'aspect-[4/5]' : 'aspect-square'}`}>
                   <Image src={imgUrl} alt={`Gallery Image ${idx + 1}`} fill unoptimized className="object-cover" />
                 </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <SiteFooter lang={lang} footer={dict.footer} />
    </div>
  );
}
