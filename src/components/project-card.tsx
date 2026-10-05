import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/src/projects"

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project
  priority?: boolean
}) {
  return (
    <Link
      href={`/projects/${project.slug}/`}
      aria-label={`View ${project.title}`}
      data-cursor-hover
      className="group block rounded-[28px] no-underline outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a1128]"
    >
      <span className="relative block aspect-[16/10] overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1730]">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span
          aria-hidden="true"
          className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-md:opacity-100"
        >
          <ArrowUpRight size={20} strokeWidth={2} />
        </span>
      </span>

      <span className="mt-5 flex items-baseline justify-between gap-3">
        <span className="text-xl font-medium text-white transition-colors duration-300 group-hover:text-accent-gold">
          {project.title}
        </span>
        <span className="chip shrink-0">{project.year}</span>
      </span>
      <span className="mt-1 block text-xs font-medium tracking-[0.18em] text-[#7c8db0] uppercase">
        {project.role}
      </span>
      <span aria-hidden="true" className="mt-4 block h-px bg-white/10" />
    </Link>
  )
}
