import { z } from "zod";
import {
  isoDate,
  optionalIsoDate,
  optionalText,
  optionalUrl,
  sortOrder,
  tagList,
} from "@/lib/validations/shared";

export const employmentTypeEnum = z.enum([
  "full_time",
  "part_time",
  "contract",
  "freelance",
  "internship",
]);

export const experienceSchema = z
  .object({
    company: z.string().trim().min(1, "Company is required").max(120),
    company_url: optionalUrl,
    position: z.string().trim().min(1, "Position is required").max(120),
    employment_type: employmentTypeEnum.default("full_time"),
    location: optionalText,
    description: optionalText,
    highlights: tagList,
    tech_stack: tagList,
    start_date: isoDate,
    end_date: optionalIsoDate,
    is_current: z.boolean().default(false),
    is_visible: z.boolean().default(true),
    sort_order: sortOrder,
  })
  // Mirrors the experiences_current_null_end and experiences_date_order
  // constraints, so the user sees a field error instead of a Postgres error.
  .refine((v) => !v.is_current || v.end_date === null, {
    message: "A current role cannot have an end date",
    path: ["end_date"],
  })
  .refine((v) => !v.end_date || v.end_date >= v.start_date, {
    message: "End date must be on or after the start date",
    path: ["end_date"],
  });

export type ExperienceInput = z.input<typeof experienceSchema>;
export type ExperienceValues = z.output<typeof experienceSchema>;
