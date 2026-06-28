"use client";

import {
  CrossMark,
  DashedArc,
  DiamondOutline,
  DotGrid,
  RingOutline,
  Sparkle,
} from "@/components/shared/decorations";
import { cn } from "@/lib/utils";

type SectionBackdropVariant = "default" | "left" | "right" | "center";

type SectionBackdropProps = {
  variant?: SectionBackdropVariant;
  className?: string;
  showDotGrid?: boolean;
};

const shapeLayouts: Record<
  SectionBackdropVariant,
  Array<{
    shape: "ring" | "cross" | "diamond" | "arc" | "sparkle";
    className: string;
  }>
> = {
  default: [
    { shape: "ring", className: "right-4 top-8 text-foreground/20 lg:right-12 lg:top-4" },
    { shape: "cross", className: "left-6 top-1/3 text-foreground/15 lg:left-16" },
    { shape: "diamond", className: "bottom-12 right-16 text-foreground/15 hidden sm:block" },
    { shape: "arc", className: "bottom-6 left-8 text-foreground/20 lg:left-24" },
    { shape: "sparkle", className: "right-1/4 top-1/2 text-foreground/25 hidden lg:block" },
  ],
  left: [
    { shape: "ring", className: "left-4 top-6 text-foreground/20 lg:left-8" },
    { shape: "cross", className: "left-12 bottom-16 text-foreground/15 hidden sm:block" },
    { shape: "arc", className: "left-2 top-1/2 text-foreground/20" },
    { shape: "diamond", className: "left-8 bottom-8 text-foreground/12 hidden md:block" },
    { shape: "sparkle", className: "left-1/4 bottom-8 text-foreground/25 hidden lg:block" },
  ],
  right: [
    { shape: "ring", className: "right-4 top-10 text-foreground/20 lg:right-10" },
    { shape: "diamond", className: "right-12 bottom-20 text-foreground/15 hidden sm:block" },
    { shape: "cross", className: "right-6 top-1/3 text-foreground/15" },
    { shape: "arc", className: "right-2 bottom-10 text-foreground/20" },
    { shape: "sparkle", className: "right-1/4 top-2/3 text-foreground/20 hidden lg:block" },
  ],
  center: [
    { shape: "ring", className: "left-1/2 top-4 -translate-x-1/2 text-foreground/15" },
    { shape: "cross", className: "left-8 bottom-10 text-foreground/12 hidden md:block" },
    { shape: "sparkle", className: "left-1/4 top-1/3 text-foreground/20 hidden md:block" },
    { shape: "sparkle", className: "right-1/4 bottom-1/4 text-foreground/20 hidden md:block" },
    { shape: "diamond", className: "right-8 top-1/2 text-foreground/15 hidden lg:block" },
    { shape: "arc", className: "bottom-6 left-1/2 h-12 w-24 -translate-x-1/2 text-foreground/15 hidden lg:block" },
  ],
};

function BackdropShape({
  shape,
  className,
}: {
  shape: "ring" | "cross" | "diamond" | "arc" | "sparkle";
  className: string;
}) {
  const shared = cn("pointer-events-none absolute", className);

  switch (shape) {
    case "ring":
      return <RingOutline className={shared} />;
    case "cross":
      return <CrossMark className={shared} />;
    case "diamond":
      return <DiamondOutline className={shared} />;
    case "arc":
      return <DashedArc className={shared} />;
    case "sparkle":
      return <Sparkle className={cn(shared, "h-6 w-6")} />;
  }
}

export function SectionBackdrop({
  variant = "default",
  className,
  showDotGrid = true,
}: SectionBackdropProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {showDotGrid ? (
        <DotGrid className="opacity-40 dark:opacity-25" dotSize={1} gap={28} />
      ) : null}

      {shapeLayouts[variant].map((item, index) => (
        <BackdropShape key={`${item.shape}-${index}`} {...item} />
      ))}
    </div>
  );
}
