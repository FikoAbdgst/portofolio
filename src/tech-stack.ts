import type { IconType } from "react-icons"
import { FaCode } from "react-icons/fa"
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiTypescript,
  SiTailwindcss,
  SiInertia,
  SiVite,
  SiPinia,
  SiAxios,
  SiLaravel,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiOpenjdk,
  SiPython,
} from "react-icons/si"

export type TechItem = {
  name: string
  icon: IconType
  /** Brand color; defaults to #E8EEF8 (for black/white brand marks). */
  color?: string
}

/**
 * Sumber data: portfolio-data.md bagian 5.2 (teknologi yang disebut di
 * deskripsi pengalaman dan proyek). Blade tidak punya ikon brand di
 * simple-icons, jadi memakai ikon kode netral.
 */

/** Row 1 — frontend. */
export const techRow1: TechItem[] = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Inertia.js", icon: SiInertia, color: "#9553E9" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
  { name: "Pinia", icon: SiPinia, color: "#FFD859" },
  { name: "Axios", icon: SiAxios, color: "#5A29E4" },
  { name: "Blade", icon: FaCode, color: "#FF2D20" },
]

/** Row 2 — backend, database, lainnya. */
export const techRow2: TechItem[] = [
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express.js", icon: SiExpress },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Java", icon: SiOpenjdk, color: "#ED8B00" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
]
