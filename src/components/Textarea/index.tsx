import type { Ref, TextareaHTMLAttributes } from "react";
import { FIELD_BASE, FIELD_VARIANTS, type FieldVariant } from "@/components/Input";
import { cn } from "@/lib/utils/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: FieldVariant;
  invalid?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
};

export function Textarea({
  variant = "boxed",
  invalid,
  rows = 4,
  className,
  ...props
}: TextareaProps) {
  return (
    <textarea
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(FIELD_BASE, FIELD_VARIANTS[variant], "resize-y", className)}
      {...props}
    />
  );
}
