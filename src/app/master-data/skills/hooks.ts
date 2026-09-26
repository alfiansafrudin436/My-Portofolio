"use client";

import {
  createSkill,
  deleteSkill,
  toggleSkillVisibility,
  updateSkill,
} from "@/actions/skills";
import { useEntityTable, type VisibilityFilter } from "@/lib/hooks/useEntityTable";
import type { SkillInput } from "@/lib/validations/skill";
import type { Skill } from "@/types/models";

export type { VisibilityFilter };

export function useSkills(initialData: Skill[]) {
  return useEntityTable<Skill, SkillInput>({
    initialData,
    search: (skill) => `${skill.name} ${skill.category}`,
    isVisible: (skill) => skill.is_visible,
    nouns: { singular: "Skill" },
    create: createSkill,
    update: updateSkill,
    remove: deleteSkill,
    setVisibility: toggleSkillVisibility,
  });
}
