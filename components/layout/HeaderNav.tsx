"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/contexts/ActiveSectionContext";
import { handleNavClick, headerNavItems } from "@/lib/nav";

type HeaderNavProps = {
  className?: string;
  onNavigate?: () => void;
};

export function HeaderNav({ className, onNavigate }: HeaderNavProps) {
  const { activeSection } = useActiveSection();
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-6", className)} aria-label="Main">
      {headerNavItems.map((item) => {
        const isHashLink = item.href.startsWith("/#");
        const isActive = isHashLink
          ? activeSection === item.id
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={(e) => {
              handleNavClick(e, item.href);
              onNavigate?.();
            }}
            className={cn(
              "relative rounded-sm py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
