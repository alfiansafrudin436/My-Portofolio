import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type BadgeTone = "neutral" | "success" | "muted" | "accent" | "danger";

const TONES: Record<BadgeTone, string> = {
  neutral: "border-border-strong text-fg",
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
        "label inline-flex items-center border px-2 py-1",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
