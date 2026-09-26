import { z } from "zod";
import { optionalText, sortOrder } from "@/lib/validations/shared";

export const skillCategoryEnum = z.enum([
  "language",
  "framework",
  "library",
  "database",
  "tool",
  "platform",
  "design",
  "other",
]);

export const proficiencyEnum = z.enum([
  "beginner",
  "intermediate",
  "advanced",
  "expert",
]);

export const skillSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  category: skillCategoryEnum.default("other"),
  level: z
    .union([z.literal(""), proficiencyEnum])
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .default(null),
  icon: optionalText,
  years: z
    .union([z.literal(""), z.coerce.number().min(0).max(60)])
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .default(null),
  is_featured: z.boolean().default(false),
  is_visible: z.boolean().default(true),
  sort_order: sortOrder,
});

export type SkillInput = z.input<typeof skillSchema>;
export type SkillValues = z.output<typeof skillSchema>;
