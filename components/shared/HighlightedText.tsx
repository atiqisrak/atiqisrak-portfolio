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
  variant?: "box" | "marker";
  className?: string;
};

export function HighlightedText({
  children,
  colorIndex = 0,
  accentKey,
  strong = false,
  variant = "box",
  className,
}: HighlightedTextProps) {
  const accent = accentKey
    ? getJapaneseAccent(accentKey)
    : getAccent(colorIndex);

  if (variant === "marker") {
    return (
      <span
        className={cn("box-decoration-clone px-0.5 text-foreground", className)}
        style={{
          backgroundImage: `linear-gradient(transparent 62%, ${
            strong ? `${accent.hex}a8` : `${accent.hex}73`
          } 62%)`,
        }}
      >
        {children}
      </span>
    );
  }

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
