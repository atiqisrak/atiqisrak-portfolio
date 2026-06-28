"use client";

import { motion, useInView } from "framer-motion";
import { useId, useRef } from "react";
import type { JapaneseAccentKey } from "@/lib/design/accent-colors";
import { getJapaneseAccent } from "@/lib/design/accent-colors";
import { fadeUp, useMotionPrefs } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function WavyLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 28"
      fill="none"
      aria-hidden
      className={cn("h-5 w-56 text-foreground sm:w-64", className)}
    >
      <path
        d="M0 14 C18 2 36 26 55 14 C73 2 91 26 110 14 C128 2 146 26 165 14 C183 2 201 26 220 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AnimatedWavyLine({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { drawPath: drawVariant } = useMotionPrefs();

  return (
    <svg
      ref={ref}
      viewBox="0 0 220 28"
      fill="none"
      aria-hidden
      className={cn("h-5 w-56 text-foreground sm:w-64", className)}
    >
      <motion.path
        d="M0 14 C18 2 36 26 55 14 C73 2 91 26 110 14 C128 2 146 26 165 14 C183 2 201 26 220 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={drawVariant}
      />
    </svg>
  );
}

export function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 20"
      fill="none"
      aria-hidden
      className={cn("h-4 w-28 text-foreground", className)}
    >
      <path
        d="M0 10C10 2 20 18 30 10C40 2 50 18 60 10C70 2 80 18 90 10C100 2 110 18 120 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AnimatedSquiggle({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { drawPath: drawVariant } = useMotionPrefs();

  return (
    <svg
      ref={ref}
      viewBox="0 0 120 20"
      fill="none"
      aria-hidden
      className={cn("h-4 w-28 text-foreground", className)}
    >
      <motion.path
        d="M0 10C10 2 20 18 30 10C40 2 50 18 60 10C70 2 80 18 90 10C100 2 110 18 120 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={drawVariant}
      />
    </svg>
  );
}

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={cn("h-5 w-5", className)}
    >
      <path d="M12 0L13.8 8.2L22 10L13.8 11.8L12 20L10.2 11.8L2 10L10.2 8.2L12 0Z" />
    </svg>
  );
}

export function HalfCircle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={cn("inline-block h-[0.85em] w-[0.85em] align-[-0.1em]", className)}
    >
      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 1A7 7 0 0 1 8 15Z" fill="currentColor" />
    </svg>
  );
}

export function FlowerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={cn("inline-block h-[0.85em] w-[0.85em] align-[-0.1em]", className)}
    >
      <circle cx="8" cy="8" r="2" fill="currentColor" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="8"
          cy="8"
          rx="2"
          ry="5"
          fill="currentColor"
          transform={`rotate(${angle} 8 8)`}
        />
      ))}
    </svg>
  );
}

type EnsoCircleProps = {
  className?: string;
  complete?: boolean;
  size?: number;
};

export function EnsoCircle({
  className,
  complete = false,
  size = 40,
}: EnsoCircleProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill="none"
      aria-hidden
      className={cn("text-foreground transition-all duration-500", className)}
    >
      <circle
        cx="20"
        cy="20"
        r="16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={complete ? "100 0" : "85 15"}
        transform="rotate(-90 20 20)"
      />
    </svg>
  );
}

type FloatingOrbProps = {
  accent?: JapaneseAccentKey;
  className?: string;
  animate?: boolean;
};

export function FloatingOrb({
  accent = "sakura",
  className,
  animate = true,
}: FloatingOrbProps) {
  const colors = getJapaneseAccent(accent);
  const { prefersReducedMotion } = useMotionPrefs();

  const orb = (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        colors.orb,
        className
      )}
    />
  );

  if (!animate || prefersReducedMotion) return orb;

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        colors.orb,
        className
      )}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

type BrushStrokeProps = {
  className?: string;
  accent?: JapaneseAccentKey;
};

export function BrushStroke({ className, accent = "sun" }: BrushStrokeProps) {
  const colors = getJapaneseAccent(accent);

  return (
    <svg
      viewBox="0 0 200 24"
      fill="none"
      aria-hidden
      className={cn("h-6 w-full max-w-xs", className)}
    >
      <path
        d="M2 14C30 8 60 18 90 12C120 6 150 16 198 10"
        stroke={colors.hex}
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

type DotGridProps = {
  className?: string;
  dotSize?: number;
  gap?: number;
  opacity?: number;
};

export function DotGrid({
  className,
  dotSize = 1.5,
  gap = 24,
  opacity = 0.35,
}: DotGridProps) {
  const patternId = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <pattern
          id={patternId}
          width={gap}
          height={gap}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={gap / 2}
            cy={gap / 2}
            r={dotSize}
            className="fill-foreground"
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

export function RingOutline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden
      className={cn("h-20 w-20", className)}
    >
      <circle
        cx="40"
        cy="40"
        r="36"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="8 6"
      />
    </svg>
  );
}

export function CrossMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("h-8 w-8", className)}
    >
      <path
        d="M16 4V28M4 16H28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DiamondOutline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={cn("h-12 w-12", className)}
    >
      <rect
        x="8"
        y="8"
        width="32"
        height="32"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(45 24 24)"
      />
    </svg>
  );
}

export function DashedArc({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      aria-hidden
      className={cn("h-16 w-32", className)}
    >
      <path
        d="M8 52C30 12 90 12 112 52"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="6 5"
      />
    </svg>
  );
}
