import {
  CrossMark,
  DashedArc,
  RingOutline,
  Sparkle,
} from "@/components/shared/decorations";
import { cn } from "@/lib/utils";

export function SectionBreather() {
  return (
    <div className="relative h-16 w-full lg:h-24" aria-hidden>
      <div className="absolute inset-x-8 top-1/2 hidden h-px bg-ink-100 lg:block xl:inset-x-16" />
      <RingOutline className="absolute left-1/4 top-1/2 h-10 w-10 -translate-y-1/2 text-foreground/15 hidden md:block" />
      <Sparkle className="absolute right-1/4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/20 hidden md:block" />
      <CrossMark className="absolute left-8 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/12 hidden lg:block" />
      <DashedArc className="absolute right-8 top-1/2 h-10 w-20 -translate-y-1/2 text-foreground/15 hidden lg:block" />
    </div>
  );
}

type ApproachConnectorProps = {
  className?: string;
};

export function ApproachConnector({ className }: ApproachConnectorProps) {
  return (
    <svg
      viewBox="0 0 800 24"
      fill="none"
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-0 right-0 top-1/2 hidden h-6 w-full -translate-y-1/2 text-foreground/20 lg:block",
        className
      )}
      preserveAspectRatio="none"
    >
      <path
        d="M0 12 H760"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="6 8"
      />
      <circle cx="133" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="400" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="667" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
