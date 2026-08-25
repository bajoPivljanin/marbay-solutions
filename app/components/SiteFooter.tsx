import Link from "next/link";
import { Bitcoin } from "lucide-react";

type FooterLabels = {
  copyright: string;
  privacy: string;
  terms: string;
  linkedin: string;
  instagram: string;
  crypto: string;
};

type SiteFooterProps = {
  lang: string;
  footer: FooterLabels;
};

export default function SiteFooter({ lang, footer }: SiteFooterProps) {
  return (
    <footer className="w-full py-section-gap bg-zinc-950 border-t border-zinc-800 mt-auto">
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-gutter">
        <div>
          <Link
            className="font-headline-sm text-headline-sm text-zinc-100 mb-4 block hover:opacity-80 transition-opacity duration-300"
            href={`/${lang}`}
          >
            MarBay Solutions
          </Link>
          <p className="font-body-md text-body-md text-zinc-400">{footer.copyright}</p>
        </div>
        <nav className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 w-full lg:w-auto">
          <Link
            className="font-body-md text-body-md text-zinc-400 hover:text-zinc-100 transition-colors duration-300"
            href="#"
          >
            {footer.privacy}
          </Link>
          <Link
            className="font-body-md text-body-md text-zinc-400 hover:text-zinc-100 transition-colors duration-300"
            href="#"
          >
            {footer.terms}
          </Link>
          <Link
            className="font-body-md text-body-md text-zinc-400 hover:text-zinc-100 transition-colors duration-300"
            href="#"
          >
            {footer.linkedin}
          </Link>
          <Link
            className="font-body-md text-body-md text-zinc-400 hover:text-zinc-100 transition-colors duration-300"
            href="#"
          >
            {footer.instagram}
          </Link>
        </nav>
      </div>
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop mt-8 pt-6 border-t border-zinc-800">
        <p className="flex items-center gap-2 font-body-md text-body-md text-sm text-zinc-500">
          <Bitcoin className="w-4 h-4 shrink-0" strokeWidth={1.5} />
          {footer.crypto}
        </p>
      </div>
    </footer>
  );
}
