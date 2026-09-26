"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  STORAGE_BUCKET,
  buildObjectKey,
  objectKeyFromUrl,
} from "@/lib/supabase/storage";
import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_BYTES } from "@/lib/constants";

function validate(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])) {
    return "Use a PNG, JPEG, WebP, AVIF or SVG image";
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return "Image must be 5 MB or smaller";
  }
  return null;
}

/**
 * Uploads straight from the browser to Storage — the bucket policies in
 * migration 0007 gate it, so this needs no server round-trip. The resulting
 * public URL is handed back for the form field to store.
 */
export function useFileUpload({
  folder,
  onUploaded,
}: {
  folder: string;
  onUploaded: (url: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File) => {
      const invalid = validate(file);
      if (invalid) {
        setError(invalid);
        return;
      }

      setError(null);
      setIsUploading(true);

      try {
        const supabase = createClient();
        const key = buildObjectKey(folder, file.name);

        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(key, file, { cacheControl: "31536000", upsert: false });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(key);
        onUploaded(data.publicUrl);
      } catch (cause) {
        setError(
          cause instanceof Error ? cause.message : "Upload failed, try again",
        );
      } finally {
        setIsUploading(false);
      }
    },
    [folder, onUploaded],
  );

  /** Best-effort: a failed remove leaves an orphan, it must not block the form. */
  const removeFromStorage = useCallback(async (url: string) => {
    const key = objectKeyFromUrl(url);
    if (!key) return;
    try {
      const supabase = createClient();
      await supabase.storage.from(STORAGE_BUCKET).remove([key]);
    } catch (cause) {
      console.warn("Could not remove storage object", cause);
    }
  }, []);

  return {
    // data
    isUploading,
    error,
    // methods
    upload,
    removeFromStorage,
    clearError: () => setError(null),
  };
}
