import { z } from "zod";
import {
  optionalText,
  optionalUrl,
  sortOrder,
  tagList,
} from "@/lib/validations/shared";

export const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(120)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase words separated by dashes"),
  summary: optionalText,
  description: optionalText,
  cover_url: optionalUrl,
  gallery_urls: z.array(z.url()).default([]),
  tech_stack: tagList,
  role: optionalText,
  company: optionalText,
  year: z
    .union([z.literal(""), z.coerce.number().int().min(1990).max(2100)])
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .default(null),
  github_url: optionalUrl,
  live_url: optionalUrl,
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(false),
  sort_order: sortOrder,
});

export type ProjectInput = z.input<typeof projectSchema>;
export type ProjectValues = z.output<typeof projectSchema>;
