import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  divided?: boolean;
  spacious?: boolean;
};

export function SectionShell({
  id,
  children,
  className,
  ariaLabel,
  divided = true,
  spacious = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-16",
        divided &&
          cn(
            "border-b border-ink-100 last:border-b-0",
            spacious ? "pb-24 lg:pb-36" : "pb-16 lg:pb-24",
            "last:pb-0"
          ),
        className
      )}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
}
