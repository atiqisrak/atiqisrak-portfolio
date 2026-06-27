"use client";

import { HeroCTAs } from "./HeroCTAs";
import { HeroHeadline } from "./HeroHeadline";
import { HeroPortrait } from "./HeroPortrait";
import { HeroBottomText, HeroSideTop } from "./HeroSideContent";
import { HeroSkillPills } from "./HeroSkillPills";
import { HeroSideImage } from "./HeroSideImage";
import { HeroStats } from "./HeroStats";
import { HeroWavyLine } from "./HeroDecorations";

export function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-16 overflow-x-hidden border-b border-ink-100 px-4 pb-12 pt-4 sm:px-6 md:px-8 md:pt-5 lg:pb-12 lg:pt-6 xl:px-12 xl:pt-8"
      aria-label="Introduction"
    >
      <div className="mx-auto max-w-7xl">
        {/* Mobile & tablet */}
        <div className="flex flex-col gap-7 sm:gap-8 lg:hidden">
          <div className="space-y-4">
            <HeroHeadline />
            <HeroWavyLine />
          </div>

          <HeroStats className="gap-x-8 sm:gap-x-10" />

          <div className="relative mx-auto w-full max-w-md">
            <HeroSideTop className="mb-5 ml-auto max-w-[12.5rem] text-right sm:max-w-[14rem]" />
            <div className="relative mx-auto w-fit max-w-[min(100%,320px)] px-4 sm:max-w-[340px] sm:px-6">
              <HeroPortrait />
              <HeroSideImage className="absolute -bottom-2 right-0 h-[7.5rem] w-[7.5rem] sm:-bottom-3 sm:right-1 sm:h-32 sm:w-32" />
            </div>
          </div>

          <HeroBottomText className="max-w-none" />

          <div className="space-y-6">
            <HeroSkillPills />
            <HeroCTAs fullWidth />
          </div>
        </div>

        {/* Desktop — unchanged */}
        <div className="hidden lg:grid lg:grid-cols-[1.1fr_minmax(320px,420px)_0.85fr] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-8">
          <HeroLeftColumn className="row-span-2 self-start" />

          <HeroPortrait className="relative z-10 col-start-2 row-start-1 justify-self-end" />

          <div className="relative z-30 col-start-3 row-start-1 min-h-[420px] self-stretch">
            <HeroSideTop className="absolute right-0 top-2 z-10" />
            <HeroSideImage className="absolute right-0 top-[62%] -translate-x-[20%] -translate-y-1/2" />
          </div>

          <HeroBottomText className="col-span-2 col-start-2 row-start-2 w-full pt-8 lg:pl-40 xl:pl-52 2xl:pl-60" />
        </div>
      </div>
    </section>
  );
}

function HeroLeftColumn({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-8 xl:gap-10">
        <HeroHeadline />
        <HeroWavyLine />
        <HeroStats />
        <HeroSkillPills />
        <HeroCTAs />
      </div>
    </div>
  );
}
