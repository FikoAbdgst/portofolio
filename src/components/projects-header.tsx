"use client"

import Link from "next/link"
import { projects } from "@/src/projects"
import { useLang } from "@/src/i18n"
import { Tagline } from "@/src/components/ui/Tagline"
import { ProjectsGrid } from "@/src/components/projects-grid"

/** Header + grid halaman /projects yang mengikuti bahasa aktif. */
export function ProjectsHeader() {
  const { t } = useLang()

  return (
    <>
      <Link
        href="/"
        className="inline-block font-[family-name:var(--font-sans)] text-sm font-medium text-[#9aa9c4] no-underline transition-colors hover:text-white"
      >
        {t.projects.backHome}
      </Link>

      <div className="mt-6">
        <Tagline className="about-label">{t.projects.pageTagline}</Tagline>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(44px,6vw,84px)] leading-[1.05] font-semibold text-[#E8EEF8]">
          {t.projects.pageTitle}
        </h1>
        <p className="mt-4 max-w-2xl font-[family-name:var(--font-sans)] text-lg leading-relaxed text-[#9aa9c4]">
          {t.projects.pageDesc}
        </p>
      </div>

      <section className="mt-10" aria-label={t.projects.listLabel}>
        <ProjectsGrid projects={projects} />
      </section>
    </>
  )
}
