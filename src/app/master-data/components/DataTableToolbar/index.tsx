"use client";

import { Search } from "lucide-react";
import type { ReactNode } from "react";
import { Input } from "@/components/Input";
import { Select, type SelectOption } from "@/components/Select";

export function DataTableToolbar({
  query,
  onQueryChange,
  placeholder = "Search",
  status,
  statusOptions,
  onStatusChange,
  action,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  placeholder?: string;
  status?: string;
  statusOptions?: SelectOption[];
  onStatusChange?: (value: string) => void;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <div className="relative min-w-52 flex-1">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-subtle"
          aria-hidden
        />
        <Input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="pl-9"
        />
      </div>

      {statusOptions && onStatusChange && (
        <Select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          options={statusOptions}
          aria-label="Filter by status"
          className="w-40"
        />
      )}

      {action}
    </div>
  );
}
