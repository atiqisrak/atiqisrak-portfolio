"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/content/portfolio";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionShell } from "@/components/shared/SectionShell";
import { getJapaneseAccent } from "@/lib/design/accent-colors";
import { fadeUp, fadeUpTransition, staggerContainer } from "@/lib/motion";

const sakura = getJapaneseAccent("sakura");

export function Testimonials() {
  return (
    <SectionShell ariaLabel="Testimonials" decorated decorationVariant="left">
      <SectionHeading
        eyebrow="Testimonials"
        title={
          <>
            What{" "}
            <HighlightedText accentKey="sakura" strong>
              collaborators
            </HighlightedText>{" "}
            say
          </>
        }
        showWavyLine
      />
      <p className="mt-3 text-sm text-muted-foreground">
        Placeholder drafts — publish only with approved attributions.
      </p>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mt-10 grid gap-6 lg:grid-cols-2"
      >
        {testimonials.map((item, index) => (
          <motion.blockquote
            key={item.name}
            variants={fadeUp}
            transition={fadeUpTransition}
            className="group relative rounded-2xl border border-ink-100 p-6 transition-colors hover:bg-[#F4A7B9]/10 dark:hover:bg-[#F4A7B9]/5"
          >
            <span
              className="pointer-events-none absolute right-5 top-4 font-playfair text-4xl leading-none opacity-[0.12] sm:right-6 sm:top-5 sm:text-5xl"
              style={{ color: sakura.hex }}
              aria-hidden
            >
              &ldquo;
            </span>
            <p className="relative pr-6 font-playfair text-base leading-relaxed text-foreground sm:pr-8">
              {index === 0 ? (
                <>
                  Atiq has a rare instinct for the{" "}
                  <HighlightedText accentKey="sun" colorIndex={0}>
                    one thing that matters
                  </HighlightedText>
                  . He&apos;ll cut a bloated scope in half and somehow the
                  numbers go up. He thinks like an owner, not a feature manager.
                </>
              ) : (
                item.quote
              )}
            </p>
            <footer className="relative mt-4 text-sm text-muted-foreground">
              <span className="text-[0.55rem] font-medium uppercase tracking-[0.18em] text-foreground sm:text-xs sm:tracking-[0.2em]">
                {item.name}
              </span>
              <span className="mt-1 block">
                {item.title}, {item.company}
              </span>
            </footer>
          </motion.blockquote>
        ))}
      </motion.div>
    </SectionShell>
  );
}
