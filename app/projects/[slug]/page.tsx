import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { siteConfig } from "@/src/site.config"
import { projects, getProject } from "@/src/projects"
import { JsonLd } from "@/src/components/json-ld"

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  const title = project.title
  const description = project.description
  const url = `${siteConfig.url}/projects/${project.slug}/`

  return {
    title,
    description,
    keywords: [...project.tags, siteConfig.name],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: [{ url: project.image, alt: project.alt }],
      publishedTime: `${project.year}-01-01`,
    },
  }
}

export const dynamicParams = false

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const url = `${siteConfig.url}/projects/${project.slug}/`
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Proyek", item: `${siteConfig.url}/projects/` },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <article className="max-w-3xl space-y-8">
        <header className="space-y-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-2 text-sm">
              <li>
                <Link href="/" className="no-underline">Beranda</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/projects/" className="no-underline">Proyek</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" style={{ color: "var(--text-h)" }}>
                {project.title}
              </li>
            </ol>
          </nav>
          <h1>{project.title}</h1>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <Image
          src={project.image}
          alt={project.alt}
          width={400}
          height={225}
          className="w-full rounded-2xl border object-cover"
          style={{ borderColor: "var(--border)" }}
        />

        <div className="space-y-4">
          <h2>Tentang Proyek</h2>
          <p>{project.longDescription}</p>
        </div>

        <section aria-labelledby="highlights-heading" className="space-y-4">
          <p className="readout">
            <span className="lbl">data</span>
            {"// MISSION.SUMMARY"}
          </p>
          <h2 id="highlights-heading">Pencapaian</h2>
          <ul className="space-y-2">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" style={{ color: "var(--accent)" }}>
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-6 py-3"
          >
            Demo Live
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost px-6 py-3"
          >
            Kode Sumber
          </a>
        </div>
      </article>
    </>
  )
}