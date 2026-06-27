import Link from "next/link";

const links = [
  { label: "GitHub", href: "https://github.com/atiqisrak" },
  { label: "LinkedIn", href: "https://linkedin.com/in/atiq-israk" },
  { label: "Product Hunt", href: "https://producthunt.com/@atiqisrak" },
];

export function FooterLinks() {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:justify-start">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[#6BB8E8]/50 bg-white/30 px-4 py-2 text-[0.55rem] font-medium uppercase tracking-[0.18em] text-[#2E6B9E] transition-all hover:border-[#2E6B9E] hover:bg-[#B8DFF5]/40 dark:border-[#2E6B9E]/50 dark:bg-[#1a3050]/50 dark:text-[#B8DFF5] dark:hover:border-[#6BB8E8] dark:hover:bg-[#2E6B9E]/30 sm:text-xs sm:tracking-[0.2em]"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
