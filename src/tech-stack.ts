import type { IconType } from "react-icons"
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiTypescript,
  SiTailwindcss,
  SiInertia,
  SiVite,
  SiLaravel,
  SiPhp,
  SiNodedotjs,
  SiExpress,
  SiSpringboot,
  SiMysql,
  SiPostgresql,
  SiPython,
  SiOpenjdk,
  SiKotlin,
  SiDocker,
  SiBun,
} from "react-icons/si"

export type TechItem = {
  name: string
  icon: IconType
  /** Brand color; defaults to #E8EEF8 (for black/white brand marks). */
  color?: string
}

/** Row 1 — frontend and core. */
export const techRow1: TechItem[] = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Inertia.js", icon: SiInertia, color: "#9553E9" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
]

/** Row 2 — backend, database, tools. */
export const techRow2: TechItem[] = [
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express.js", icon: SiExpress },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Java", icon: SiOpenjdk, color: "#ED8B00" },
  { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Bun", icon: SiBun },
]
