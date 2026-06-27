"use client";

import { HeroCTAs } from "./HeroCTAs";
import { HeroEyebrow } from "./HeroEyebrow";
import { HeroHeadline } from "./HeroHeadline";
import { HeroPortrait } from "./HeroPortrait";
import { HeroProofLine } from "./HeroProofLine";
import { HeroSkillPills } from "./HeroSkillPills";
import { HeroStats } from "./HeroStats";

export function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-16 border-b border-ink-100 px-4 py-12 md:px-6 lg:py-20"
      aria-label="Introduction"
    >
      <div className="mx-auto max-w-6xl">
        <HeroEyebrow />

        {/* Mobile layout */}
        <div className="mt-6 flex flex-col gap-8 lg:hidden">
          <HeroHeadline />
          <HeroPortrait className="mx-auto w-full max-w-[280px]" />
          <HeroStats />
          <HeroProofLine />
          <HeroSkillPills />
          <HeroCTAs fullWidth />
        </div>

        {/* Desktop layout */}
        <div className="mt-8 hidden gap-12 lg:grid lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="space-y-8">
            <HeroHeadline />
            <HeroProofLine />
            <HeroSkillPills />
            <HeroCTAs />
          </div>
          <div className="flex flex-col items-center gap-8 pt-2">
            <HeroPortrait />
            <HeroStats />
          </div>
        </div>
      </div>
    </section>
  );
}
