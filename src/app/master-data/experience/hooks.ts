"use client";

import {
  createExperience,
  deleteExperience,
  toggleExperienceVisibility,
  updateExperience,
} from "@/actions/experiences";
import { useEntityTable, type VisibilityFilter } from "@/lib/hooks/useEntityTable";
import type { ExperienceInput } from "@/lib/validations/experience";
import type { Experience } from "@/types/models";

export type { VisibilityFilter };

export function useExperiences(initialData: Experience[]) {
  return useEntityTable<Experience, ExperienceInput>({
    initialData,
    search: (row) => `${row.position} ${row.company} ${row.tech_stack.join(" ")}`,
    isVisible: (row) => row.is_visible,
    nouns: { singular: "Experience" },
    create: createExperience,
    update: updateExperience,
    remove: deleteExperience,
    setVisibility: toggleExperienceVisibility,
  });
}
