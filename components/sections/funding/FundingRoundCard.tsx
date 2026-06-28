import type { FundingRound } from "@/lib/content/portfolio";
import { AccentPill } from "@/components/shared/AccentPill";
import { HighlightedText } from "@/components/shared/HighlightedText";

type FundingRoundCardProps = {
  round: FundingRound;
  colorIndex?: number;
};

export function FundingRoundCard({ round, colorIndex = 0 }: FundingRoundCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-ink-100 p-6 transition-colors hover:border-ink-200 lg:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-playfair text-xl font-bold text-foreground">
          {round.product}
        </h3>
        <AccentPill size="sm" colorIndex={colorIndex}>
          {round.round}
        </AccentPill>
      </div>

      <p className="mt-4 font-playfair text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
        <HighlightedText colorIndex={colorIndex} strong>
          {round.amount}
        </HighlightedText>
      </p>

      <p className="mt-3 text-sm text-muted-foreground">
        <span className="text-[0.55rem] font-medium uppercase tracking-[0.18em] text-foreground sm:text-xs sm:tracking-[0.2em]">
          Investor
        </span>
        <span className="mt-1 block">{round.investor}</span>
      </p>

      <p className="mt-auto pt-5 text-sm leading-relaxed text-muted-foreground lg:text-base">
        {round.role}
      </p>
    </article>
  );
}
