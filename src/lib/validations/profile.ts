import { z } from "zod";
import {
  optionalEmail,
  optionalText,
  optionalUrl,
} from "@/lib/validations/shared";

export const profileSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(120),
  headline: z.string().trim().min(1, "Headline is required").max(120),
  tagline: optionalText,
  bio: optionalText,
  avatar_url: optionalUrl,
  resume_url: optionalUrl,
  email: optionalEmail,
  phone: optionalText,
  location: optionalText,
  available: z.boolean().default(true),
  available_note: optionalText,
  seo_title: optionalText,
  seo_description: optionalText,
});

export type ProfileInput = z.input<typeof profileSchema>;
export type ProfileValues = z.output<typeof profileSchema>;
