import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { siteConfig } from "@/src/site.config"
import { projects, getProject } from "@/src/projects"
import { JsonLd } from "@/src/components/json-ld"
import { ProjectDetail } from "@/src/components/project-detail"

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
      <ProjectDetail project={project} />
    </>
  )
}
