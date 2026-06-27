import type { JapaneseAccentKey } from "@/lib/design/accent-colors";
import { FloatingOrb } from "@/components/shared/decorations";

type SectionBreatherProps = {
  accent?: JapaneseAccentKey;
};

export function SectionBreather({ accent = "matcha" }: SectionBreatherProps) {
  return (
    <div
      className="relative h-12 w-full lg:h-20"
      aria-hidden
    >
      <FloatingOrb
        accent={accent}
        className="left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
