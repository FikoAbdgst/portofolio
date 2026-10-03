export type Project = {
  slug: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  image: string
  alt: string
  url: string
  github: string
  year: number
  featured?: boolean
  highlights: string[]
}

export const projects: Project[] = [
  {
    slug: "project-satu",
    title: "Project Satu",
    description:
      "Ringkasan singkat project pertama — masalah yang diselesaikan dan dampaknya.",
    longDescription:
      "Paragraf panjang yang menjelaskan latar belakang project, masalah yang dihadapi, teknologi yang dipakai, dan hasil akhirnya. Tulis juga tantangan teknis menarik yang berhasil kamu selesaikan.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    image: "/img/hero.png",
    alt: "Preview Project Satu",
    url: "https://example.com",
    github: "https://github.com/",
    year: 2026,
    featured: true,
    highlights: [
      "Hasil / pencapaian utama pertama",
      "Hasil / pencapaian utama kedua",
      "Hasil / pencapaian utama ketiga",
    ],
  },
  {
    slug: "project-dua",
    title: "Project Dua",
    description:
      "Ringkasan singkat project kedua — audiens target dan fitur utamanya.",
    longDescription:
      "Paragraf panjang yang menjelaskan latar belakang project, masalah yang dihadapi, teknologi yang dipakai, dan hasil akhirnya.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    image: "/img/hero.png",
    alt: "Preview Project Dua",
    url: "https://example.com",
    github: "https://github.com/",
    year: 2025,
    featured: true,
    highlights: [
      "Hasil / pencapaian utama pertama",
      "Hasil / pencapaian utama kedua",
    ],
  },
  {
    slug: "project-tiga",
    title: "Project Tiga",
    description:
      "Ringkasan singkat project ketiga — tools atau library yang dipakai.",
    longDescription:
      "Paragraf panjang yang menjelaskan latar belakang project, masalah yang dihadapi, teknologi yang dipakai, dan hasil akhirnya.",
    tags: ["Vite", "React", "CSS"],
    image: "/img/hero.png",
    alt: "Preview Project Tiga",
    url: "https://example.com",
    github: "https://github.com/",
    year: 2024,
    highlights: [
      "Hasil / pencapaian utama pertama",
      "Hasil / pencapaian utama kedua",
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}