import { z } from "zod";
import {
  isoDate,
  optionalIsoDate,
  optionalText,
  optionalUrl,
  sortOrder,
} from "@/lib/validations/shared";

export const educationSchema = z
  .object({
    institution: z.string().trim().min(1, "Institution is required").max(160),
    institution_url: optionalUrl,
    degree: z.string().trim().min(1, "Degree is required").max(120),
    field_of_study: optionalText,
    location: optionalText,
    grade: optionalText,
    description: optionalText,
    start_date: isoDate,
    end_date: optionalIsoDate,
    is_current: z.boolean().default(false),
    is_visible: z.boolean().default(true),
    sort_order: sortOrder,
  })
  .refine((v) => !v.is_current || v.end_date === null, {
    message: "An ongoing study cannot have an end date",
    path: ["end_date"],
  })
  .refine((v) => !v.end_date || v.end_date >= v.start_date, {
    message: "End date must be on or after the start date",
    path: ["end_date"],
  });

export type EducationInput = z.input<typeof educationSchema>;
export type EducationValues = z.output<typeof educationSchema>;
