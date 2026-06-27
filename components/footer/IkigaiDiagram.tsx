"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { getJapaneseAccent } from "@/lib/design/accent-colors";
import { useMotionPrefs } from "@/lib/motion";
import { cn } from "@/lib/utils";

type QuadrantId = "love" | "good" | "needs" | "paid";

const quadrants: {
  id: QuadrantId;
  label: string;
  detail: string;
  accent: "ikigaiSky" | "ikigaiHorizon" | "ikigaiCerulean" | "ikigaiDeep";
  cx: number;
  cy: number;
}[] = [
  {
    id: "love",
    label: "What I love",
    detail: "Crafting products, AI, and design",
    accent: "ikigaiSky",
    cx: 130,
    cy: 130,
  },
  {
    id: "good",
    label: "What I'm good at",
    detail: "PM + engineering hybrid",
    accent: "ikigaiHorizon",
    cx: 270,
    cy: 130,
  },
  {
    id: "needs",
    label: "What the world needs",
    detail: "Growth, automation, clarity",
    accent: "ikigaiCerulean",
    cx: 130,
    cy: 270,
  },
  {
    id: "paid",
    label: "What sustains",
    detail: "Product leadership, outcomes",
    accent: "ikigaiDeep",
    cx: 270,
    cy: 270,
  },
];

export function IkigaiDiagram() {
  const [active, setActive] = useState<QuadrantId | "center" | null>(null);
  const { prefersReducedMotion } = useMotionPrefs();
  const centerBlue = getJapaneseAccent("ikigaiDeep");

  return (
    <div className="w-full">
      <div className="relative mx-auto hidden max-w-lg md:block">
        <svg viewBox="0 0 400 400" className="w-full" aria-label="Ikigai diagram">
          {quadrants.map((q) => {
            const color = getJapaneseAccent(q.accent);
            const isActive = active === q.id || active === "center";
            return (
              <g key={q.id}>
                <motion.circle
                  cx={q.cx}
                  cy={q.cy}
                  r={95}
                  fill={color.hex}
                  fillOpacity={isActive ? 0.28 : 0.12}
                  stroke={color.hex}
                  strokeWidth={1.5}
                  strokeOpacity={isActive ? 0.9 : 0.5}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
          <circle
            cx={200}
            cy={200}
            r={28}
            fill={centerBlue.hex}
            fillOpacity={active === "center" ? 0.35 : 0.15}
          />
        </svg>

        <div className="pointer-events-none absolute inset-0">
          {quadrants.map((q) => (
            <button
              key={q.id}
              type="button"
              className="pointer-events-auto absolute max-w-[7rem] text-left text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6B9E]"
              style={{
                left: `${(q.cx / 400) * 100}%`,
                top: `${(q.cy / 400) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setActive(q.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(q.id)}
              onBlur={() => setActive(null)}
              aria-label={`${q.label}: ${q.detail}`}
            >
              <span className="font-medium text-[#1a4a6e] dark:text-[#B8DFF5]">
                {q.label}
              </span>
              {active === q.id ? (
                <span className="mt-1 block text-[#2E6B9E]/80 dark:text-[#B8DFF5]/80">
                  {q.detail}
                </span>
              ) : null}
            </button>
          ))}
          <button
            type="button"
            className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6B9E]"
            onMouseEnter={() => setActive("center")}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive("center")}
            onBlur={() => setActive(null)}
            aria-label="Ikigai: purpose at the intersection"
          >
            <span className="font-playfair text-sm font-bold text-[#2E6B9E] dark:text-[#B8DFF5]">
              <HighlightedText accentKey="ikigaiDeep" strong>
                Ikigai
              </HighlightedText>
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:hidden">
        {quadrants.map((q) => {
          const color = getJapaneseAccent(q.accent);
          return (
            <button
              key={q.id}
              type="button"
              className={cn(
                "rounded-2xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6B9E]",
                active === q.id
                  ? "border-[#6BB8E8]/60"
                  : "border-[#B8DFF5]/60 dark:border-[#2E6B9E]/40"
              )}
              style={{
                backgroundColor: active === q.id ? `${color.hex}35` : `${color.hex}15`,
              }}
              onClick={() => setActive(active === q.id ? null : q.id)}
              aria-expanded={active === q.id}
            >
              <p className="text-xs font-medium text-[#1a4a6e] dark:text-[#B8DFF5]">
                {q.label}
              </p>
              {active === q.id ? (
                <p className="mt-1 text-xs text-[#2E6B9E]/80 dark:text-[#B8DFF5]/80">
                  {q.detail}
                </p>
              ) : null}
            </button>
          );
        })}
      </div>

      {active ? (
        <p className="mt-4 text-center text-sm text-[#2E6B9E]/80 dark:text-[#B8DFF5]/80 md:sr-only">
          {active === "center"
            ? "Purpose at the intersection of passion, skill, need, and reward."
            : quadrants.find((q) => q.id === active)?.detail}
        </p>
      ) : null}
    </div>
  );
}
