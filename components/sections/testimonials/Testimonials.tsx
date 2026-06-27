"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/content/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionShell } from "@/components/shared/SectionShell";
import { fadeUp, fadeUpTransition, staggerContainer } from "@/lib/motion";

export function Testimonials() {
  return (
    <SectionShell ariaLabel="Testimonials">
      <SectionHeading eyebrow="Testimonials" title="What collaborators say" />
      <p className="mt-3 text-sm text-muted-foreground">
        Placeholder drafts — publish only with approved attributions.
      </p>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mt-8 grid gap-6 lg:grid-cols-2"
      >
        {testimonials.map((item) => (
          <motion.blockquote
            key={item.name}
            variants={fadeUp}
            transition={fadeUpTransition}
            className="rounded-2xl border border-ink-100 p-6"
          >
            <p className="text-sm leading-relaxed text-foreground">
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer className="mt-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{item.name}</span>
              {" · "}
              {item.title}, {item.company}
            </footer>
          </motion.blockquote>
        ))}
      </motion.div>
    </SectionShell>
  );
}
