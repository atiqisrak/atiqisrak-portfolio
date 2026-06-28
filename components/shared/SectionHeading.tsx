import { WavyLine } from "@/components/shared/decorations";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  className?: string;
  showWavyLine?: boolean;
  titleSize?: "lg" | "xl";
  align?: "left" | "offset" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  className,
  showWavyLine = false,
  titleSize = "lg",
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "offset" && "lg:pl-16 xl:pl-24",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="text-[0.55rem] font-medium uppercase tracking-[0.18em] text-foreground sm:text-xs sm:tracking-[0.2em]">
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-3">
        <h2
          className={cn(
            "font-playfair font-bold tracking-tight text-foreground",
            titleSize === "lg" && "text-3xl leading-tight lg:text-4xl",
            titleSize === "xl" &&
              "text-[2rem] leading-[1.08] min-[375px]:text-[2.25rem] sm:text-[2.5rem] lg:text-[3.5rem] lg:leading-[1.05]"
          )}
        >
          {title}
        </h2>
        {showWavyLine ? (
          <WavyLine className={align === "center" ? "mx-auto" : undefined} />
        ) : null}
      </div>
    </div>
  );
}
