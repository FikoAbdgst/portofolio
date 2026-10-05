"use client"

import { useEffect, useRef, useState } from "react"
import {
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from "@/src/projects"
import { ProjectCard } from "@/src/components/project-card"

type Filter = "All" | ProjectCategory

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const skippedFirstFilterRun = useRef(false)
  const [filter, setFilter] = useState<Filter>("All")

  const categories = PROJECT_CATEGORIES.filter((category) =>
    projects.some((project) => project.category === category),
  )
  const visible =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter)

  // Reveal-on-scroll sekali jalan untuk kartu yang tampil pertama kali.
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = Array.from(
      root.querySelectorAll<HTMLElement>(".proj-reveal"),
    )
    if (targets.length === 0) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((el) => el.classList.add("is-in"))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        targets.forEach((el) => el.classList.add("is-in"))
        io.disconnect()
      },
      { threshold: 0.08 },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  // Saat filter berubah, animasikan kartu hasil filter (lewati render pertama).
  useEffect(() => {
    if (!skippedFirstFilterRun.current) {
      skippedFirstFilterRun.current = true
      return
    }
    ref.current
      ?.querySelectorAll<HTMLElement>(".proj-reveal")
      .forEach((el) => el.classList.add("is-in"))
  }, [filter])

  return (
    <div ref={ref}>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by category"
      >
        {(["All", ...categories] as Filter[]).map((category) => {
          const isActive = filter === category
          return (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={isActive}
              data-cursor-hover
              className={`rounded-full border px-5 py-2 font-[family-name:var(--font-sans)] text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "border-white bg-white text-[#0a1128]"
                  : "border-white/15 bg-transparent text-[#9aa9c4] hover:border-white/40 hover:text-white"
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 font-[family-name:var(--font-sans)] text-base text-[#9aa9c4]">
          Belum ada project pada kategori ini.
        </p>
      ) : (
        <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <li
              key={project.slug}
              data-reveal
              className="proj-reveal"
              style={{ transitionDelay: `${(index % 3) * 80}ms` }}
            >
              <ProjectCard project={project} priority={index < 3} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
