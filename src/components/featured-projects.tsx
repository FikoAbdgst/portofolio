"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { projects } from "@/src/projects"
import { Tagline } from "@/src/components/ui/Tagline"
import { ProjectCard } from "@/src/components/project-card"
import { useRevealGroup } from "@/src/components/use-reveal-group"

export function FeaturedProjects() {
  const ref = useRevealGroup<HTMLElement>()
  const featured = projects.filter((project) => project.featured)

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mt-16 scroll-mt-28"
      ref={ref}
    >
      <div
        data-reveal
        className="proj-reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <Tagline className="about-label">Selected Projects</Tagline>
          <h2
            id="projects-heading"
            className="mt-4 font-[family-name:var(--font-display)] text-[clamp(44px,6vw,84px)] leading-[1.05] font-semibold text-[#E8EEF8]"
          >
            Featured Projects
          </h2>
        </div>
        <p
          data-reveal
          className="proj-reveal max-w-sm font-[family-name:var(--font-sans)] text-base leading-relaxed text-[#9AA9C4] md:pb-2 md:text-right"
          style={{ transitionDelay: "80ms" }}
        >
          A curated selection of projects I&apos;ve designed and built.
        </p>
      </div>

      <ul className="mt-12 grid gap-8 md:grid-cols-2">
        {featured.map((project, index) => (
          <li
            key={project.slug}
            data-reveal
            className="proj-reveal"
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <ProjectCard project={project} priority={index < 2} />
          </li>
        ))}
      </ul>

      <div data-reveal className="proj-reveal mt-12 text-center">
        <Link
          href="/projects"
          data-cursor-hover
          className="about-linkedin"
          style={{ marginTop: 0 }}
        >
          View all projects
          <ArrowRight aria-hidden="true" size={20} strokeWidth={2} />
        </Link>
      </div>
    </section>
  )
}
