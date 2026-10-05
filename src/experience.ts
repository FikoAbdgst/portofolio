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
      "Mengerjakan aplikasi web end-to-end untuk klien — dari diskusi kebutuhan hingga deployment — dengan React.js, Laravel, dan Tailwind CSS.",
      "Merancang UI/UX, database, dan struktur kode modular yang mudah dilanjutkan developer lain.",
      "Mengoptimalkan performa website hingga ±40% lewat perapihan kode dan desain responsif.",
    ],
  },
  {
    slug: "csa-stmik-mardira",
    role: "Frontend-Focused Full-Stack Developer",
    company: "CSA (UKM Kampus STMIK Mardira Indonesia)",
    period: "Oct 2025 - Dec 2025",
    location: "Bandung, Indonesia",
    bullets: [
      "Mengembangkan sistem e-rapor web untuk SMK dalam program pengabdian masyarakat.",
      "Membangun UI responsif dengan React, TypeScript, dan Laravel (Inertia.js).",
      "Merancang arsitektur frontend serta endpoint dan database dasar bersama backend developer.",
    ],
  },
  {
    slug: "pt-inovasi-dinamika-solusi",
    role: "Fullstack Developer",
    company: "PT. Inovasi Dinamika Solusi",
    period: "Aug 2025 - Oct 2025",
    location: "Bandung, Indonesia",
    bullets: [
      "Mengelola modul ERP: CRUD data dan logika transaksi dengan Vue.js.",
      "Mengikuti standarisasi struktur folder dan arsitektur proyek skala besar.",
      "Berkoordinasi dengan tim backend untuk integrasi data dan problem solving frontend.",
    ],
  },
  {
    slug: "bara-enterprise",
    role: "Frontend Web Developer (Magang)",
    company: "Bara Enterprise",
    period: "Sep 2021 - Nov 2021",
    location: "Cimahi, Indonesia",
    bullets: [
      "Menganalisis kebutuhan pengguna dan membangun aplikasi web dari ideasi hingga implementasi.",
      "Meningkatkan efisiensi alur kerja internal ±25% lewat sistem terstruktur yang terdokumentasi.",
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
