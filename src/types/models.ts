import type { Database } from "@/types/database";

type Tables = Database["public"]["Tables"];

export type Profile = Tables["profile"]["Row"];
export type SocialLink = Tables["social_links"]["Row"];
export type Project = Tables["projects"]["Row"];
export type Skill = Tables["skills"]["Row"];
export type Experience = Tables["experiences"]["Row"];
export type Education = Tables["education"]["Row"];

export type {
  SkillCategory,
  EmploymentType,
  Proficiency,
} from "@/types/database";

/** A group of skills sharing a category, as rendered by the capabilities grid. */
export type SkillGroup = {
  category: Database["public"]["Enums"]["skill_category"];
  label: string;
  skills: Skill[];
};

/**
 * Experience and education render through the same timeline component, so
 * both are narrowed to this shape first.
 */
export type TimelineItem = {
  id: string;
  title: string;
  subtitle: string;
  subtitleUrl: string | null;
  meta: string | null;
  description: string | null;
  bullets: string[];
  tags: string[];
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
};
