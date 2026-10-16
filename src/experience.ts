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
      "Mengembangkan dan mengirimkan proyek berbasis kebutuhan klien, dari aplikasi web untuk tugas akademik hingga website perusahaan skala kecil-menengah.",
      "Merancang dan mengintegrasikan antarmuka dengan React.js, Laravel, dan Tailwind CSS, termasuk desain UI/UX, koneksi basis data, dan deployment.",
      "Mengoptimalkan performa website hingga ±40% lewat perbaikan struktur kode dan desain responsif.",
      "Berkolaborasi dengan klien untuk menganalisis kebutuhan, memberikan solusi teknis yang tepat, dan memastikan proyek selesai tepat waktu dengan standar kualitas tinggi.",
    ],
  },
  {
    slug: "csa",
    role: "Frontend Developer",
    company: "CSA (UKM Kampus STMIK Mardira Indonesia)",
    period: "Oct 2025 - Dec 2025",
    location: "Bandung, Indonesia",
    bullets: [
      "Bertanggung jawab atas implementasi teknis sistem e-rapor berbasis web untuk SMK, bagian dari program pengabdian masyarakat (CSA).",
      "Membangun antarmuka responsif dan intuitif dengan React dan TypeScript, terintegrasi dengan backend Laravel (Inertia.js).",
      "Merancang dan mengimplementasikan arsitektur frontend, serta mendukung Backend Developer merancang endpoint dan database dasar.",
    ],
  },
  {
    slug: "idsolusi",
    role: "FullStack Developer",
    company: "PT. Inovasi Dinamika Solusi",
    period: "Aug 2025 - Oct 2025",
    location: "Bandung, Indonesia",
    bullets: [
      "Terlibat dalam proyek Enterprise Resource Planning (ERP) yang sedang berjalan di perusahaan.",
      "Mengelola beberapa modul ERP, khususnya pengelolaan data CRUD dan logika transaksi dengan Vue.js.",
      "Mempelajari standarisasi struktur folder profesional dan arsitektur proyek skala besar.",
      "Menangani problem solving di sisi frontend dan berkoordinasi dengan tim backend untuk integrasi data.",
    ],
  },
  {
    slug: "bara",
    role: "FrontEnd Web Developer (Magang)",
    company: "Bara Enterprise",
    period: "Sep 2021 - Nov 2021",
    location: "Cimahi, Indonesia",
    bullets: [
      "Menganalisis kebutuhan pengguna untuk merancang solusi perangkat lunak yang relevan dan efisien.",
      "Memimpin pengembangan aplikasi web dari ideasi hingga implementasi, mencakup arsitektur sistem, integrasi modul, dan pengujian.",
      "Meningkatkan efisiensi alur kerja internal ±25% lewat desain sistem terstruktur dan proses pengembangan yang terdokumentasi.",
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
