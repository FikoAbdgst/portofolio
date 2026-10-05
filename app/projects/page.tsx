import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/src/site.config"
import { projects } from "@/src/projects"
import { JsonLd } from "@/src/components/json-ld"
import { Tagline } from "@/src/components/ui/Tagline"
import { ProjectsGrid } from "@/src/components/projects-grid"

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
      <Link
        href="/"
        className="inline-block font-[family-name:var(--font-sans)] text-sm font-medium text-[#9aa9c4] no-underline transition-colors hover:text-white"
      >
        ← Back to home
      </Link>

      <div className="mt-6">
        <Tagline className="about-label">All Projects</Tagline>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(44px,6vw,84px)] leading-[1.05] font-semibold text-[#E8EEF8]">
          All Projects
        </h1>
        <p className="mt-4 max-w-2xl font-[family-name:var(--font-sans)] text-lg leading-relaxed text-[#9aa9c4]">
          Koleksi lengkap karya yang pernah saya kerjakan — dari antarmuka
          frontend hingga aplikasi fullstack. Klik untuk melihat detail,
          teknologi, dan hasilnya.
        </p>
      </div>

      <section className="mt-10" aria-label="Daftar proyek">
        <ProjectsGrid projects={projects} />
      </section>
    </>
  )
}
