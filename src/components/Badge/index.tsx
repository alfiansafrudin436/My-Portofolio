import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type BadgeTone = "neutral" | "success" | "muted" | "accent" | "danger";

const TONES: Record<BadgeTone, string> = {
  neutral: "border-border text-fg",
  success: "border-success text-success",
  muted: "border-border text-fg-subtle",
  accent: "border-accent text-accent",
  danger: "border-danger text-danger",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
