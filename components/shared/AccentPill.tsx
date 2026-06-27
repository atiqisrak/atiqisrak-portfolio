import { getAccent } from "@/lib/design/accent-colors";
import { cn } from "@/lib/utils";

type AccentPillProps = {
  children: React.ReactNode;
  colorIndex?: number;
  size?: "default" | "sm";
  className?: string;
};

export function AccentPill({
  children,
  colorIndex = 0,
  size = "default",
  className,
}: AccentPillProps) {
  const accent = getAccent(colorIndex);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        accent.bg,
        accent.text,
        size === "default" && "min-h-[44px] px-5 py-2.5 text-sm",
        size === "sm" && "min-h-0 px-3 py-1 text-xs",
        className
      )}
    >
      {children}
    </span>
  );
}
