"use client";

import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EmptyState } from "@/components/EmptyState";
import { IconButton } from "@/components/IconButton";
import { Modal } from "@/components/Modal";
import { Switch } from "@/components/Switch";
import { Table, type Column } from "@/components/Table";
import { DataTableToolbar } from "@/app/master-data/components/DataTableToolbar";
import { ProjectForm } from "@/app/master-data/projects/components/ProjectForm";
import { useProjects, type StatusFilter } from "@/app/master-data/projects/hooks";
import type { Project } from "@/types/models";

export function ProjectsTable({ initialData }: { initialData: Project[] }) {
  const projects = useProjects(initialData);

  const columns: Column<Project>[] = [
    {
      key: "title",
      header: "Title",
      render: (project) => (
        <div>
          <p className="font-medium text-fg">{project.title}</p>
          <p className="text-xs text-fg-subtle">/{project.slug}</p>
        </div>
      ),
    },
    {
      key: "year",
      header: "Year",
      width: "w-20",
      render: (project) => (
        <span className="text-fg-muted">{project.year ?? "—"}</span>
      ),
    },
    {
      key: "tech",
      header: "Stack",
      render: (project) => (
        <span className="text-xs text-fg-muted">
          {project.tech_stack.slice(0, 3).join(", ") || "—"}
          {project.tech_stack.length > 3 && ` +${project.tech_stack.length - 3}`}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "w-32",
      render: (project) =>
        project.is_published ? (
          <Badge tone="success">Published</Badge>
        ) : (
          <Badge tone="muted">Draft</Badge>
        ),
    },
    {
      key: "featured",
      header: "Featured",
      width: "w-24",
      align: "center",
      render: (project) => (
        <Switch
          checked={project.is_featured}
          onChange={() => projects.toggleFlag(project, "is_featured")}
          disabled={projects.isPending}
          label={`Toggle featured for ${project.title}`}
        />
      ),
    },
    {
      key: "order",
      header: "Order",
      width: "w-24",
      align: "center",
      render: (project) => {
        const index = projects.filteredRows.findIndex((row) => row.id === project.id);
        return (
          <div className="flex justify-center gap-1">
            <IconButton
              size="sm"
              label={`Move ${project.title} up`}
              disabled={index === 0 || projects.isPending}
              onClick={() => projects.move(project, "up")}
            >
              <ChevronUp className="size-3.5" aria-hidden />
            </IconButton>
            <IconButton
              size="sm"
              label={`Move ${project.title} down`}
              disabled={
                index === projects.filteredRows.length - 1 || projects.isPending
              }
              onClick={() => projects.move(project, "down")}
            >
              <ChevronDown className="size-3.5" aria-hidden />
            </IconButton>
          </div>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      width: "w-24",
      align: "right",
      render: (project) => (
        <div className="flex justify-end gap-1">
          <IconButton
            size="sm"
            label={`Edit ${project.title}`}
            onClick={() => projects.openEdit(project)}
          >
            <Pencil className="size-3.5" aria-hidden />
          </IconButton>
          <IconButton
            size="sm"
            label={`Delete ${project.title}`}
            onClick={() => projects.askDelete(project)}
            className="hover:border-danger hover:text-danger"
          >
            <Trash2 className="size-3.5" aria-hidden />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTableToolbar
        query={projects.query}
        onQueryChange={projects.setQuery}
        placeholder="Search by title, slug or stack"
        status={projects.status}
        statusOptions={projects.statusOptions}
        onStatusChange={(value) => projects.setStatus(value as StatusFilter)}
        action={
          <Button onClick={projects.openCreate}>
            <Plus className="size-3.5" aria-hidden />
            New project
          </Button>
        }
      />

      <Table
        columns={columns}
        rows={projects.filteredRows}
        getRowId={(project) => project.id}
        emptyState={
          <EmptyState
            title={projects.rows.length === 0 ? "No projects yet" : "No matches"}
            description={
              projects.rows.length === 0
                ? "Create your first project to show it on the site."
                : "Try a different search or status filter."
            }
            action={
              projects.rows.length === 0 ? (
                <Button onClick={projects.openCreate}>New project</Button>
              ) : undefined
            }
          />
        }
      />

      <Modal
        isOpen={projects.isModalOpen}
        onClose={projects.closeModal}
        title={projects.editing ? "Edit project" : "New project"}
        size="lg"
      >
        <ProjectForm
          project={projects.editing}
          isPending={projects.isPending}
          onCancel={projects.closeModal}
          onSubmit={projects.submit}
        />
      </Modal>

      <ConfirmDialog
        isOpen={projects.isConfirmOpen}
        title="Delete project"
        message={`This permanently removes "${projects.pendingDelete?.title}" and its uploaded images.`}
        confirmPhrase={projects.pendingDelete?.slug}
        isPending={projects.isPending}
        onCancel={projects.cancelDelete}
        onConfirm={projects.confirmDelete}
      />
    </>
  );
}
