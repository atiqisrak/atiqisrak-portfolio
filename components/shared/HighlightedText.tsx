import {
  getAccent,
  getJapaneseAccent,
  type JapaneseAccentKey,
} from "@/lib/design/accent-colors";
import { cn } from "@/lib/utils";

type HighlightedTextProps = {
  children: React.ReactNode;
  colorIndex?: number;
  accentKey?: JapaneseAccentKey;
  strong?: boolean;
  className?: string;
};

export function HighlightedText({
  children,
  colorIndex = 0,
  accentKey,
  strong = false,
  className,
}: HighlightedTextProps) {
  const accent = accentKey
    ? getJapaneseAccent(accentKey)
    : getAccent(colorIndex);

  return (
    <span
      className={cn(
        "rounded-sm px-1.5 py-0.5 text-foreground transition-colors duration-300",
        strong ? accent.highlightStrong : accent.highlight,
        className
      )}
    >
      {children}
    </span>
  );
}
