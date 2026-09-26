"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createProject,
  deleteProject,
  swapProjectOrder,
  toggleProjectFlag,
  updateProject,
} from "@/actions/projects";
import { useToast } from "@/components/Toast/hooks";
import type { ProjectInput } from "@/lib/validations/project";
import type { Project } from "@/types/models";

export type StatusFilter = "all" | "published" | "draft";

export const PROJECT_STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

export function useProjects(initialData: Project[]) {
  const router = useRouter();
  const toast = useToast();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [editing, setEditing] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Project | null>(null);

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return initialData.filter((project) => {
      const matchesQuery =
        !needle ||
        project.title.toLowerCase().includes(needle) ||
        project.slug.includes(needle) ||
        project.tech_stack.some((tech) => tech.toLowerCase().includes(needle));

      const matchesStatus =
        status === "all" ||
        (status === "published" ? project.is_published : !project.is_published);

      return matchesQuery && matchesStatus;
    });
  }, [initialData, query, status]);

  const openCreate = useCallback(() => {
    setEditing(null);
    setIsModalOpen(true);
  }, []);

  const openEdit = useCallback((project: Project) => {
    setEditing(project);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditing(null);
  }, []);

  const submit = useCallback(
    (values: ProjectInput) =>
      new Promise<boolean>((resolve) => {
        startTransition(async () => {
          const result = editing
            ? await updateProject(editing.id, values)
            : await createProject(values);

          if (!result.ok) {
            toast.error(result.error);
            resolve(false);
            return;
          }

          toast.success(editing ? "Project updated" : "Project created");
          closeModal();
          // The server component re-runs and hands down fresh initialData.
          router.refresh();
          resolve(true);
        });
      }),
    [closeModal, editing, router, toast],
  );

  const askDelete = useCallback((project: Project) => setPendingDelete(project), []);
  const cancelDelete = useCallback(() => setPendingDelete(null), []);

  const confirmDelete = useCallback(() => {
    if (!pendingDelete) return;
    const target = pendingDelete;
    startTransition(async () => {
      const result = await deleteProject(target.id);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Project deleted");
      setPendingDelete(null);
      router.refresh();
    });
  }, [pendingDelete, router, toast]);

  const toggleFlag = useCallback(
    (project: Project, field: "is_published" | "is_featured") => {
      startTransition(async () => {
        const result = await toggleProjectFlag(
          project.id,
          field,
          !project[field],
        );
        if (!result.ok) {
          toast.error(result.error);
          return;
        }
        router.refresh();
      });
    },
    [router, toast],
  );

  /** Reorders within the currently filtered view, which is what the user sees. */
  const move = useCallback(
    (project: Project, direction: "up" | "down") => {
      const index = filteredRows.findIndex((row) => row.id === project.id);
      const neighbour = filteredRows[direction === "up" ? index - 1 : index + 1];
      if (!neighbour) return;

      startTransition(async () => {
        const result = await swapProjectOrder(
          { id: project.id, sort_order: project.sort_order },
          { id: neighbour.id, sort_order: neighbour.sort_order },
        );
        if (!result.ok) {
          toast.error(result.error);
          return;
        }
        router.refresh();
      });
    },
    [filteredRows, router, toast],
  );

  return {
    // data
    rows: initialData,
    filteredRows,
    query,
    status,
    statusOptions: PROJECT_STATUS_OPTIONS,
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
    toggleFlag,
    move,
  };
}
