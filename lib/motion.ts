"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeUpTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1],
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const scaleInTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1],
};

export const hoverLift = {
  y: -4,
  boxShadow: "0 12px 24px -8px rgba(0,0,0,0.12)",
  transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
};

export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
};

export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const float: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const pulseOnce: Variants = {
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.03, 1],
    transition: { duration: 0.6, times: [0, 0.5, 1] },
  },
};

const reducedFadeUp: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const reducedScaleIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const reducedStaggerContainer: Variants = {
  hidden: {},
  visible: {},
};

const reducedDrawPath: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const noTransition: Transition = { duration: 0 };

export function useMotionPrefs() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return {
      prefersReducedMotion: true,
      fadeUp: reducedFadeUp,
      scaleIn: reducedScaleIn,
      staggerContainer: reducedStaggerContainer,
      staggerFast: reducedStaggerContainer,
      drawPath: reducedDrawPath,
      fadeUpTransition: noTransition,
      scaleInTransition: noTransition,
    };
  }

  return {
    prefersReducedMotion: false,
    fadeUp,
    scaleIn,
    staggerContainer,
    staggerFast,
    drawPath,
    fadeUpTransition,
    scaleInTransition,
  };
}

function parseStatValue(value: string): { prefix: string; num: number; suffix: string } {
  const match = value.match(/^([^0-9]*)([0-9.]+)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: value };
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

export function useCountUp(
  target: string,
  inView: boolean,
  duration = 1200
): string {
  const prefersReducedMotion = useReducedMotion();
  const { prefix, num, suffix } = parseStatValue(target);
  const [display, setDisplay] = useState(prefersReducedMotion ? num : 0);

  useEffect(() => {
    if (prefersReducedMotion || !inView) {
      setDisplay(num);
      return;
    }

    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(num * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, num, duration, prefersReducedMotion]);

  const formatted =
    num % 1 === 0 ? Math.round(display).toString() : display.toFixed(1);
  return `${prefix}${formatted}${suffix}`;
}
