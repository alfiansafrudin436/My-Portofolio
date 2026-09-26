# Supabase setup

## 1. Create the project

Create a project at [supabase.com](https://supabase.com). Pick the **Singapore**
region to match `vercel.json` (`sin1`).

## 2. Run the migrations

Paste the files in `migrations/` into the SQL editor **in numeric order**, or
push them with the CLI:

```bash
pnpm dlx supabase link --project-ref <your-ref>
pnpm dlx supabase db push
```

| File | What it does |
|---|---|
| `0001_extensions_and_helpers.sql` | `pgcrypto`, the `set_updated_at` trigger, `is_admin()`, the three enums |
| `0002_profile_and_social_links.sql` | `profile` (singleton) and `social_links` |
| `0003_projects.sql` | `projects` |
| `0004_skills.sql` | `skills` |
| `0005_experience_and_education.sql` | `experiences` and `education` |
| `0006_rls.sql` | Row level security on all six tables |
| `0007_storage.sql` | The `portfolio` bucket and its policies |
| `0008_seed.sql` | Starter profile, social links and skills (idempotent) |

## 3. Create the admin account

Dashboard → **Authentication → Users → Add user**. Use a real email, set a
password, and tick *Auto Confirm User*.

Then **disable public sign-ups**: Authentication → Sign In / Providers → Email
→ turn off *Allow new users to sign up*.

This step is what actually enforces "one admin". RLS grants write access to any
authenticated user, so without it anyone could register and then edit the site.

## 4. Fill in the environment

Copy `.env.example` to `.env.local` and paste the values from
**Project Settings → API**:

```
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The service-role key is deliberately not used anywhere in `src/`. Do not add it.

## 5. Regenerate the types

`src/types/database.ts` is hand-written to match these migrations. Once the
project exists, regenerate it so the two can never drift:

```bash
pnpm dlx supabase gen types typescript --project-id <ref> --schema public \
  > src/types/database.ts
```

## Verifying RLS

In a logged-out browser console, with the anon key, every one of these must
fail or come back filtered:

```js
const { createClient } = await import("https://esm.sh/@supabase/supabase-js");
const s = createClient("<URL>", "<ANON_KEY>");

await s.from("projects").insert({ title: "hack", slug: "hack" });        // RLS error
await s.from("projects").delete().neq("id", crypto.randomUUID());        // 0 rows
await s.from("projects").select("*");                                    // published only
await s.storage.from("portfolio").upload("x.png", new Blob());           // denied
await s.auth.signUp({ email: "a@b.com", password: "xxxxxxxx" });         // denied
```

If any succeeds, a policy is missing or `enable row level security` was skipped
on that table.
