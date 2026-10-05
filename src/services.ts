import type { LucideIcon } from "lucide-react"
import { Code2, Database, Gauge, LayoutTemplate } from "lucide-react"

export type Service = {
  slug: string
  title: string
  description: string
  icon: LucideIcon
}

export const services: Service[] = [
  {
    slug: "frontend-development",
    title: "Frontend Development",
    description:
      "Membangun antarmuka web yang cepat, responsif, dan aksesibel dengan React, Next.js, Vue.js, TypeScript, dan Tailwind CSS.",
    icon: Code2,
  },
  {
    slug: "ui-implementation",
    title: "UI Implementation",
    description:
      "Menerjemahkan desain menjadi tampilan yang rapi, pixel-perfect, dan responsif di semua ukuran layar.",
    icon: LayoutTemplate,
  },
  {
    slug: "fullstack-integration",
    title: "Full-Stack Integration",
    description:
      "Menghubungkan frontend dengan backend dan database lewat API menggunakan Laravel (Inertia.js), Node.js, dan MySQL.",
    icon: Database,
  },
  {
    slug: "performance-seo",
    title: "Performance & SEO",
    description:
      "Optimasi performa (hingga ±40%), Static Site Generation, dan SEO agar website cepat dimuat dan mudah ditemukan.",
    icon: Gauge,
  },
]
