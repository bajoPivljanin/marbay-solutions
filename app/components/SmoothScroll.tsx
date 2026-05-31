"use client";

import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root className="w-full min-w-0">
      {children}
    </ReactLenis>
  );
}
