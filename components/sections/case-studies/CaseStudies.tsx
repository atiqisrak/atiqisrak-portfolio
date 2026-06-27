"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import { caseStudies } from "@/lib/content/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionShell } from "@/components/shared/SectionShell";
import { fadeUp, fadeUpTransition, staggerContainer } from "@/lib/motion";

export function CaseStudies() {
  return (
    <SectionShell id="case-studies" ariaLabel="Case studies">
      <SectionHeading eyebrow="Case studies" title="Deep dives on impact" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mt-10 grid gap-6 lg:grid-cols-3"
      >
        {caseStudies.map((study) => (
          <motion.article
            key={study.slug}
            variants={fadeUp}
            transition={fadeUpTransition}
            className="flex h-full flex-col rounded-2xl border border-ink-100 p-6"
          >
            <h3 className="text-lg font-semibold leading-snug text-foreground">
              {study.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {study.dek}
            </p>
            <Link
              href={study.href}
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
            >
              Read the story
              <MoveUpRight className="h-4 w-4" />
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}
