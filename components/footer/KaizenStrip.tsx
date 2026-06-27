"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { getJapaneseAccent } from "@/lib/design/accent-colors";
import { useMotionPrefs } from "@/lib/motion";
import { cn } from "@/lib/utils";

const milestones = [
  { year: "2019", label: "First ship" },
  { year: "2020", label: "Templates at scale" },
  { year: "2021", label: "Ether era" },
  { year: "2022", label: "AssetIQ growth" },
  { year: "2023", label: "1M+ downloads" },
  { year: "2024", label: "15+ products" },
  { year: "Today", label: "Chromatics AI" },
];

type KaizenStripProps = {
  kanjiClassName?: string;
};

export function KaizenStrip({ kanjiClassName }: KaizenStripProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const { prefersReducedMotion } = useMotionPrefs();
  const horizon = getJapaneseAccent("ikigaiHorizon");
  const deep = getJapaneseAccent("ikigaiDeep");

  return (
    <div className="text-center">
      <p className="mb-2 text-[0.55rem] font-medium uppercase tracking-[0.18em] text-[#2E6B9E] dark:text-[#B8DFF5] sm:text-xs sm:tracking-[0.2em]">
        <span lang="ja" className={kanjiClassName} aria-hidden>
          改善
        </span>{" "}
        <HighlightedText accentKey="ikigaiCerulean">Kaizen</HighlightedText> —
        compound the gains
      </p>
      <p className="mb-8 text-sm text-[#2E6B9E]/70 dark:text-[#B8DFF5]/70">
        <HighlightedText accentKey="ikigaiSky" strong>
          1% better
        </HighlightedText>
        , every release
      </p>

      <div className="relative mx-auto flex max-w-2xl items-center justify-between px-2 pb-8">
        <div
          className="absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 bg-[#6BB8E8]/40"
          aria-hidden
        />
        {milestones.map((m, index) => {
          const isLast = index === milestones.length - 1;
          const isHovered = hovered === index;
          const dotColor = isLast ? deep.hex : horizon.hex;

          const dot = (
            <span
              className={cn(
                "h-3 w-3 rounded-full border-2 border-[#E8F4FC] transition-transform duration-200 dark:border-[#1a3050]",
                isHovered || isLast ? "scale-125" : "scale-100"
              )}
              style={{ backgroundColor: dotColor }}
            />
          );

          return (
            <button
              key={m.year}
              type="button"
              className="relative z-10 flex flex-col items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6B9E]"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              aria-label={`${m.year}: ${m.label}`}
            >
              {isLast && !prefersReducedMotion ? (
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {dot}
                </motion.span>
              ) : (
                dot
              )}
              {isHovered ? (
                <span className="absolute -bottom-8 whitespace-nowrap text-[0.65rem] text-[#2E6B9E]/70 dark:text-[#B8DFF5]/70">
                  {m.year}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
