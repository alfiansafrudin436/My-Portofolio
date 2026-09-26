"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/Button";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EmptyState } from "@/components/EmptyState";
import { IconButton } from "@/components/IconButton";
import { Modal } from "@/components/Modal";
import { SocialIcon } from "@/components/SocialIcon";
import { Switch } from "@/components/Switch";
import { Table, type Column } from "@/components/Table";
import { DataTableToolbar } from "@/app/master-data/components/DataTableToolbar";
import { SocialLinkForm } from "@/app/master-data/social-links/components/SocialLinkForm";
import {
  useSocialLinks,
  type VisibilityFilter,
} from "@/app/master-data/social-links/hooks";
import type { SocialLink } from "@/types/models";

export function SocialLinksTable({ initialData }: { initialData: SocialLink[] }) {
  const links = useSocialLinks(initialData);

  const columns: Column<SocialLink>[] = [
    {
      key: "label",
      header: "Label",
      render: (row) => (
        <span className="flex items-center gap-3">
          <SocialIcon name={row.icon} className="size-4 text-fg-muted" />
          <span className="font-medium text-fg">{row.label}</span>
        </span>
      ),
    },
    {
      key: "url",
      header: "URL",
      render: (row) => (
        <span className="text-xs break-all text-fg-muted">{row.url}</span>
      ),
    },
    {
      key: "order",
      header: "Order",
      width: "w-20",
      render: (row) => <span className="text-fg-muted">{row.sort_order}</span>,
    },
    {
      key: "visible",
      header: "Visible",
      width: "w-24",
      align: "center",
      render: (row) => (
        <Switch
          checked={row.is_visible}
          onChange={() => links.toggleVisibility(row)}
          disabled={links.isPending}
          label={`Toggle visibility for ${row.label}`}
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
          <IconButton size="sm" label={`Edit ${row.label}`} onClick={() => links.openEdit(row)}>
            <Pencil className="size-3.5" aria-hidden />
          </IconButton>
          <IconButton
            size="sm"
            label={`Delete ${row.label}`}
            onClick={() => links.askDelete(row)}
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
        query={links.query}
        onQueryChange={links.setQuery}
        placeholder="Search by label or URL"
        status={links.status}
        statusOptions={links.statusOptions}
        onStatusChange={(value) => links.setStatus(value as VisibilityFilter)}
        action={
          <Button onClick={links.openCreate}>
            <Plus className="size-3.5" aria-hidden />
            New link
          </Button>
        }
      />

      <Table
        columns={columns}
        rows={links.filteredRows}
        getRowId={(row) => row.id}
        emptyState={
          <EmptyState
            title={links.rows.length === 0 ? "No links yet" : "No matches"}
            description={
              links.rows.length === 0
                ? "Add the profiles you want listed in the footer and Contact."
                : "Try a different search or filter."
            }
            action={
              links.rows.length === 0 ? (
                <Button onClick={links.openCreate}>New link</Button>
              ) : undefined
            }
          />
        }
      />

      <Modal
        isOpen={links.isModalOpen}
        onClose={links.closeModal}
        title={links.editing ? "Edit link" : "New link"}
      >
        <SocialLinkForm
          link={links.editing}
          isPending={links.isPending}
          onCancel={links.closeModal}
          onSubmit={links.submit}
        />
      </Modal>

      <ConfirmDialog
        isOpen={links.isConfirmOpen}
        title="Delete link"
        message={`This permanently removes "${links.pendingDelete?.label}".`}
        isPending={links.isPending}
        onCancel={links.cancelDelete}
        onConfirm={links.confirmDelete}
      />
    </>
  );
}
