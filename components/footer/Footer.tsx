"use client";

import { Noto_Sans_JP } from "next/font/google";
import { IkigaiDiagram } from "./IkigaiDiagram";
import { KaizenStrip } from "./KaizenStrip";
import { FooterCTA } from "./FooterCTA";
import { FooterLinks } from "./FooterLinks";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { AnimatedWavyLine, FloatingOrb } from "@/components/shared/decorations";
import { ikigaiFooterTheme } from "@/lib/design/accent-colors";
import { cn } from "@/lib/utils";

const notoSansJp = Noto_Sans_JP({
  weight: ["400"],
  display: "swap",
  preload: false,
});

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={cn(
        "relative w-full overflow-hidden border-t",
        ikigaiFooterTheme.background,
        ikigaiFooterTheme.backgroundDark,
        ikigaiFooterTheme.border
      )}
      role="contentinfo"
      aria-label="Site footer"
    >
      <FloatingOrb
        accent="ikigaiSky"
        className="left-[8%] top-[12%] h-44 w-44"
      />
      <FloatingOrb
        accent="ikigaiHorizon"
        className="right-[12%] top-[35%] h-36 w-36"
      />
      <FloatingOrb
        accent="ikigaiCerulean"
        className="bottom-[18%] left-[38%] h-40 w-40"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 md:px-8 lg:py-48 xl:px-12">
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

        <div className="mx-auto mt-16 max-w-xl">
          <IkigaiDiagram />
        </div>

        <div className="my-24 flex justify-center text-[#2E6B9E] dark:text-[#6BB8E8]">
          <AnimatedWavyLine />
        </div>

        <KaizenStrip kanjiClassName={notoSansJp.className} />

        <FooterCTA onBackToTop={scrollToTop} />

        <div className={cn("border-t py-12", ikigaiFooterTheme.border)}>
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
