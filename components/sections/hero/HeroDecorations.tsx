import { cn } from "@/lib/utils";

export function HeroWavyLine({ className }: { className?: string }) {
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

export function HeroSparkle({ className }: { className?: string }) {
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

export function HeroAsterisk({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={cn("h-6 w-6", className)}
    >
      <path d="M12 2V22M2 12H22M5.5 5.5L18.5 18.5M18.5 5.5L5.5 18.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function HeroCube({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("h-8 w-8", className)}
    >
      <path
        d="M16 4L28 12V24L16 32L4 24V12L16 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M16 4V16M16 16L28 12M16 16L4 12M16 16V32" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function HeroSquiggle({ className }: { className?: string }) {
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

export function HeroHalfCircle({ className }: { className?: string }) {
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

export function HeroFlowerIcon({ className }: { className?: string }) {
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

export function HeroSegmentedCircle({ className }: { className?: string }) {
  const cx = 200;
  const cy = 200;
  const r = 185;
  const gap = 3;

  const segment = (startAngle: number, endAngle: number) => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  const segments = [
    { d: segment(-90 + gap, 0 - gap), fill: "#4ade80" },
    { d: segment(0 + gap, 90 - gap), fill: "#22c55e" },
    { d: segment(90 + gap, 180 - gap), fill: "#16a34a" },
    { d: segment(180 + gap, 270 - gap), fill: "#4ade80" },
  ];

  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={cn("absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-[55%] -translate-y-1/2", className)}
    >
      {segments.map((seg) => (
        <path key={seg.d} d={seg.d} fill={seg.fill} />
      ))}
    </svg>
  );
}
