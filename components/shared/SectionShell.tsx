import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function SectionShell({
  id,
  children,
  className,
  ariaLabel,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-16", className)}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
}
