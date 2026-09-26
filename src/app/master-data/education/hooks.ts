"use client";

import {
  createEducation,
  deleteEducation,
  toggleEducationVisibility,
  updateEducation,
} from "@/actions/education";
import { useEntityTable, type VisibilityFilter } from "@/lib/hooks/useEntityTable";
import type { EducationInput } from "@/lib/validations/education";
import type { Education } from "@/types/models";

export type { VisibilityFilter };

export function useEducation(initialData: Education[]) {
  return useEntityTable<Education, EducationInput>({
    initialData,
    search: (row) =>
      `${row.institution} ${row.degree} ${row.field_of_study ?? ""}`,
    isVisible: (row) => row.is_visible,
    nouns: { singular: "Education" },
    create: createEducation,
    update: updateEducation,
    remove: deleteEducation,
    setVisibility: toggleEducationVisibility,
  });
}
