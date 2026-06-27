import type { ApproachStep as ApproachStepType } from "@/lib/content/portfolio";

type ApproachStepProps = {
  step: ApproachStepType;
};

export function ApproachStep({ step }: ApproachStepProps) {
  return (
    <article className="h-full rounded-2xl border border-ink-100 bg-ink-50 p-6">
      <p className="text-sm font-semibold text-muted-foreground">{step.number}</p>
      <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {step.description}
      </p>
    </article>
  );
}
