"use client";

import { faqItems } from "@/lib/content/portfolio";
import { generateFAQSchema } from "@/lib/structured-data";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionMotion } from "@/components/shared/SectionMotion";
import { SectionShell } from "@/components/shared/SectionShell";
import { Sparkle } from "@/components/shared/decorations";
import { getSectionAccent } from "@/lib/design/accent-colors";

const answerHighlights: Record<string, React.ReactNode> = {
  "Who is Atiq Israk?": (
    <>
      Atiq Israk is a{" "}
      <HighlightedText accentKey="indigo">product leader</HighlightedText> and{" "}
      <HighlightedText accentKey="ikigaiCerulean">AI builder</HighlightedText>{" "}
      based in Dhaka, Bangladesh. He turns AI and operational rigor into
      measurable business growth, and has shipped{" "}
      <HighlightedText accentKey="sun" strong>
        15+ products
      </HighlightedText>{" "}
      across B2B and B2C at Chromatics AI, Ether Technologies, and Navana.
    </>
  ),
};

export function FAQ() {
  const faqSchema = generateFAQSchema(
    faqItems.map((item) => ({
      question: item.question,
      answer: item.answer,
    }))
  );

  return (
    <SectionShell ariaLabel="Frequently asked questions" decorated decorationVariant="right">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SectionHeading
        eyebrow="FAQ"
        title={
          <>
            Common{" "}
            <HighlightedText accentKey="ikigaiCerulean">questions</HighlightedText>
          </>
        }
        showWavyLine
      />
      <SectionMotion className="mt-10 divide-y divide-ink-100">
        {faqItems.map((item, index) => {
          const accent = getSectionAccent("faq", index);
          const highlightedAnswer = answerHighlights[item.question];

          return (
            <details
              key={item.question}
              className="group relative py-4 pl-4 transition-[padding] open:pl-5"
            >
              <span
                className="absolute left-0 top-4 h-0 w-1 rounded-full bg-transparent transition-all duration-300 group-open:h-[calc(100%-2rem)] group-open:bg-current"
                style={{ color: accent.hex }}
                aria-hidden
              />
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-sm text-base font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 marker:content-none [&::-webkit-details-marker]:hidden">
                <Sparkle className="h-4 w-4 shrink-0 transition-transform duration-300 motion-reduce:transition-none group-open:rotate-90" />
                {item.question}
              </summary>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr] motion-reduce:transition-none">
                <div className="overflow-hidden">
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {highlightedAnswer ?? item.answer}
                  </p>
                </div>
              </div>
            </details>
          );
        })}
      </SectionMotion>
    </SectionShell>
  );
}
