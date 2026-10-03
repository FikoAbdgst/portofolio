import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/src/site.config"
import { projects } from "@/src/projects"
import { JsonLd } from "@/src/components/json-ld"

export const metadata: Metadata = {
  title: "Proyek",
  description: `Kumpulan proyek ${siteConfig.name} — ${siteConfig.jobTitle}. Berisi project web, aplikasi, dan open source.`,
  alternates: { canonical: `${siteConfig.url}/projects/` },
  openGraph: {
    title: `Proyek | ${siteConfig.name}`,
    description: `Kumpulan proyek ${siteConfig.name}.`,
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
      <section className="flex max-w-3xl flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <p className="readout">
            <span className="lbl">db</span>
            {"// PROJECT.REGISTRY"}
          </p>
          <h1>Proyek</h1>
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            Kumpulan karya yang pernah saya kerjakan. Klik untuk melihat detail,
            teknologi, dan hasilnya.
          </p>
        </div>
        <span className="chip">
          {projects.length} proyek
        </span>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-2" aria-label="Daftar proyek">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}/`}
            className="card group block no-underline"
          >
            <Image
              src={project.image}
              alt={project.alt}
              width={400}
              height={225}
              loading="lazy"
              className="h-44 w-full rounded-xl border object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ borderColor: "var(--border)" }}
            />
            <div className="mt-5 flex items-baseline justify-between gap-3">
              <h2 className="text-xl font-semibold text-[var(--text-h)]">
                {project.title}
              </h2>
              <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.1em] text-[var(--text-muted)]">
                {project.year}
              </span>
            </div>
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </>
  )
}