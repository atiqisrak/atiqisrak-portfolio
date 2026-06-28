"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import { caseStudies } from "@/lib/content/portfolio";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionShell } from "@/components/shared/SectionShell";
import { getSectionAccent } from "@/lib/design/accent-colors";
import { AnimatedSquiggle } from "@/components/shared/decorations";
import { fadeUp, fadeUpTransition, staggerContainer } from "@/lib/motion";

export function CaseStudies() {
  return (
    <SectionShell id="case-studies" ariaLabel="Case studies" decorated decorationVariant="center">
      <SectionHeading
        eyebrow="Case studies"
        title={
          <>
            Deep dives on{" "}
            <HighlightedText accentKey="matcha" strong>
              impact
            </HighlightedText>
          </>
        }
        showWavyLine
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-3"
      >
        {caseStudies.map((study, index) => {
          const accent = getSectionAccent("case-studies", index);
          return (
            <motion.article
              key={study.slug}
              variants={fadeUp}
              transition={fadeUpTransition}
              className="group flex h-full flex-col rounded-2xl border border-ink-100 border-t-2 p-6 transition-colors hover:border-ink-200"
              style={{ borderTopColor: accent.hex }}
            >
              <h3 className="font-playfair text-lg font-bold leading-snug text-foreground">
                {study.title}
              </h3>
              <div className="mt-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <AnimatedSquiggle className="h-3 w-16" />
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {study.dek}
              </p>
              <Link
                href={study.href}
                className="group/link mt-6 inline-flex min-h-[44px] flex-col gap-1 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
              >
                <span className="inline-flex items-center gap-2">
                  Read the{" "}
                  <HighlightedText accentKey="sakura" colorIndex={index}>
                    story
                  </HighlightedText>
                  <MoveUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                </span>
              </Link>
            </motion.article>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}
