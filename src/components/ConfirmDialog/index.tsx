"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Delete",
  isPending = false,
  /** When set, the user must type this exact string before confirming. */
  confirmPhrase,
  onCancel,
  onConfirm,
}: {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  isPending?: boolean;
  confirmPhrase?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [typed, setTyped] = useState("");

  // Clear the typed phrase whenever the dialog reopens, adjusted during
  // render rather than in an effect.
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (!isOpen) setTyped("");
  }

  const canConfirm = !confirmPhrase || typed.trim() === confirmPhrase;

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} size="sm">
      <p className="text-sm text-fg-muted">{message}</p>

      {confirmPhrase && (
        <label className="mt-5 block">
          <span className="label block text-fg-muted">
            Type <span className="text-fg">{confirmPhrase}</span> to confirm
          </span>
          <Input
            value={typed}
            onChange={(event) => setTyped(event.target.value)}
            className="mt-2"
            autoComplete="off"
          />
        </label>
      )}

      <div className="mt-8 flex justify-end gap-3">
        <Button variant="ghost" onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={onConfirm}
          disabled={!canConfirm}
          isLoading={isPending}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
