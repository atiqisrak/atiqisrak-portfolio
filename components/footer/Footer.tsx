"use client";

import { useEffect, useRef, useState } from "react";
import { Noto_Sans_JP } from "next/font/google";
import { KaizenStrip } from "./KaizenStrip";
import { FooterCTA, FooterBackToTop } from "./FooterCTA";
import { FooterLinks } from "./FooterLinks";
import { FooterParallaxScene } from "./FooterParallaxScene";
import { FooterParticleCanvas } from "./FooterParticleCanvas";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { AnimatedWavyLine } from "@/components/shared/decorations";
import { ikigaiFooterTheme } from "@/lib/design/accent-colors";
import { useMotionPrefs } from "@/lib/motion";
import { cn } from "@/lib/utils";

const notoSansJp = Noto_Sans_JP({
  weight: ["400"],
  display: "swap",
  preload: false,
});

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { prefersReducedMotion } = useMotionPrefs();
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={cn(
        "relative flex min-h-[min(920px,100svh)] w-full flex-col overflow-hidden border-t",
        ikigaiFooterTheme.border
      )}
      role="contentinfo"
      aria-label="Site footer"
    >
      <FooterParallaxScene footerRef={footerRef} />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[min(520px,58%)] bg-gradient-to-b from-white/0 via-white/50 to-white dark:from-transparent dark:via-[#0f1a24]/60 dark:to-[#0f1a24]"
        aria-hidden
      />

      {!prefersReducedMotion ? (
        <FooterParticleCanvas
          containerRef={footerRef}
          active={isFooterVisible}
          className="z-[30]"
        />
      ) : null}

      <div className="relative z-10 mx-auto mt-auto w-full max-w-7xl px-4 pb-6 pt-10 sm:px-6 sm:pb-8 md:px-8 lg:py-16 xl:px-12">
        <div className="mb-6 text-center">
          <p
            lang="ja"
            className={cn(
              "mb-3 text-lg",
              ikigaiFooterTheme.kanji,
              notoSansJp.className
            )}
            aria-hidden
          >
            生き甲斐
          </p>
          <h2 className="font-playfair text-2xl font-bold text-[#1a4a6e] dark:text-[#B8DFF5] md:text-3xl">
            What keeps me building
          </h2>
          <p
            className={cn(
              "mx-auto mt-4 max-w-md text-sm",
              ikigaiFooterTheme.textMuted
            )}
          >
            At the intersection of{" "}
            <HighlightedText accentKey="ikigaiHorizon">craft</HighlightedText>,{" "}
            <HighlightedText accentKey="ikigaiCerulean">skill</HighlightedText>,{" "}
            <HighlightedText accentKey="ikigaiSky">need</HighlightedText>, and{" "}
            <HighlightedText accentKey="ikigaiDeep" strong>
              reward
            </HighlightedText>{" "}
            — shipping products that{" "}
            <HighlightedText accentKey="ikigaiDeep">compound</HighlightedText>.
          </p>
        </div>

        <div className="my-10 flex justify-center text-[#2E6B9E] dark:text-[#6BB8E8]">
          <AnimatedWavyLine />
        </div>

        <KaizenStrip kanjiClassName={notoSansJp.className} />

        <FooterCTA />

        <FooterBackToTop onBackToTop={scrollToTop} />

        <div className={cn("border-t pt-8", ikigaiFooterTheme.border)}>
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <FooterLinks />
            <div
              className={cn(
                "text-center text-sm md:text-right",
                ikigaiFooterTheme.textMuted
              )}
            >
              <p className="text-[0.55rem] font-medium uppercase tracking-[0.18em] text-[#2E6B9E] dark:text-[#B8DFF5] sm:text-xs sm:tracking-[0.2em]">
                Designed by
              </p>
              <p>© {currentYear} Atiq Israk</p>
            </div>
          </div>

          <div
            className={cn(
              "mt-8 grid grid-cols-1 gap-4 text-xs md:grid-cols-3",
              ikigaiFooterTheme.textMuted
            )}
          >
            <div>
              <p className="mb-1 text-[0.55rem] font-medium uppercase tracking-[0.18em] text-[#2E6B9E] dark:text-[#B8DFF5] sm:text-xs sm:tracking-[0.2em]">
                Product management
              </p>
              <p>Strategy · Roadmaps · User Research</p>
            </div>
            <div>
              <p className="mb-1 text-[0.55rem] font-medium uppercase tracking-[0.18em] text-[#2E6B9E] dark:text-[#B8DFF5] sm:text-xs sm:tracking-[0.2em]">
                Software engineering
              </p>
              <p>Full-Stack · React · Next.js</p>
            </div>
            <div>
              <p className="mb-1 text-[0.55rem] font-medium uppercase tracking-[0.18em] text-[#2E6B9E] dark:text-[#B8DFF5] sm:text-xs sm:tracking-[0.2em]">
                Location
              </p>
              <p>Bangladesh</p>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Atiq Israk",
            jobTitle: "Product Manager & Software Engineer",
            url: "https://atiqisrak.com",
            email: "atiqisrak@gmail.com",
            address: {
              "@type": "PostalAddress",
              addressCountry: "BD",
            },
            sameAs: [
              "https://linkedin.com/in/atiq-israk",
              "https://github.com/atiqisrak",
              "https://producthunt.com/@atiqisrak",
            ],
          }),
        }}
      />
    </footer>
  );
}
