/**
 * Mirrors supabase/migrations/0001–0005. Hand-written so the app is typed
 * before the Supabase project exists; regenerate once it does:
 *
 *   pnpm dlx supabase gen types typescript \
 *     --project-id <ref> --schema public > src/types/database.ts
 */

export type SkillCategory =
  | "language"
  | "framework"
  | "library"
  | "database"
  | "tool"
  | "platform"
  | "design"
  | "other";

export type EmploymentType =
  | "full_time"
  | "part_time"
  | "contract"
  | "freelance"
  | "internship";

export type Proficiency = "beginner" | "intermediate" | "advanced" | "expert";

type Timestamps = {
  created_at: string;
  updated_at: string;
};

type ProfileRow = Timestamps & {
  id: string;
  is_singleton: boolean;
  full_name: string;
  headline: string;
  tagline: string | null;
  bio: string | null;
  avatar_url: string | null;
  resume_url: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  available: boolean;
  available_note: string | null;
  seo_title: string | null;
  seo_description: string | null;
};

type SocialLinkRow = Timestamps & {
  id: string;
  label: string;
  url: string;
  icon: string;
  is_visible: boolean;
  sort_order: number;
};

type ProjectRow = Timestamps & {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  description: string | null;
  cover_url: string | null;
  gallery_urls: string[];
  tech_stack: string[];
  role: string | null;
  company: string | null;
  year: number | null;
  github_url: string | null;
  live_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
};

type SkillRow = Timestamps & {
  id: string;
  name: string;
  category: SkillCategory;
  level: Proficiency | null;
  icon: string | null;
  years: number | null;
  is_featured: boolean;
  is_visible: boolean;
  sort_order: number;
};

type ExperienceRow = Timestamps & {
  id: string;
  company: string;
  company_url: string | null;
  position: string;
  employment_type: EmploymentType;
  location: string | null;
  description: string | null;
  highlights: string[];
  tech_stack: string[];
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  is_visible: boolean;
  sort_order: number;
};

type EducationRow = Timestamps & {
  id: string;
  institution: string;
  institution_url: string | null;
  degree: string;
  field_of_study: string | null;
  location: string | null;
  grade: string | null;
  description: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  is_visible: boolean;
  sort_order: number;
};

/** Columns the database fills in for us, so they are optional on insert. */
type Generated = "id" | "created_at" | "updated_at";

/** Columns with a SQL default, optional on insert. */
type TableDef<Row, Defaulted extends keyof Row> = {
  Row: Row;
  Insert: Omit<Row, Generated | Defaulted> &
    Partial<Pick<Row, Extract<Generated | Defaulted, keyof Row>>>;
  Update: Partial<Omit<Row, Generated>>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      profile: TableDef<
        ProfileRow,
        "is_singleton" | "available" | "available_note"
      >;
      social_links: TableDef<SocialLinkRow, "icon" | "is_visible" | "sort_order">;
      projects: TableDef<
        ProjectRow,
        | "gallery_urls"
        | "tech_stack"
        | "is_featured"
        | "is_published"
        | "sort_order"
      >;
      skills: TableDef<
        SkillRow,
        "category" | "is_featured" | "is_visible" | "sort_order"
      >;
      experiences: TableDef<
        ExperienceRow,
        | "employment_type"
        | "highlights"
        | "tech_stack"
        | "is_current"
        | "is_visible"
        | "sort_order"
      >;
      education: TableDef<
        EducationRow,
        "is_current" | "is_visible" | "sort_order"
      >;
    };
    Views: Record<never, never>;
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      skill_category: SkillCategory;
      employment_type: EmploymentType;
      proficiency: Proficiency;
    };
    CompositeTypes: Record<never, never>;
  };
};
