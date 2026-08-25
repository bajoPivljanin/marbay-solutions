"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselItem = {
  icon: ReactNode;
  previewIcon: ReactNode;
  title: string;
  desc: string;
};

type ServiceCarouselProps = {
  items: CarouselItem[];
  prevLabel: string;
  nextLabel: string;
};

export default function ServiceCarousel({ items, prevLabel, nextLabel }: ServiceCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-carousel-card]");
    const gap = 32;
    const delta = (card ? card.offsetWidth : track.clientWidth) + gap;
    track.scrollBy({ left: direction * delta, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-gutter overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map(({ icon, previewIcon, title, desc }, i) => (
          <div
            key={i}
            data-carousel-card
            className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)] bg-surface p-10 border border-outline-variant/30 group hover:bg-surface-bright transition-colors duration-500"
          >
            {icon}
            <h3 className="font-headline-sm text-headline-sm mb-4">{title}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">{desc}</p>
            <div className="h-32 border border-outline/20 relative overflow-hidden flex items-center justify-center bg-surface-container-lowest">
              {previewIcon}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-10">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label={prevLabel}
          className="w-11 h-11 flex items-center justify-center border border-outline-variant/50 text-on-surface hover:bg-surface hover:border-outline transition-colors rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label={nextLabel}
          className="w-11 h-11 flex items-center justify-center border border-outline-variant/50 text-on-surface hover:bg-surface hover:border-outline transition-colors rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
