"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { handleNavClick } from "@/lib/nav";
import { HeaderNav } from "./HeaderNav";

type MobileNavProps = {
  className?: string;
};

export function MobileNav({ className }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const menuId = "mobile-nav-menu";

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={cn("md:hidden", className)}>
      <Button
        variant="ghost"
        size="icon"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open ? (
        <div
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="absolute left-0 right-0 top-16 border-b border-ink-100 bg-background/95 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <HeaderNav
              className="flex-col items-start gap-4"
              onNavigate={close}
            />
            <Link
              href="/#contact"
              onClick={(e) => {
                handleNavClick(e, "/#contact");
                close();
              }}
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Let&apos;s talk
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
