import Link from "next/link";
import { MoveRight } from "lucide-react";
import type { Job } from "@/lib/content/portfolio";
import { formatJobPeriod } from "@/lib/content/portfolio";
import { AccentPill } from "@/components/shared/AccentPill";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { AnimatedSquiggle, Sparkle } from "@/components/shared/decorations";

type ExperienceCardProps = {
  job: Job;
  colorIndex?: number;
  showSquiggle?: boolean;
  accentHex?: string;
};

function JobDescription({
  job,
  colorIndex,
}: {
  job: Job;
  colorIndex: number;
}) {
  if (job.slug === "chromatics-ai") {
    return (
      <>
        Building a portfolio of{" "}
        <HighlightedText accentKey="ikigaiCerulean" colorIndex={colorIndex}>
          AI products
        </HighlightedText>{" "}
        — Bento, Aisha, GEO — from problem to revenue. I own strategy, scope,
        and the metrics that prove they work, building for real businesses, not
        demos.
      </>
    );
  }
  if (job.slug === "ether-technologies") {
    return (
      <>
        Shipped eight products spanning infrastructure, commerce, healthcare, and
        AI — including AssetIQ, an RFID + AI inventory system that drove{" "}
        <HighlightedText accentKey="matcha" strong colorIndex={colorIndex}>
          264% revenue growth
        </HighlightedText>
        .
      </>
    );
  }
  if (job.slug === "navana") {
    return (
      <>
        Built systems for Toyota (Navana) — saving{" "}
        <HighlightedText accentKey="sun" strong colorIndex={colorIndex}>
          $40M
        </HighlightedText>
        . Also led Gloria Jean&apos;s, Neoshift POS (1,000+ restaurants), and
        Navbot.
      </>
    );
  }
  if (job.slug === "techcare") {
    return (
      <>
        Templates reached{" "}
        <HighlightedText accentKey="sakura" colorIndex={colorIndex}>
          863K+ global downloads
        </HighlightedText>{" "}
        and 430K+ purchases on Templately — early proof of shipping at scale.
      </>
    );
  }
  return <>{job.description}</>;
}

export function ExperienceCard({
  job,
  colorIndex = 0,
  showSquiggle = false,
  accentHex,
}: ExperienceCardProps) {
  return (
    <article className="group">
      {showSquiggle ? (
        <div className="mb-4 lg:hidden">
          <AnimatedSquiggle />
        </div>
      ) : null}
      <div className="rounded-2xl border border-ink-100 p-6 transition-colors group-hover:border-ink-200 lg:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-playfair text-xl font-bold text-foreground">
              {job.role}
            </h3>
            <p className="mt-1 text-base font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              {job.company}
            </p>
          </div>
          <time className="shrink-0 rounded-full border border-ink-100 px-3 py-1 text-xs text-muted-foreground">
            {formatJobPeriod(job.startDate, job.endDate)}
          </time>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:text-base">
          <JobDescription job={job} colorIndex={colorIndex} />
        </p>

        {job.headlineMetrics?.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {job.headlineMetrics.map((metric, index) => (
              <li key={metric}>
                <AccentPill size="sm" colorIndex={colorIndex + index}>
                  {metric}
                </AccentPill>
              </li>
            ))}
          </ul>
        ) : null}

        {job.supportingMetrics?.length ? (
          <ul className="mt-4 space-y-1 text-xs text-muted-foreground">
            {job.supportingMetrics.map((metric) => (
              <li key={metric}>· {metric}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

export function ExperienceResumeLink() {
  const resumePath =
    process.env.NEXT_PUBLIC_RESUME_LINK || "/AtiqIsrak_Resume.pdf";

  return (
    <Link
      href={resumePath}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
    >
      View full resume
      <Sparkle className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-90 motion-reduce:transition-none motion-reduce:group-hover:rotate-0" />
      <MoveRight className="h-4 w-4" />
    </Link>
  );
}
