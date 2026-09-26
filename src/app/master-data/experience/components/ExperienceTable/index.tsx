"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/Button";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EmptyState } from "@/components/EmptyState";
import { IconButton } from "@/components/IconButton";
import { Modal } from "@/components/Modal";
import { Switch } from "@/components/Switch";
import { Table, type Column } from "@/components/Table";
import { DataTableToolbar } from "@/app/master-data/components/DataTableToolbar";
import { ExperienceForm } from "@/app/master-data/experience/components/ExperienceForm";
import {
  useExperiences,
  type VisibilityFilter,
} from "@/app/master-data/experience/hooks";
import { EMPLOYMENT_TYPE_LABELS } from "@/lib/constants";
import { formatDateRange } from "@/lib/utils/date";
import type { Experience } from "@/types/models";

export function ExperienceTable({ initialData }: { initialData: Experience[] }) {
  const experiences = useExperiences(initialData);

  const columns: Column<Experience>[] = [
    {
      key: "position",
      header: "Position",
      render: (row) => (
        <div>
          <p className="font-medium text-fg">{row.position}</p>
          <p className="text-xs text-fg-subtle">{row.company}</p>
        </div>
      ),
    },
    {
      key: "period",
      header: "Period",
      render: (row) => (
        <span className="text-fg-muted">
          {formatDateRange(row.start_date, row.end_date, row.is_current)}
        </span>
      ),
    },
    {
      key: "type",
      header: "Type",
      width: "w-32",
      render: (row) => (
        <span className="text-fg-muted">
          {EMPLOYMENT_TYPE_LABELS[row.employment_type]}
        </span>
      ),
    },
    {
      key: "visible",
      header: "Visible",
      width: "w-24",
      align: "center",
      render: (row) => (
        <Switch
          checked={row.is_visible}
          onChange={() => experiences.toggleVisibility(row)}
          disabled={experiences.isPending}
          label={`Toggle visibility for ${row.position}`}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "w-24",
      align: "right",
      render: (row) => (
        <div className="flex justify-end gap-1">
          <IconButton
            size="sm"
            label={`Edit ${row.position}`}
            onClick={() => experiences.openEdit(row)}
          >
            <Pencil className="size-3.5" aria-hidden />
          </IconButton>
          <IconButton
            size="sm"
            label={`Delete ${row.position}`}
            onClick={() => experiences.askDelete(row)}
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
        query={experiences.query}
        onQueryChange={experiences.setQuery}
        placeholder="Search by position, company or stack"
        status={experiences.status}
        statusOptions={experiences.statusOptions}
        onStatusChange={(value) => experiences.setStatus(value as VisibilityFilter)}
        action={
          <Button onClick={experiences.openCreate}>
            <Plus className="size-3.5" aria-hidden />
            New entry
          </Button>
        }
      />

      <Table
        columns={columns}
        rows={experiences.filteredRows}
        getRowId={(row) => row.id}
        emptyState={
          <EmptyState
            title={experiences.rows.length === 0 ? "No experience yet" : "No matches"}
            description={
              experiences.rows.length === 0
                ? "Add your work history to fill the Experience timeline."
                : "Try a different search or filter."
            }
            action={
              experiences.rows.length === 0 ? (
                <Button onClick={experiences.openCreate}>New entry</Button>
              ) : undefined
            }
          />
        }
      />

      <Modal
        isOpen={experiences.isModalOpen}
        onClose={experiences.closeModal}
        title={experiences.editing ? "Edit experience" : "New experience"}
        size="lg"
      >
        <ExperienceForm
          experience={experiences.editing}
          isPending={experiences.isPending}
          onCancel={experiences.closeModal}
          onSubmit={experiences.submit}
        />
      </Modal>

      <ConfirmDialog
        isOpen={experiences.isConfirmOpen}
        title="Delete experience"
        message={`This permanently removes "${experiences.pendingDelete?.position}" at ${experiences.pendingDelete?.company}.`}
        isPending={experiences.isPending}
        onCancel={experiences.cancelDelete}
        onConfirm={experiences.confirmDelete}
      />
    </>
  );
}
