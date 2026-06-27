"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ASSETS } from "@/lib/assets";
import { scaleIn, scaleInTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import {
  HeroAsterisk,
  HeroCube,
  HeroSparkle,
} from "./HeroDecorations";

type HeroPortraitProps = {
  className?: string;
};

export function HeroPortrait({ className }: HeroPortraitProps) {
  return (
    <motion.div
      initial={false}
      animate="visible"
      variants={scaleIn}
      transition={scaleInTransition}
      className={cn(
        "relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:mx-0 lg:max-w-[380px] lg:translate-x-10 xl:max-w-[420px] xl:translate-x-14",
        className
      )}
    >
      <HeroSparkle className="absolute -right-1 top-4 z-20 text-foreground sm:-right-2 sm:top-6 lg:right-0 lg:top-4" />
      <HeroAsterisk className="absolute -right-10 top-16 z-20 hidden text-foreground lg:block" />
      <HeroCube className="absolute -left-4 bottom-12 z-20 scale-90 text-foreground sm:-left-6 sm:bottom-16 sm:scale-100 lg:-left-8" />

      <div className="relative w-full">
        <Image
          src={ASSETS.heroCover}
          alt="Atiq Israk — Product Leader"
          width={840}
          height={840}
          priority
          sizes="(max-width: 1024px) 320px, 420px"
          className="h-auto w-full"
        />

        <span
          className="absolute bottom-[18%] right-[8%] z-20 text-xl font-light text-foreground"
          aria-hidden
        >
          +
        </span>
      </div>
    </motion.div>
  );
}
