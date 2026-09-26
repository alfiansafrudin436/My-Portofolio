"use client";

import {
  createSocialLink,
  deleteSocialLink,
  toggleSocialLinkVisibility,
  updateSocialLink,
} from "@/actions/social-links";
import { useEntityTable, type VisibilityFilter } from "@/lib/hooks/useEntityTable";
import type { SocialLinkInput } from "@/lib/validations/social-link";
import type { SocialLink } from "@/types/models";

export type { VisibilityFilter };

export function useSocialLinks(initialData: SocialLink[]) {
  return useEntityTable<SocialLink, SocialLinkInput>({
    initialData,
    search: (row) => `${row.label} ${row.url}`,
    isVisible: (row) => row.is_visible,
    nouns: { singular: "Link" },
    create: createSocialLink,
    update: updateSocialLink,
    remove: deleteSocialLink,
    setVisibility: toggleSocialLinkVisibility,
  });
}
