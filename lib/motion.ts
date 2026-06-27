"use client";

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

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const scaleInTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1],
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

const noTransition: Transition = { duration: 0 };

export function useMotionPrefs() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return {
      prefersReducedMotion: true,
      fadeUp: reducedFadeUp,
      scaleIn: reducedScaleIn,
      staggerContainer: reducedStaggerContainer,
      fadeUpTransition: noTransition,
      scaleInTransition: noTransition,
    };
  }

  return {
    prefersReducedMotion: false,
    fadeUp,
    scaleIn,
    staggerContainer,
    fadeUpTransition,
    scaleInTransition,
  };
}
