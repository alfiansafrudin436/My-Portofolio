import type { Ref, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { FIELD_BASE, FIELD_VARIANTS, type FieldVariant } from "@/components/Input";
import { cn } from "@/lib/utils/cn";

export type SelectOption = { value: string; label: string };

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
  placeholder?: string;
  variant?: FieldVariant;
  invalid?: boolean;
  ref?: Ref<HTMLSelectElement>;
};

export function Select({
  options,
  placeholder,
  variant = "boxed",
  invalid,
  className,
  ...props
}: SelectProps) {
  return (
    <div className="relative">
      <select
        aria-invalid={invalid || undefined}
        className={cn(
          FIELD_BASE,
          FIELD_VARIANTS[variant],
          "appearance-none pr-9",
          className,
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-fg-subtle"
        aria-hidden
      />
    </div>
  );
}
