"use client";

import { faqItems } from "@/lib/content/portfolio";
import { generateFAQSchema } from "@/lib/structured-data";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionMotion } from "@/components/shared/SectionMotion";
import { SectionShell } from "@/components/shared/SectionShell";

export function FAQ() {
  const faqSchema = generateFAQSchema(
    faqItems.map((item) => ({
      question: item.question,
      answer: item.answer,
    }))
  );

  return (
    <SectionShell ariaLabel="Frequently asked questions">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SectionHeading eyebrow="FAQ" title="Common questions" />
      <SectionMotion className="mt-8 divide-y divide-ink-100 rounded-2xl border border-ink-100">
        {faqItems.map((item) => (
          <details key={item.question} className="group px-6 py-4">
            <summary className="cursor-pointer list-none rounded-sm text-base font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 marker:content-none [&::-webkit-details-marker]:hidden">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </details>
        ))}
      </SectionMotion>
    </SectionShell>
  );
}
