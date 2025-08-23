"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin } from "lucide-react";
import { ModeToggle } from "./ui/toggle-mode";
import { useActiveSection } from "@/contexts/ActiveSectionContext";

type NavItem = {
  name: string;
  href: string;
  id: string;
};

export default function Nav() {
  const { activeSection } = useActiveSection();

  const navItems: NavItem[] = [
    { name: "About", href: "/#about", id: "about" },
    { name: "Experience", href: "/#experience", id: "experience" },
    { name: "Projects", href: "/#projects", id: "projects" },
    { name: "Contact", href: "/#contact", id: "contact" },
    { name: "Product Hunt", href: "/producthunter", id: "producthunter" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    if (href.startsWith("/#")) {
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      // For external links like Product Hunt
      window.location.href = href;
    }
  };

  const getNavItemClasses = (item: NavItem) => {
    const isActive = activeSection === item.id;
    return {
      linkClass: isActive ? "active" : "",
      indicatorClass: `nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all ${
        isActive
          ? "active w-16 bg-foreground h-2"
          : "group-hover:w-16 group-hover:bg-foreground group-hover:h-px"
      }`,
      textClass: `nav-text text-xs font-bold uppercase tracking-widest ${
        isActive
          ? "text-foreground"
          : "text-slate-500 group-hover:text-foreground"
      }`,
    };
  };

  return (
    <header className="lg:flex lg:flex-col lg:py-24 flex flex-col lg:gap-6 gap-4">
      <div className="flex flex-col gap-4 lg:pr-8 xl:pr-12 mt-6 lg:mt-0 px-4 lg:px-0">
        <div className="w-full flex lg:items-center lg:justify-start">
          <Avatar className="w-20 h-20 lg:w-28 lg:h-28 xl:w-36 xl:h-36 border-2 border-primary bg-secondary">
            <AvatarImage src="./avatar.webp" />
            <AvatarFallback className="w-20 h-20 lg:w-28 lg:h-28 xl:w-36 xl:h-36 rounded-full border-1 border-primary">
              AM
            </AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-3xl lg:text-4xl xl:text-[42px] font-bold lg:text-start">
          Hi, I&#39;m Atiq Israk 👋
        </h1>
        <h2 className="text-lg lg:text-xl xl:text-xl lg:text-start text-primary font-semibold">
          Product Manager, Ether Technologies 🚀
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p className="text-sm lg:text-base xl:text-lg leading-relaxed">
            Product leader with 6+ years of experience in tech, specializing in
            building innovative digital solutions that drive business growth.
          </p>
          <ul className="space-y-2 text-xs lg:text-sm xl:text-base">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>Led development of MACH-based enterprise platforms</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>
                Achieved 160% revenue growth through AI implementation
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>Reduced operational costs by $60K via automation</span>
            </li>
          </ul>
        </div>
      </div>
      <nav className="lg:flex hidden">
        <ul className="flex flex-col w-max text-start gap-6 uppercase text-xs font-medium">
          {navItems.map((item: NavItem) => {
            const { linkClass, indicatorClass, textClass } =
              getNavItemClasses(item);
            return (
              <li key={item.name} className="group">
                <a
                  href={item.href}
                  className={`py-3 ${linkClass}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  <span className={indicatorClass}></span>
                  <span className={textClass}>{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <ul className="flex flex-row gap-4 lg:gap-6 mt-6 lg:mt-0 px-4 lg:px-0">
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 lg:w-11 lg:h-11"
        >
          <a
            href="https://github.com/atiqisrak"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-[1.2rem] w-[1.2rem]" />
          </a>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 lg:w-11 lg:h-11"
        >
          <a
            href="https://linkedin.com/in/atiqisrak?ref=atiqisrak.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-[1.2rem] w-[1.2rem]" />
          </a>
        </Button>
        <ModeToggle />
      </ul>
    </header>
  );
}
