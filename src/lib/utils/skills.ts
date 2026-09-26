import { SKILL_CATEGORY_LABELS, SKILL_CATEGORY_ORDER } from "@/lib/constants";
import type { Skill, SkillGroup } from "@/types/models";

/**
 * Groups skills into the configured category order, dropping categories with
 * no skills. Pure derivation, not a hook — the capabilities grid renders on
 * the server.
 */
export function groupSkillsByCategory(skills: Skill[]): SkillGroup[] {
  const present = new Set(skills.map((skill) => skill.category));

  return SKILL_CATEGORY_ORDER.filter((category) => present.has(category)).map(
    (category) => ({
      category,
      label: SKILL_CATEGORY_LABELS[category],
      skills: skills.filter((skill) => skill.category === category),
    }),
  );
}
