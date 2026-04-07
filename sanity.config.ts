/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schema";

export default defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "yoursanityid",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  title: "Portfolio Content Studio",
  schema,
  plugins: [structureTool()],
});
