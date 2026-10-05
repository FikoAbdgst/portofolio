export type ProjectCategory = "Frontend" | "Fullstack" | "Mobile" | "UI/UX"

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
  role: string
  category: ProjectCategory
  /** Live demo or repo URL (external). */
  href: string
  featured?: boolean
  highlights: string[]
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Frontend",
  "Fullstack",
  "Mobile",
  "UI/UX",
]

export const projects: Project[] = [
  {
    slug: "project-satu",
    title: "Project Satu",
    description:
      "Ringkasan singkat project pertama — masalah yang diselesaikan dan dampaknya.",
    longDescription:
      "Paragraf panjang yang menjelaskan latar belakang project, masalah yang dihadapi, teknologi yang dipakai, dan hasil akhirnya. Tulis juga tantangan teknis menarik yang berhasil kamu selesaikan.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    image: "/projects/project-satu.svg",
    alt: "Preview Project Satu",
    url: "https://example.com",
    github: "https://github.com/",
    year: 2026,
    role: "Frontend Developer",
    category: "Frontend",
    href: "https://example.com",
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
    image: "/projects/project-dua.svg",
    alt: "Preview Project Dua",
    url: "https://example.com",
    github: "https://github.com/",
    year: 2025,
    role: "Fullstack Developer",
    category: "Fullstack",
    href: "https://example.com",
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
    image: "/projects/project-tiga.svg",
    alt: "Preview Project Tiga",
    url: "https://example.com",
    github: "https://github.com/",
    year: 2024,
    role: "Frontend Developer",
    category: "Frontend",
    href: "https://example.com",
    highlights: [
      "Hasil / pencapaian utama pertama",
      "Hasil / pencapaian utama kedua",
    ],
  },
  // TODO: replace — entry placeholder, isi dengan project asli (judul, gambar, link).
  {
    slug: "project-empat",
    title: "Project Empat",
    description:
      "Ringkasan singkat project keempat — ganti dengan deskripsi asli project kamu.",
    longDescription:
      "Ganti dengan studi kasus project: latar belakang, proses pengerjaan, dan hasilnya.",
    tags: ["React Native", "TypeScript"],
    image: "/projects/project-empat.svg",
    alt: "Preview Project Empat",
    url: "https://example.com",
    github: "https://github.com/",
    year: 2025,
    role: "Mobile Developer",
    category: "Mobile",
    href: "https://example.com",
    featured: true,
    highlights: [
      "Hasil / pencapaian utama pertama",
      "Hasil / pencapaian utama kedua",
    ],
  },
  // TODO: replace — entry placeholder, isi dengan project asli (judul, gambar, link).
  {
    slug: "project-lima",
    title: "Project Lima",
    description:
      "Ringkasan singkat project kelima — ganti dengan deskripsi asli project kamu.",
    longDescription:
      "Ganti dengan studi kasus project: riset, wireframe, dan hasil pengujian usability.",
    tags: ["Figma", "Design System"],
    image: "/projects/project-lima.svg",
    alt: "Preview Project Lima",
    url: "https://example.com",
    github: "https://github.com/",
    year: 2024,
    role: "UI/UX Designer",
    category: "UI/UX",
    href: "https://example.com",
    featured: true,
    highlights: [
      "Hasil / pencapaian utama pertama",
      "Hasil / pencapaian utama kedua",
    ],
  },
  // TODO: replace — entry placeholder, isi dengan project asli (judul, gambar, link).
  {
    slug: "project-enam",
    title: "Project Enam",
    description:
      "Ringkasan singkat project keenam — ganti dengan deskripsi asli project kamu.",
    longDescription:
      "Ganti dengan studi kasus project: arsitektur, tantangan, dan hasilnya.",
    tags: ["Laravel", "Vue.js", "MySQL"],
    image: "/projects/project-enam.svg",
    alt: "Preview Project Enam",
    url: "https://example.com",
    github: "https://github.com/",
    year: 2023,
    role: "Fullstack Developer",
    category: "Fullstack",
    href: "https://example.com",
    highlights: [
      "Hasil / pencapaian utama pertama",
      "Hasil / pencapaian utama kedua",
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
