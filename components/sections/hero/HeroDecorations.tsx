import { cn } from "@/lib/utils";
import {
  FlowerIcon as SharedFlowerIcon,
  HalfCircle as SharedHalfCircle,
  Sparkle as SharedSparkle,
  Squiggle as SharedSquiggle,
  WavyLine as SharedWavyLine,
} from "@/components/shared/decorations";

export const HeroWavyLine = SharedWavyLine;
export const HeroSquiggle = SharedSquiggle;
export const HeroSparkle = SharedSparkle;
export const HeroHalfCircle = SharedHalfCircle;
export const HeroFlowerIcon = SharedFlowerIcon;

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
