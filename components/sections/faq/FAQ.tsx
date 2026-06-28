"use client";

import { faqItems } from "@/lib/content/portfolio";
import { generateFAQSchema } from "@/lib/structured-data";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionMotion } from "@/components/shared/SectionMotion";
import { SectionShell } from "@/components/shared/SectionShell";
import {
  CrossMark,
  DashedArc,
  DiamondOutline,
  EnsoCircle,
  RingOutline,
  Sparkle,
} from "@/components/shared/decorations";
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

function FAQAside() {
  return (
    <aside
      className="relative hidden min-h-[320px] lg:flex lg:items-center lg:justify-center"
      aria-hidden
    >
      <div className="relative h-72 w-full max-w-xs">
        <RingOutline className="absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 text-foreground/20" />
        <EnsoCircle
          size={112}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-foreground/25"
        />
        <DiamondOutline className="absolute bottom-8 left-4 h-14 w-14 text-foreground/15" />
        <CrossMark className="absolute right-6 top-16 h-8 w-8 text-foreground/15" />
        <Sparkle className="absolute bottom-16 right-8 h-6 w-6 text-foreground/20" />
        <DashedArc className="absolute bottom-2 left-1/2 h-14 w-28 -translate-x-1/2 text-foreground/15" />
        <p className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 text-center font-playfair text-sm text-muted-foreground">
          {faqItems.length} answers, one conversation
        </p>
      </div>
    </aside>
  );
}

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
      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)] lg:gap-16 xl:gap-20">
        <SectionMotion className="divide-y divide-ink-100">
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
        <FAQAside />
      </div>
    </SectionShell>
  );
}
