"use client"

import Image from "next/image"
import Link from "next/link"
import type { Project } from "@/src/projects"
import { projectTextEn, useLang } from "@/src/i18n"

/** Isi halaman detail proyek yang mengikuti bahasa aktif. */
export function ProjectDetail({ project }: { project: Project }) {
  const { lang, t } = useLang()
  const text =
    lang === "en" ? (projectTextEn[project.slug] ?? null) : null
  const description = text?.description ?? project.description
  const longDescription = text?.longDescription ?? project.longDescription
  const highlights = text?.highlights ?? project.highlights

  return (
    <article className="max-w-3xl space-y-8">
      <header className="space-y-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2 text-sm">
            <li>
              <Link href="/" className="no-underline">
                {t.projects.crumbHome}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/projects/" className="no-underline">
                {t.projects.crumbProjects}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" style={{ color: "var(--text-h)" }}>
              {project.title}
            </li>
          </ol>
        </nav>
        <h1>{project.title}</h1>
        <p style={{ color: "var(--text-muted)" }}>{description}</p>
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
        <h2>{t.projects.aboutProject}</h2>
        <p>{longDescription}</p>
      </div>

      <section aria-labelledby="highlights-heading" className="space-y-4">
        <p className="readout">
          <span className="lbl">data</span>
          {"// MISSION.SUMMARY"}
        </p>
        <h2 id="highlights-heading">{t.projects.highlights}</h2>
        <ul className="space-y-2">
          {highlights.map((item) => (
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
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-6 py-3"
          >
            {t.projects.liveDemo}
          </a>
        ) : null}
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost px-6 py-3"
          >
            {t.projects.sourceCode}
          </a>
        ) : null}
      </div>
    </article>
  )
}
