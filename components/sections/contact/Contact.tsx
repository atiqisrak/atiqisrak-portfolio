"use client";

import Link from "next/link";
import { contactLinks } from "@/lib/content/portfolio";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { MagneticWrap } from "@/components/shared/MagneticWrap";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionMotion } from "@/components/shared/SectionMotion";
import { SectionShell } from "@/components/shared/SectionShell";
import { getJapaneseAccent } from "@/lib/design/accent-colors";
import { cn } from "@/lib/utils";

const ikigaiCerulean = getJapaneseAccent("ikigaiCerulean");
const sakura = getJapaneseAccent("sakura");
const sun = getJapaneseAccent("sun");

export function Contact() {
  return (
    <SectionShell id="contact" ariaLabel="Contact" divided={false} spacious>
      <SectionMotion>
        <SectionHeading
          title={
            <>
              Open to{" "}
              <HighlightedText accentKey="ikigaiHorizon" strong>
                what&apos;s next
              </HighlightedText>
              .
            </>
          }
          showWavyLine
          titleSize="xl"
          align="offset"
        />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground lg:mt-8 lg:text-lg">
          I&apos;m open to product leadership roles where the goal is{" "}
          <HighlightedText accentKey="matcha" strong>
            growth
          </HighlightedText>{" "}
          — building{" "}
          <HighlightedText accentKey="ikigaiCerulean">AI products</HighlightedText>{" "}
          that move a real{" "}
          <HighlightedText accentKey="sun">number</HighlightedText>: revenue, cost,
          or scale. If that&apos;s the kind of team you&apos;re building,{" "}
          <HighlightedText accentKey="sakura" strong>
            let&apos;s talk
          </HighlightedText>
          .
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {contactLinks.map((link, index) => {
            const accent =
              index % 3 === 0 ? sun : index % 3 === 1 ? ikigaiCerulean : sakura;
            const pill = (
              <Link
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
                    ? "bg-foreground text-background hover:opacity-90"
                    : "border border-ink-200 text-foreground hover:bg-ink-100"
                )}
                onMouseEnter={(e) => {
                  if (link.type !== "email") {
                    e.currentTarget.style.borderColor = accent.hex;
                  }
                }}
                onMouseLeave={(e) => {
                  if (link.type !== "email") {
                    e.currentTarget.style.borderColor = "";
                  }
                }}
              >
                {link.label}
              </Link>
            );

            if (link.type === "email") {
              return <MagneticWrap key={link.label}>{pill}</MagneticWrap>;
            }

            return <span key={link.label}>{pill}</span>;
          })}
        </div>
      </SectionMotion>
    </SectionShell>
  );
}
