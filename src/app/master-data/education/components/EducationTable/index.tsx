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
import { EducationForm } from "@/app/master-data/education/components/EducationForm";
import {
  useEducation,
  type VisibilityFilter,
} from "@/app/master-data/education/hooks";
import { formatDateRange } from "@/lib/utils/date";
import type { Education } from "@/types/models";

export function EducationTable({ initialData }: { initialData: Education[] }) {
  const education = useEducation(initialData);

  const columns: Column<Education>[] = [
    {
      key: "degree",
      header: "Degree",
      render: (row) => (
        <div>
          <p className="font-medium text-fg">
            {[row.degree, row.field_of_study].filter(Boolean).join(" — ")}
          </p>
          <p className="text-xs text-fg-subtle">{row.institution}</p>
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
      key: "grade",
      header: "Grade",
      width: "w-28",
      render: (row) => <span className="text-fg-muted">{row.grade ?? "—"}</span>,
    },
    {
      key: "visible",
      header: "Visible",
      width: "w-24",
      align: "center",
      render: (row) => (
        <Switch
          checked={row.is_visible}
          onChange={() => education.toggleVisibility(row)}
          disabled={education.isPending}
          label={`Toggle visibility for ${row.degree}`}
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
            label={`Edit ${row.degree}`}
            onClick={() => education.openEdit(row)}
          >
            <Pencil className="size-3.5" aria-hidden />
          </IconButton>
          <IconButton
            size="sm"
            label={`Delete ${row.degree}`}
            onClick={() => education.askDelete(row)}
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
        query={education.query}
        onQueryChange={education.setQuery}
        placeholder="Search by institution or degree"
        status={education.status}
        statusOptions={education.statusOptions}
        onStatusChange={(value) => education.setStatus(value as VisibilityFilter)}
        action={
          <Button onClick={education.openCreate}>
            <Plus className="size-3.5" aria-hidden />
            New entry
          </Button>
        }
      />

      <Table
        columns={columns}
        rows={education.filteredRows}
        getRowId={(row) => row.id}
        emptyState={
          <EmptyState
            title={education.rows.length === 0 ? "No education yet" : "No matches"}
            description={
              education.rows.length === 0
                ? "Add your degrees and courses."
                : "Try a different search or filter."
            }
            action={
              education.rows.length === 0 ? (
                <Button onClick={education.openCreate}>New entry</Button>
              ) : undefined
            }
          />
        }
      />

      <Modal
        isOpen={education.isModalOpen}
        onClose={education.closeModal}
        title={education.editing ? "Edit education" : "New education"}
        size="lg"
      >
        <EducationForm
          education={education.editing}
          isPending={education.isPending}
          onCancel={education.closeModal}
          onSubmit={education.submit}
        />
      </Modal>

      <ConfirmDialog
        isOpen={education.isConfirmOpen}
        title="Delete education"
        message={`This permanently removes "${education.pendingDelete?.degree}" at ${education.pendingDelete?.institution}.`}
        isPending={education.isPending}
        onCancel={education.cancelDelete}
        onConfirm={education.confirmDelete}
      />
    </>
  );
}
