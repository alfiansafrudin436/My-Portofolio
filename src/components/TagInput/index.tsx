"use client";

import { X } from "lucide-react";
import { useTagInput } from "@/components/TagInput/hooks";
import { cn } from "@/lib/utils/cn";

export function TagInput({
  id,
  value,
  onChange,
  placeholder = "Type and press Enter",
  invalid,
  className,
}: {
  id?: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  invalid?: boolean;
  className?: string;
}) {
  const { tags, draft, setDraft, remove, onKeyDown, commitDraft } = useTagInput(
    value,
    onChange,
  );

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-md border bg-surface px-3 py-2 transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20",
        invalid ? "border-danger" : "border-border",
        className,
      )}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-subtle py-0.5 pr-1.5 pl-2.5 text-xs font-medium text-fg"
        >
          {tag}
          <button
            type="button"
            onClick={() => remove(tag)}
            aria-label={`Remove ${tag}`}
            className="text-fg-subtle transition-colors hover:text-danger"
          >
            <X className="size-3" aria-hidden />
          </button>
        </span>
      ))}
      <input
        id={id}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={onKeyDown}
        onBlur={commitDraft}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="min-w-32 flex-1 bg-transparent py-1 text-sm text-fg placeholder:text-fg-subtle focus:outline-none"
      />
    </div>
  );
}
