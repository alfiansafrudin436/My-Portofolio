"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EmptyState } from "@/components/EmptyState";
import { IconButton } from "@/components/IconButton";
import { Modal } from "@/components/Modal";
import { Switch } from "@/components/Switch";
import { Table, type Column } from "@/components/Table";
import { DataTableToolbar } from "@/app/master-data/components/DataTableToolbar";
import { SkillForm } from "@/app/master-data/skills/components/SkillForm";
import { useSkills, type VisibilityFilter } from "@/app/master-data/skills/hooks";
import { PROFICIENCY_LABELS, SKILL_CATEGORY_LABELS } from "@/lib/constants";
import type { Skill } from "@/types/models";

export function SkillsTable({ initialData }: { initialData: Skill[] }) {
  const skills = useSkills(initialData);

  const columns: Column<Skill>[] = [
    {
      key: "name",
      header: "Name",
      render: (skill) => <span className="font-medium text-fg">{skill.name}</span>,
    },
    {
      key: "category",
      header: "Category",
      render: (skill) => (
        <span className="text-fg-muted">
          {SKILL_CATEGORY_LABELS[skill.category]}
        </span>
      ),
    },
    {
      key: "level",
      header: "Level",
      width: "w-32",
      render: (skill) =>
        skill.level ? (
          <Badge tone="neutral">{PROFICIENCY_LABELS[skill.level]}</Badge>
        ) : (
          <span className="text-fg-subtle">—</span>
        ),
    },
    {
      key: "years",
      header: "Years",
      width: "w-20",
      render: (skill) => (
        <span className="text-fg-muted">{skill.years ?? "—"}</span>
      ),
    },
    {
      key: "visible",
      header: "Visible",
      width: "w-24",
      align: "center",
      render: (skill) => (
        <Switch
          checked={skill.is_visible}
          onChange={() => skills.toggleVisibility(skill)}
          disabled={skills.isPending}
          label={`Toggle visibility for ${skill.name}`}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "w-24",
      align: "right",
      render: (skill) => (
        <div className="flex justify-end gap-1">
          <IconButton
            size="sm"
            label={`Edit ${skill.name}`}
            onClick={() => skills.openEdit(skill)}
          >
            <Pencil className="size-3.5" aria-hidden />
          </IconButton>
          <IconButton
            size="sm"
            label={`Delete ${skill.name}`}
            onClick={() => skills.askDelete(skill)}
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
        query={skills.query}
        onQueryChange={skills.setQuery}
        placeholder="Search by name or category"
        status={skills.status}
        statusOptions={skills.statusOptions}
        onStatusChange={(value) => skills.setStatus(value as VisibilityFilter)}
        action={
          <Button onClick={skills.openCreate}>
            <Plus className="size-3.5" aria-hidden />
            New skill
          </Button>
        }
      />

      <Table
        columns={columns}
        rows={skills.filteredRows}
        getRowId={(skill) => skill.id}
        emptyState={
          <EmptyState
            title={skills.rows.length === 0 ? "No skills yet" : "No matches"}
            description={
              skills.rows.length === 0
                ? "Add the technologies you want listed under Capabilities."
                : "Try a different search or filter."
            }
            action={
              skills.rows.length === 0 ? (
                <Button onClick={skills.openCreate}>New skill</Button>
              ) : undefined
            }
          />
        }
      />

      <Modal
        isOpen={skills.isModalOpen}
        onClose={skills.closeModal}
        title={skills.editing ? "Edit skill" : "New skill"}
      >
        <SkillForm
          skill={skills.editing}
          isPending={skills.isPending}
          onCancel={skills.closeModal}
          onSubmit={skills.submit}
        />
      </Modal>

      <ConfirmDialog
        isOpen={skills.isConfirmOpen}
        title="Delete skill"
        message={`This permanently removes "${skills.pendingDelete?.name}".`}
        isPending={skills.isPending}
        onCancel={skills.cancelDelete}
        onConfirm={skills.confirmDelete}
      />
    </>
  );
}
