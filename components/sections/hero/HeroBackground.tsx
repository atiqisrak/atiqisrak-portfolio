"use client";

import {
  CrossMark,
  DiamondOutline,
  DotGrid,
  RingOutline,
  Sparkle,
} from "@/components/shared/decorations";
import { cn } from "@/lib/utils";

export function HeroBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <DotGrid
        className="opacity-30 dark:opacity-20"
        dotSize={1.25}
        gap={32}
        opacity={0.4}
      />

      <RingOutline className="absolute left-4 top-16 text-foreground/15 sm:left-8 lg:left-12 lg:top-20" />
      <CrossMark className="absolute right-8 top-24 text-foreground/12 hidden sm:block lg:right-16" />
      <DiamondOutline className="absolute bottom-20 left-12 text-foreground/12 hidden md:block lg:left-24" />
      <Sparkle className="absolute bottom-32 right-1/4 h-7 w-7 text-foreground/20 hidden lg:block" />
      <Sparkle className="absolute left-1/3 top-1/2 h-5 w-5 text-foreground/15 hidden xl:block" />
      <CrossMark className="absolute bottom-12 right-12 h-5 w-5 text-foreground/10 hidden lg:block" />

      <svg
        viewBox="0 0 200 200"
        className="absolute -right-8 bottom-0 h-48 w-48 text-foreground/10 sm:h-56 sm:w-56"
        aria-hidden
      >
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}
