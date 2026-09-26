import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** `01 / SELECTED WORK` — the numbered label that opens every section. */
export function SectionHeading({
  index,
  title,
  action,
  className,
}: {
  index: string;
  title: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16",
        className,
      )}
    >
      <h2 className="label text-fg-muted">
        <span className="text-accent">{index}</span>
        <span className="px-2 text-fg-subtle">/</span>
        <span className="text-fg">{title}</span>
      </h2>
      {action}
    </div>
  );
}
