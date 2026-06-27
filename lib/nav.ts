import type { MouseEvent } from "react";

export type NavItem = {
  name: string;
  href: string;
  id: string;
};

export const headerNavItems: NavItem[] = [
  { name: "About", href: "/#about", id: "about" },
  { name: "Experience", href: "/#experience", id: "experience" },
  { name: "Projects", href: "/#projects", id: "projects" },
  { name: "Blog", href: "/blogs", id: "blog" },
  { name: "Contact", href: "/#contact", id: "contact" },
];

export const scrollSpySectionIds = [
  "about",
  "experience",
  "projects",
  "contact",
] as const;

export function handleNavClick(
  e: MouseEvent<HTMLAnchorElement>,
  href: string
): void {
  if (href.startsWith("/#")) {
    e.preventDefault();
    const targetId = href.slice(2);
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
