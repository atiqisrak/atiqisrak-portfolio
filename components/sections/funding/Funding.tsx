import { fundingNarrative } from "@/lib/content/portfolio";
import { SectionShell } from "@/components/shared/SectionShell";
import { SectionMotion } from "@/components/shared/SectionMotion";

export function Funding() {
  return (
    <SectionShell ariaLabel="Funding and traction">
      <SectionMotion>
        <div className="rounded-2xl border border-ink-100 bg-ink-50 px-6 py-8 lg:px-10 lg:py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Funding & traction
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground lg:text-lg">
            {fundingNarrative}
          </p>
        </div>
      </SectionMotion>
    </SectionShell>
  );
}
