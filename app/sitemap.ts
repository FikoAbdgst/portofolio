import type { MetadataRoute } from "next"
import { siteConfig } from "@/src/site.config"
import { projects } from "@/src/projects"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/about/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/projects/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}/`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes]
}