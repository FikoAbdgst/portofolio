import type { LucideIcon } from "lucide-react"
import { Laptop, Map, Palette, Search } from "lucide-react"

export type ProcessStep = {
  slug: string
  number: string
  title: string
  description: string
  icon: LucideIcon
}

export const processSteps: ProcessStep[] = [
  {
    slug: "discovery",
    number: "01",
    title: "Discovery",
    description:
      "Memahami masalah inti dan tujuan bisnis lewat riset dan diskusi dengan klien.",
    icon: Search,
  },
  {
    slug: "strategy",
    number: "02",
    title: "Strategy",
    description:
      "Merencanakan arsitektur, alur pengguna, dan tech stack agar mudah dikembangkan dan di-scale.",
    icon: Map,
  },
  {
    slug: "design",
    number: "03",
    title: "Design",
    description:
      "Membuat wireframe dan prototipe interaktif beresolusi tinggi.",
    icon: Palette,
  },
  {
    slug: "development",
    number: "04",
    title: "Development",
    description:
      "Menulis kode bersih dan efisien, serta mengintegrasikan API.",
    icon: Laptop,
  },
]
