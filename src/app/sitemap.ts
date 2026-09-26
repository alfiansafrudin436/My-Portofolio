import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getProjectsForSitemap } from "@/lib/queries/static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjectsForSitemap();

  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/projects`, changeFrequency: "weekly", priority: 0.8 },
    ...projects.map((project) => ({
      url: `${SITE.url}/projects/${project.slug}`,
      lastModified: new Date(project.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
