import {
  CrossMark,
  DashedArc,
  RingOutline,
  Sparkle,
} from "@/components/shared/decorations";

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
