"use client";
import Nav from "@/components/Nav";
import ExpCard from "@/components/ExpCards";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingChatbot from "@/components/FloatingChatbot";
import { useEffect, useRef, useCallback } from "react";
import { Inter } from "next/font/google";
import useActiveSectionObserver from "@/hooks/useActiveSection";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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

  return (
    <div className="relative min-h-screen bg-background">
      <div ref={auraRef} className="mouse-aura" />
      <div className="mx-auto max-w-screen-xl px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16 xl:px-24 lg:pt-0 xl:pt-0">
        <div className="lg:flex lg:justify-between lg:gap-8 xl:gap-12">
          <div className="lg:w-1/2 lg:fixed lg:top-0 lg:h-screen lg:pr-4 xl:pr-8 lg:pt-0">
            <Nav />
          </div>
          <main className="lg:w-1/2 lg:ml-[50%] flex flex-col pt-6 lg:pt-24 gap-6 lg:gap-8">
            <About />
            <ExpCard />
            <Projects />
            <Contact />
            <Footer />
          </main>
        </div>
      </div>
      <FloatingChatbot />
    </div>
  );
}
