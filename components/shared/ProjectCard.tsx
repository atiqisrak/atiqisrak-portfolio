"use client";

import Link from "next/link";
import { ExternalLink, MoveUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/content/portfolio";
import { getProjectPageHref } from "@/lib/content/portfolio";
import { HoverCard } from "@/components/shared/HoverCard";
import { hoverLift, useMotionPrefs } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  product: Product;
  className?: string;
  accentHex?: string;
};

export function ProjectCard({ product, className, accentHex }: ProjectCardProps) {
  const caseStudyHref = getProjectPageHref(product.slug);
  const { prefersReducedMotion } = useMotionPrefs();

  return (
    <HoverCard as="div" className={cn("group relative overflow-hidden", className)}>
      {accentHex ? (
        <div
          className="pointer-events-none absolute right-0 top-0 h-0 w-0 border-l-[28px] border-t-[28px] border-l-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ borderTopColor: `${accentHex}40` }}
          aria-hidden
        />
      ) : null}
      <motion.div
        className="p-6"
        whileHover={prefersReducedMotion ? undefined : hoverLift}
      >
        <header className="mb-3 space-y-2">
          <h3 className="font-playfair text-lg font-bold text-foreground">
            {product.name}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.oneLiner}
          </p>
        </header>

        {product.metrics?.length ? (
          <ul className="mb-4 space-y-1 text-xs text-muted-foreground">
            {product.metrics.map((metric) => (
              <li key={metric}>· {metric}</li>
            ))}
          </ul>
        ) : null}

        <footer className="flex flex-wrap gap-3">
          {product.url ? (
            <Link
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              View live
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          ) : null}
          {caseStudyHref ? (
            <Link
              href={caseStudyHref}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Case study
              <MoveUpRight className="h-3.5 w-3.5" />
            </Link>
          ) : null}
        </footer>
      </motion.div>
    </HoverCard>
  );
}
