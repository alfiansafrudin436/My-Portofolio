"use client";

import { useCallback, useState, type KeyboardEvent } from "react";

/** Backs every text[] column: tech_stack, highlights, gallery_urls. */
export function useTagInput(
  value: string[],
  onChange: (next: string[]) => void,
) {
  const [draft, setDraft] = useState("");

  const add = useCallback(
    (raw: string) => {
      const tag = raw.trim();
      if (!tag || value.includes(tag)) {
        setDraft("");
        return;
      }
      onChange([...value, tag]);
      setDraft("");
    },
    [onChange, value],
  );

  const remove = useCallback(
    (tag: string) => onChange(value.filter((item) => item !== tag)),
    [onChange, value],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" || event.key === ",") {
        event.preventDefault();
        add(draft);
        return;
      }
      // Backspace on an empty field removes the last tag.
      if (event.key === "Backspace" && draft === "" && value.length > 0) {
        remove(value[value.length - 1]);
      }
    },
    [add, draft, remove, value],
  );

  return {
    // data
    tags: value,
    draft,
    // methods
    setDraft,
    add,
    remove,
    onKeyDown,
    commitDraft: () => add(draft),
  };
}
