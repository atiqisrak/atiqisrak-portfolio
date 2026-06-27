import Link from "next/link";
import { ExternalLink, MoveUpRight } from "lucide-react";
import type { Product } from "@/lib/content/portfolio";
import { getProjectPageHref } from "@/lib/content/portfolio";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  product: Product;
  className?: string;
};

export function ProjectCard({ product, className }: ProjectCardProps) {
  const caseStudyHref = getProjectPageHref(product.slug);

  return (
    <article
      className={cn(
        "rounded-2xl border border-ink-100 bg-background p-6 transition-colors hover:border-ink-300",
        className
      )}
    >
      <header className="mb-3 space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.oneLiner}
        </p>
      </header>

      {product.metrics?.length ? (
        <ul className="mb-4 space-y-1 text-xs text-muted-foreground">
          {product.metrics.map((metric) => (
            <li key={metric}>· {metric}</li>
          ))}
        </ul>
      ) : null}

      <footer className="flex flex-wrap gap-3">
        {product.url ? (
          <Link
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            View live
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        ) : null}
        {caseStudyHref ? (
          <Link
            href={caseStudyHref}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Case study
            <MoveUpRight className="h-3.5 w-3.5" />
          </Link>
        ) : null}
      </footer>
    </article>
  );
}
