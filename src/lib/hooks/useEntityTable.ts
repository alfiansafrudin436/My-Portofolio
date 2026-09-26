"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast/hooks";
import type { ActionResult } from "@/lib/utils/result";

export type VisibilityFilter = "all" | "visible" | "hidden";

export const VISIBILITY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "visible", label: "Visible" },
  { value: "hidden", label: "Hidden" },
];

type Row = { id: string };

export type EntityTableConfig<T extends Row, TInput> = {
  initialData: T[];
  /** Fields to match the search box against. */
  search: (row: T) => string;
  /** Whether the row is public. Omit for entities with no visibility flag. */
  isVisible?: (row: T) => boolean;
  nouns: { singular: string };
  create: (input: TInput) => Promise<ActionResult<T>>;
  update: (id: string, input: TInput) => Promise<ActionResult<T>>;
  remove: (id: string) => Promise<ActionResult>;
  setVisibility?: (id: string, value: boolean) => Promise<ActionResult>;
};

/**
 * Every master-data table behaves identically: search, filter, modal form,
 * delete confirmation, optional visibility toggle. Each page's hooks.ts wraps
 * this with its own entity types rather than repeating the state machine.
 *
 * Rows come from the Server Component as initialData; after a mutation the
 * action revalidates and router.refresh() re-runs it, so there is no
 * client-side cache to keep in sync.
 */
export function useEntityTable<T extends Row, TInput>({
  initialData,
  search,
  isVisible,
  nouns,
  create,
  update,
  remove,
  setVisibility,
}: EntityTableConfig<T, TInput>) {
  const router = useRouter();
  const toast = useToast();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<VisibilityFilter>("all");
  const [editing, setEditing] = useState<T | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<T | null>(null);

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return initialData.filter((row) => {
      const matchesQuery = !needle || search(row).toLowerCase().includes(needle);
      if (!matchesQuery) return false;
      if (status === "all" || !isVisible) return true;
      return status === "visible" ? isVisible(row) : !isVisible(row);
    });
  }, [initialData, isVisible, query, search, status]);

  const openCreate = useCallback(() => {
    setEditing(null);
    setIsModalOpen(true);
  }, []);

  const openEdit = useCallback((row: T) => {
    setEditing(row);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditing(null);
  }, []);

  const submit = useCallback(
    (values: TInput) =>
      new Promise<boolean>((resolve) => {
        startTransition(async () => {
          const result = editing
            ? await update(editing.id, values)
            : await create(values);

          if (!result.ok) {
            toast.error(result.error);
            resolve(false);
            return;
          }

          toast.success(
            `${nouns.singular} ${editing ? "updated" : "created"}`,
          );
          closeModal();
          router.refresh();
          resolve(true);
        });
      }),
    [closeModal, create, editing, nouns.singular, router, toast, update],
  );

  const askDelete = useCallback((row: T) => setPendingDelete(row), []);
  const cancelDelete = useCallback(() => setPendingDelete(null), []);

  const confirmDelete = useCallback(() => {
    if (!pendingDelete) return;
    const target = pendingDelete;
    startTransition(async () => {
      const result = await remove(target.id);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(`${nouns.singular} deleted`);
      setPendingDelete(null);
      router.refresh();
    });
  }, [nouns.singular, pendingDelete, remove, router, toast]);

  const toggleVisibility = useCallback(
    (row: T) => {
      if (!setVisibility || !isVisible) return;
      startTransition(async () => {
        const result = await setVisibility(row.id, !isVisible(row));
        if (!result.ok) {
          toast.error(result.error);
          return;
        }
        router.refresh();
      });
    },
    [isVisible, router, setVisibility, toast],
  );

  return {
    // data
    rows: initialData,
    filteredRows,
    query,
    status,
    statusOptions: VISIBILITY_OPTIONS,
    isPending,
    isModalOpen,
    editing,
    pendingDelete,
    isConfirmOpen: pendingDelete !== null,
    // methods
    setQuery,
    setStatus,
    openCreate,
    openEdit,
    closeModal,
    submit,
    askDelete,
    cancelDelete,
    confirmDelete,
    toggleVisibility,
  };
}
