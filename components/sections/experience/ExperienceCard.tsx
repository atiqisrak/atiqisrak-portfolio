import Link from "next/link";
import { MoveRight } from "lucide-react";
import type { Job } from "@/lib/content/portfolio";
import { formatJobPeriod } from "@/lib/content/portfolio";

type ExperienceCardProps = {
  job: Job;
};

export function ExperienceCard({ job }: ExperienceCardProps) {
  return (
    <article className="rounded-2xl border border-ink-100 p-6 lg:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{job.role}</h3>
          <p className="mt-1 text-base font-medium text-muted-foreground">
            {job.company}
          </p>
        </div>
        <time className="shrink-0 rounded-full border border-ink-100 bg-ink-50 px-3 py-1 text-xs text-muted-foreground">
          {formatJobPeriod(job.startDate, job.endDate)}
        </time>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:text-base">
        {job.description}
      </p>

      {job.headlineMetrics?.length ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {job.headlineMetrics.map((metric) => (
            <li
              key={metric}
              className="rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-xs font-medium text-foreground"
            >
              {metric}
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
      className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
    >
      View full resume
      <MoveRight className="h-4 w-4" />
    </Link>
  );
}
