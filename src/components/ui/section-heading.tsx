import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  invert = false,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <div className="mb-3 flex items-center gap-2">
          <span
            className={cn(
              "text-xs font-bold uppercase tracking-[0.22em]",
              invert ? "text-amber-300" : "text-secondary",
            )}
          >
            ✦ {eyebrow}
          </span>
        </div>
      )}
      <h2
        id={id}
        className={cn(
          "font-serif text-[length:var(--text-section)] font-bold leading-[1.15] tracking-tight",
          invert ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-base md:text-lg leading-relaxed font-light",
            invert ? "text-white/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
