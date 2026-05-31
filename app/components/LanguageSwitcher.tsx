"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  
  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    if (segments[1] === "en" || segments[1] === "sr") {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale); // fallback just in case
    }
    return segments.join("/");
  };

  return (
    <div className="flex items-center gap-3 font-label-caps tracking-widest text-[10px] lg:ml-4 pt-1">
      <Link href={redirectedPathName("en")} className={pathname?.startsWith("/en") ? "text-primary font-bold shadow-sm" : "text-on-surface-variant hover:text-primary transition-colors"}>
        EN
      </Link>
      <span className="text-outline/40">|</span>
      <Link href={redirectedPathName("sr")} className={pathname?.startsWith("/sr") ? "text-primary font-bold shadow-sm" : "text-on-surface-variant hover:text-primary transition-colors"}>
        SR
      </Link>
    </div>
  );
}
