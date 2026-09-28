import type { InputHTMLAttributes, Ref } from "react";
import { cn } from "@/lib/utils/cn";

export type FieldVariant = "boxed" | "underline";

export const FIELD_BASE =
  "w-full bg-transparent text-sm text-fg placeholder:text-fg-subtle transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

export const FIELD_VARIANTS: Record<FieldVariant, string> = {
  boxed:
    "rounded-md border border-border bg-surface px-3 py-2.5 focus:border-accent focus:ring-2 focus:ring-accent/20 aria-[invalid=true]:border-danger",
  underline:
    "border-0 border-b border-border px-0 py-2.5 focus:border-accent aria-[invalid=true]:border-danger",
};

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: FieldVariant;
  invalid?: boolean;
  ref?: Ref<HTMLInputElement>;
};

export function Input({
  variant = "boxed",
  invalid,
  className,
  ...props
}: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(FIELD_BASE, FIELD_VARIANTS[variant], className)}
      {...props}
    />
  );
}
