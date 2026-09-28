import type { InputHTMLAttributes, Ref } from "react";
import { cn } from "@/lib/utils/cn";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: string;
  description?: string;
  ref?: Ref<HTMLInputElement>;
};

export function Checkbox({
  label,
  description,
  className,
  ...props
}: CheckboxProps) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3", className)}>
      <input
        type="checkbox"
        className="mt-0.5 size-4 shrink-0 appearance-none rounded border border-fg-subtle bg-surface transition-colors checked:border-accent checked:bg-accent checked:after:block checked:after:h-full checked:after:w-full checked:after:bg-accent-fg checked:after:[clip-path:polygon(14%_44%,0_65%,50%_100%,100%_16%,80%_0,43%_62%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        {...props}
      />
      <span>
        <span className="block text-sm text-fg">{label}</span>
        {description && (
          <span className="block text-xs text-fg-muted">{description}</span>
        )}
      </span>
    </label>
  );
}
