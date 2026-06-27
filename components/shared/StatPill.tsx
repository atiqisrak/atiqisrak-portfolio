import { cn } from "@/lib/utils";

type StatPillProps = {
  children: React.ReactNode;
  className?: string;
};

export function StatPill({ children, className }: StatPillProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm font-medium",
        "bg-ink-100 text-ink-800 transition-colors",
        "hover:bg-ink-900 hover:text-white",
        className
      )}
    >
      {children}
    </span>
  );
}
