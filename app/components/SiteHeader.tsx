"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

type ActivePage = "home" | "services" | "archive";
type SectionHash = "pricing" | "connect";

type NavLabels = {
  home: string;
  services: string;
  work: string;
  pricing: string;
  connect: string;
  openMenu: string;
  closeMenu: string;
};

type SiteHeaderProps = {
  lang: string;
  nav: NavLabels;
  activePage?: ActivePage;
  ctaText: string;
  ctaHref: string;
};

const linkBase =
  "font-body-md text-body-md transition-all duration-300";
const linkInactive =
  "text-on-surface-variant dark:text-surface-variant hover:text-secondary dark:hover:text-secondary-fixed-dim";
const linkActive =
  "text-primary dark:text-primary-fixed font-bold border-b-2 border-primary pb-1";

export default function SiteHeader({
  lang,
  nav,
  activePage,
  ctaText,
  ctaHref,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<SectionHash | null>(null);

  useEffect(() => {
    const sectionIds: SectionHash[] = ["pricing", "connect"];
    const sections = sectionIds
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((entry): entry is { id: SectionHash; el: HTMLElement } => entry.el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) {
          setActiveHash(null);
          return;
        }
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        const match = sections.find((entry) => entry.el === topMost.target);
        setActiveHash(match?.id ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navLinks: { href: string; label: string; page?: ActivePage; hash?: SectionHash }[] = [
    { href: `/${lang}`, label: nav.home, page: "home" },
    { href: `/${lang}/services`, label: nav.services, page: "services" },
    { href: `/${lang}/archive`, label: nav.work, page: "archive" },
    { href: `/${lang}/#pricing`, label: nav.pricing, hash: "pricing" },
    { href: `/${lang}/#connect`, label: nav.connect, hash: "connect" },
  ];

  const isLinkActive = (page?: ActivePage, hash?: SectionHash) =>
    activeHash ? hash === activeHash : page !== undefined && page === activePage;

  const linkClass = (page?: ActivePage, hash?: SectionHash) =>
    `${linkBase} ${isLinkActive(page, hash) ? linkActive : linkInactive}`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="w-full min-w-0 top-0 border-b border-outline-variant/30 dark:border-outline/20 bg-surface dark:bg-on-surface sticky z-50">
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop flex justify-between items-center h-20 gap-4">
        <Link
          className="font-headline-sm text-headline-sm text-primary dark:text-primary-fixed shrink-0 active:opacity-70 transition-opacity"
          href={`/${lang}`}
          onClick={closeMenu}
        >
          MarBay Solutions
        </Link>

        <nav className="hidden lg:flex gap-6 xl:gap-gutter items-center shrink min-w-0">
          {navLinks.map(({ href, label, page, hash }) => (
            <Link key={href} className={linkClass(page, hash)} href={href}>
              {label}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        <Link
          href={ctaHref}
          className="hidden lg:inline-flex shrink-0 bg-primary text-on-primary font-label-caps text-label-caps uppercase px-6 py-3 rounded hover:bg-surface-tint transition-colors duration-300"
        >
          {ctaText}
        </Link>

        <button
          type="button"
          className="lg:hidden text-primary p-2 -mr-2"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t border-outline-variant/30 dark:border-outline/20 bg-surface dark:bg-on-surface px-margin-mobile py-6 flex flex-col gap-5">
          {navLinks.map(({ href, label, page, hash }) => (
            <Link
              key={href}
              className={linkClass(page, hash)}
              href={href}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link
            href={ctaHref}
            className="inline-flex justify-center bg-primary text-on-primary font-label-caps text-label-caps uppercase px-6 py-3 rounded hover:bg-surface-tint transition-colors duration-300 mt-2"
            onClick={closeMenu}
          >
            {ctaText}
          </Link>
        </nav>
      )}
    </header>
  );
}
