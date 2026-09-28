import type { EmploymentType, Proficiency, SkillCategory } from "@/types/models";

export const SITE = {
  name: "Alfian Safrudin",
  shortName: "Alfian",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/** Section anchors on the home page, in document order. */
export const NAV_LINKS = [
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#work", id: "work", label: "Projects" },
  { href: "/#capabilities", id: "capabilities", label: "Skills" },
  { href: "/#about", id: "about", label: "About" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const;

export const MASTER_DATA_NAV = [
  { href: "/master-data", label: "Dashboard", exact: true },
  { href: "/master-data/projects", label: "Projects", exact: false },
  { href: "/master-data/skills", label: "Skills", exact: false },
  { href: "/master-data/experience", label: "Experience", exact: false },
  { href: "/master-data/education", label: "Education", exact: false },
  { href: "/master-data/social-links", label: "Social Links", exact: false },
  { href: "/master-data/profile", label: "Profile", exact: false },
] as const;

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  language: "Languages",
  framework: "Frameworks",
  library: "Libraries",
  database: "Databases",
  tool: "Tools",
  platform: "Platforms",
  design: "Design",
  other: "Other",
};

/** Display order of the capability columns. */
export const SKILL_CATEGORY_ORDER: SkillCategory[] = [
  "language",
  "framework",
  "library",
  "database",
  "platform",
  "tool",
  "design",
  "other",
];

export const PROFICIENCY_LABELS: Record<Proficiency, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  freelance: "Freelance",
  internship: "Internship",
};

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/avif",
  "image/svg+xml",
] as const;
