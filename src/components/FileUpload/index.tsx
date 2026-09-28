"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useFileUpload } from "@/components/FileUpload/hooks";
import { cn } from "@/lib/utils/cn";

export function FileUpload({
  value,
  onChange,
  folder,
  label = "Drop an image, or click to choose",
  /** Keep appending instead of replacing — used for the gallery. */
  multiple = false,
  onRemoveStored,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
  folder: string;
  label?: string;
  multiple?: boolean;
  onRemoveStored?: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { isUploading, error, upload, removeFromStorage } = useFileUpload({
    folder,
    onUploaded: onChange,
  });

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) void upload(file);
  };

  const clear = () => {
    if (value) {
      void removeFromStorage(value);
      onRemoveStored?.(value);
    }
    onChange(null);
  };

  return (
    <div>
      {value && !multiple ? (
        <div className="relative aspect-16/9 w-full overflow-hidden rounded-lg border border-border">
          <Image
            src={value}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <button
            type="button"
            onClick={clear}
            aria-label="Remove image"
            className="absolute top-2 right-2 grid size-8 place-items-center rounded-md border border-border bg-bg text-fg-muted transition-colors hover:text-danger"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            handleFiles(event.dataTransfer.files);
          }}
          disabled={isUploading}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-10 transition-colors",
            isDragging
              ? "border-accent bg-accent-subtle"
              : "border-border hover:border-accent",
            isUploading && "cursor-wait opacity-60",
          )}
        >
          {isUploading ? (
            <Loader2 className="size-5 animate-spin text-fg-muted" aria-hidden />
          ) : (
            <ImagePlus className="size-5 text-fg-subtle" aria-hidden />
          )}
          <span className="text-sm text-fg-muted">
            {isUploading ? "Uploading" : label}
          </span>
          <span className="text-xs text-fg-subtle">PNG, JPEG, WebP or AVIF · max 5 MB</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml"
        className="hidden"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />

      {error && (
        <p role="alert" className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
