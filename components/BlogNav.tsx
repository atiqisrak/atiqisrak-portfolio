"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Home, Menu, X } from "lucide-react";
import { ModeToggle } from "./ui/toggle-mode";
import Link from "next/link";
import { useState } from "react";

type NavItem = {
  name: string;
  href: string;
  id: string;
};

export default function BlogNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: "About", href: "/#about", id: "about" },
    { name: "Experience", href: "/#experience", id: "experience" },
    { name: "Projects", href: "/#projects", id: "projects" },
    { name: "Contact", href: "/#contact", id: "contact" },
    { name: "Blog", href: "/blogs", id: "blog" },
    { name: "Product Hunt", href: "/producthunter", id: "producthunter" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith("/#")) {
      window.location.href = "/";
      // Scroll to section after page loads
      setTimeout(() => {
        const targetId = href.substring(2);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } else {
      window.location.href = href;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Avatar className="w-10 h-10 border-2 border-primary bg-secondary">
                <AvatarImage
                  src="/avatar.webp"
                  alt="Atiq Israk - Product Manager and AI Specialist"
                />
                <AvatarFallback className="w-10 h-10 rounded-full border-1 border-primary">
                  AM
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-bold">Atiq Israk</h1>
                <p className="text-xs text-muted-foreground">Product Manager</p>
              </div>
            </Link>
          </div>

          <nav className="flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navItems.map((item: NavItem) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="w-9 h-9" asChild>
              <a
                href="https://github.com/atiqisrak"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Atiq's GitHub profile"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="w-9 h-9" asChild>
              <a
                href="https://linkedin.com/in/atiqisrak?ref=atiqisrak.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Atiq's LinkedIn profile"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Avatar className="w-8 h-8 border-2 border-primary bg-secondary">
              <AvatarImage src="./avatar.webp" alt="Atiq Israk" />
              <AvatarFallback className="w-8 h-8 rounded-full border-1 border-primary">
                AM
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-sm font-bold">Atiq Israk</h1>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="w-8 h-8" asChild>
              <a
                href="https://github.com/atiqisrak"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-3 w-3" />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="w-8 h-8" asChild>
              <a
                href="https://linkedin.com/in/atiqisrak?ref=atiqisrak.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-3 w-3" />
              </a>
            </Button>
            <ModeToggle />
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background/95 backdrop-blur">
            <nav className="py-4">
              <ul className="space-y-3">
                {navItems.map((item: NavItem) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider py-2"
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
