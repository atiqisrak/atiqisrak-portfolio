"use client";

import { useEffect, useRef, useCallback } from "react";
import useActiveSectionObserver from "@/hooks/useActiveSection";

export default function HomeClient() {
  const auraRef = useRef<HTMLDivElement>(null);

  // Observe sections for active state
  useActiveSectionObserver(["about", "experience", "projects", "contact"]);

  const updateAuraPosition = useCallback((e: MouseEvent) => {
    if (auraRef.current) {
      auraRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
      auraRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", updateAuraPosition);
    return () => window.removeEventListener("pointermove", updateAuraPosition);
  }, [updateAuraPosition]);

  return <div ref={auraRef} className="mouse-aura" />;
}
