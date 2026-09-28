import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Section opener: small accent eyebrow, big title, optional summary/action. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14",
        className,
      )}
    >
      <div>
        {eyebrow && (
          <p className="mb-2 text-sm font-medium text-accent">{eyebrow}</p>
        )}
        <h2 className="text-2xl font-semibold tracking-tight text-fg md:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-[56ch] text-fg-muted text-pretty">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
