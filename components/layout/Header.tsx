"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/toggle-mode";
import useActiveSectionObserver from "@/hooks/useActiveSection";
import { scrollSpySectionIds } from "@/lib/nav";
import { HeaderNav } from "./HeaderNav";
import { MobileNav } from "./MobileNav";

export function Header() {
  useActiveSectionObserver([...scrollSpySectionIds]);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-ink-100 bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6">
        <Link
          href="/"
          className="rounded-sm text-lg font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Atiq Israk
        </Link>

        <HeaderNav className="hidden md:flex" />

        <div className="flex items-center justify-end gap-2">
          <Button
            asChild
            className="hidden rounded-full sm:inline-flex"
            size="sm"
          >
            <Link href="/#contact">Let&apos;s talk</Link>
          </Button>
          <ModeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
