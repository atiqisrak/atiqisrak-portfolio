"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { EnsoCircle } from "@/components/shared/decorations";
import { MagneticWrap } from "@/components/shared/MagneticWrap";
import { getJapaneseAccent } from "@/lib/design/accent-colors";

export function FooterCTA() {
  const deep = getJapaneseAccent("ikigaiDeep");

  return (
    <div className="py-10 text-center sm:py-12">
      <h2 className="mb-8 font-playfair text-5xl leading-none text-[#1a4a6e]/80 dark:text-[#B8DFF5]/80 md:text-6xl lg:text-7xl">
        Let&apos;s talk
      </h2>

      <MagneticWrap>
        <a
          href="mailto:atiqisrak@gmail.com"
          className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-white shadow-md shadow-[#2E6B9E]/20 transition-opacity hover:opacity-90"
          style={{ backgroundColor: deep.hex }}
          aria-label="Send email to atiqisrak@gmail.com"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <Mail className="h-4 w-4" aria-hidden />
          </div>
          <span className="font-medium">atiqisrak@gmail.com</span>
        </a>
      </MagneticWrap>
    </div>
  );
}

type FooterBackToTopProps = {
  onBackToTop: () => void;
};

export function FooterBackToTop({ onBackToTop }: FooterBackToTopProps) {
  const [ensoComplete, setEnsoComplete] = useState(false);

  return (
    <div className="pb-4 pt-2 text-center">
      <button
        type="button"
        onClick={onBackToTop}
        onMouseEnter={() => setEnsoComplete(true)}
        onMouseLeave={() => setEnsoComplete(false)}
        onFocus={() => setEnsoComplete(true)}
        onBlur={() => setEnsoComplete(false)}
        className="group mx-auto flex flex-col items-center gap-2 text-[#2E6B9E]/70 transition-colors hover:text-[#2E6B9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6B9E] dark:text-[#B8DFF5]/70 dark:hover:text-[#B8DFF5]"
        aria-label="Back to top"
      >
        <EnsoCircle complete={ensoComplete} size={44} className="text-[#2E6B9E] dark:text-[#B8DFF5]" />
        <span className="text-[0.55rem] font-medium uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.2em]">
          Back to top
        </span>
      </button>
    </div>
  );
}
