"use client";

import { motion } from "framer-motion";
import type { ApproachStep as ApproachStepType } from "@/lib/content/portfolio";
import { AccentPill } from "@/components/shared/AccentPill";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { hoverScale } from "@/lib/motion";

const titleHighlights: Record<string, string> = {
  "Find the money": "money",
  "Build the machine": "machine",
  "Compound the gains": "gains",
};

type ApproachStepProps = {
  step: ApproachStepType;
  colorIndex?: number;
};

function renderTitle(title: string, colorIndex: number) {
  const highlight = titleHighlights[title];
  if (!highlight) return title;

  const parts = title.split(highlight);
  return (
    <>
      {parts[0]}
      <HighlightedText colorIndex={colorIndex + 2} strong>
        {highlight}
      </HighlightedText>
      {parts[1]}
    </>
  );
}

function renderDescription(
  step: ApproachStepType,
  colorIndex: number
): React.ReactNode {
  if (step.number === "01") {
    return (
      <>
        I locate where{" "}
        <HighlightedText colorIndex={colorIndex} accentKey="matcha">
          growth
        </HighlightedText>{" "}
        is trapped: a manual process bleeding cost, a stockout bleeding sales,
        a market nobody serves. I size the prize before a line of code is
        written.
      </>
    );
  }
  if (step.number === "02") {
    return (
      <>
        I turn it into product:{" "}
        <HighlightedText colorIndex={colorIndex} accentKey="ikigaiCerulean">
          AI
        </HighlightedText>{" "}
        where it earns its keep, automation where work repeats, ruthless scope
        where it doesn&apos;t. Shipped fast, measured honestly.
      </>
    );
  }
  return (
    <>
      Toyota taught me growth isn&apos;t one big launch; it&apos;s a hundred
      one-percent improvements that{" "}
      <HighlightedText colorIndex={colorIndex} accentKey="sun" strong>
        stack
      </HighlightedText>
      . I build systems that keep paying off long after the release note.
    </>
  );
}

export function ApproachStep({ step, colorIndex = 0 }: ApproachStepProps) {
  return (
    <div className="h-full p-6">
      <motion.div whileHover={hoverScale}>
        <AccentPill size="sm" colorIndex={colorIndex}>
          {step.number}
        </AccentPill>
      </motion.div>
      <h3 className="mt-3 font-playfair text-lg font-bold text-foreground">
        {renderTitle(step.title, colorIndex)}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {renderDescription(step, colorIndex)}
      </p>
    </div>
  );
}
