"use client";

import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import { cn } from "@/lib/utils";

type HeroSideImageProps = {
  className?: string;
};

export function HeroSideImage({ className }: HeroSideImageProps) {
  return (
    <div
      className={cn(
        "relative z-30 h-40 w-40 shrink-0 overflow-hidden",
        "xl:h-48 xl:w-48",
        className
      )}
    >
      <Image
        src={ASSETS.heroSideCover}
        alt="Atiq Israk portfolio side cover"
        width={192}
        height={192}
        className="h-full w-full object-cover"
        priority
      />
    </div>
  );
}
