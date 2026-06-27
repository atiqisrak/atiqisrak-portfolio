import Link from "next/link";
import { contact, contactLinks } from "@/lib/content/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionMotion } from "@/components/shared/SectionMotion";
import { SectionShell } from "@/components/shared/SectionShell";
import { cn } from "@/lib/utils";

export function Contact() {
  return (
    <SectionShell id="contact" ariaLabel="Contact">
      <SectionMotion>
        <SectionHeading title={contact.heading} />
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
          {contact.body}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {contactLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={
                link.type === "social" || link.type === "resume"
                  ? "_blank"
                  : undefined
              }
              rel={
                link.type === "social" || link.type === "resume"
                  ? "noopener noreferrer"
                  : undefined
              }
              className={cn(
                "inline-flex min-h-[44px] items-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                link.type === "email"
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "border border-ink-200 text-foreground hover:bg-ink-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </SectionMotion>
    </SectionShell>
  );
}
