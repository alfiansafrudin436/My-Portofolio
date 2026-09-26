import { z } from "zod";
import { sortOrder } from "@/lib/validations/shared";

export const socialLinkSchema = z.object({
  label: z.string().trim().min(1, "Label is required").max(60),
  // Matches the social_links_url_format check in migration 0002.
  url: z
    .string()
    .trim()
    .min(1, "URL is required")
    .regex(
      /^(https?:\/\/|mailto:|tel:)/i,
      "Must start with http://, https://, mailto: or tel:",
    ),
  icon: z.string().trim().min(1, "Icon is required").max(40).default("link"),
  is_visible: z.boolean().default(true),
  sort_order: sortOrder,
});

export type SocialLinkInput = z.input<typeof socialLinkSchema>;
export type SocialLinkValues = z.output<typeof socialLinkSchema>;
