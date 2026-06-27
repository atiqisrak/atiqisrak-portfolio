"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ASSETS } from "@/lib/assets";
import { scaleIn, scaleInTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HeroPortraitProps = {
  className?: string;
};

export function HeroPortrait({ className }: HeroPortraitProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={scaleIn}
      transition={scaleInTransition}
      className={cn("relative flex shrink-0 justify-center", className)}
    >
      <div className="absolute inset-0 scale-110 rounded-full bg-ink-100" />
      <Avatar className="relative h-48 w-48 border border-ink-200 sm:h-56 sm:w-56 lg:h-64 lg:w-64">
        <AvatarImage src={ASSETS.avatar} alt="Atiq Israk — Product Leader" />
        <AvatarFallback className="bg-ink-100 text-2xl font-semibold text-ink-800">
          AI
        </AvatarFallback>
      </Avatar>
    </motion.div>
  );
}
