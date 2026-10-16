import type { Metadata } from "next"
import { siteConfig } from "@/src/site.config"
import { projects } from "@/src/projects"
import { JsonLd } from "@/src/components/json-ld"
import { ProjectsHeader } from "@/src/components/projects-header"

export const metadata: Metadata = {
  title: `All Projects | ${siteConfig.name}`,
  description: `Koleksi lengkap project ${siteConfig.name} — ${siteConfig.jobTitle}. Frontend, fullstack, mobile, dan UI/UX.`,
  alternates: { canonical: `${siteConfig.url}/projects/` },
  openGraph: {
    title: `All Projects | ${siteConfig.name}`,
    description: `Koleksi lengkap project ${siteConfig.name}.`,
    url: `${siteConfig.url}/projects/`,
  },
}

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Proyek ${siteConfig.name}`,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: p.description,
        url: `${siteConfig.url}/projects/${p.slug}/`,
      },
    })),
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProjectsHeader />
    </>
  )
}
