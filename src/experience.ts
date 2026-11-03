export type ExperienceItem = {
  slug: string
  role: string
  company: string
  period: string
  location: string
  current?: boolean
  logo?: string
  bullets: string[]
}

export const experience: ExperienceItem[] = [
  {
    slug: "freelance",
    role: "Fullstack Web Developer",
    company: "Freelance",
    period: "Aug 2024 - Present",
    location: "Cimahi, Indonesia",
    current: true,
    bullets: [
      "Membangun aplikasi web untuk klien—dari tugas akademik hingga situs perusahaan kecil-menengah.",
      "Merancang antarmuka React, Laravel, dan Tailwind: UI/UX, database, hingga deployment.",
      "Meningkatkan performa situs hingga ±40% lewat struktur kode dan desain responsif.",
      "Mendampingi klien dari analisis kebutuhan sampai rilis tepat waktu.",
    ],
  },
  {
    slug: "csa",
    role: "Frontend Developer",
    company: "CSA (UKM Kampus STMIK Mardira Indonesia)",
    period: "Oct 2025 - Dec 2025",
    location: "Bandung, Indonesia",
    bullets: [
      "Membangun antarmuka e-rapor SMK untuk program pengabdian masyarakat (CSA).",
      "Mengembangkan UI responsif dengan React dan TypeScript, terintegrasi backend Laravel (Inertia.js).",
      "Merancang arsitektur frontend serta membantu perancangan endpoint dan database.",
    ],
  },
  {
    slug: "idsolusi",
    role: "FullStack Developer",
    company: "PT. Inovasi Dinamika Solusi",
    period: "Aug 2025 - Oct 2025",
    location: "Bandung, Indonesia",
    bullets: [
      "Mengerjakan modul ERP perusahaan, terutama CRUD dan logika transaksi dengan Vue.js.",
      "Mempelajari struktur folder dan arsitektur proyek skala besar.",
      "Menyelesaikan masalah frontend dan berkoordinasi dengan tim backend.",
    ],
  },
  {
    slug: "bara",
    role: "FrontEnd Web Developer (Magang)",
    company: "Bara Enterprise",
    period: "Sep 2021 - Nov 2021",
    location: "Cimahi, Indonesia",
    bullets: [
      "Merancang dan membangun aplikasi web dari ideasi hingga implementasi.",
      "Meningkatkan efisiensi alur kerja internal ±25% lewat sistem terstruktur dan terdokumentasi.",
    ],
  },
]

/** Inisial untuk tile logo: lewati nama badan hukum, ambil huruf awal maksimal 3. */
export function initialsOf(company: string): string {
  const base = company.split("(")[0]
  const words = base
    .split(/\s+/)
    .map((word) => word.replace(/[^A-Za-z0-9]/g, ""))
    .filter((word) => word.length > 0 && !/^(pt|cv|ud|tbk)$/i.test(word))
  const letters = words.map((word) => word[0].toUpperCase()).join("")
  if (letters.length >= 2) return letters.slice(0, 3)
  return company.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()
}
