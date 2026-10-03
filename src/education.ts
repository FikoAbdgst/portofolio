export type EducationEntry = {
  slug: string
  institution: string
  degree: string
  period: string
  gpa: string
  logo?: string
  initials: string
  highlights: string[]
}

export type Certification = {
  slug: string
  name: string
  issuer: string
  date: string
}

export const education: EducationEntry[] = [
  {
    slug: "stmik-mardira-indonesia",
    institution: "STMIK Mardira Indonesia",
    degree: "Diploma 3 (D3) Teknik Informatika",
    period: "Aug 2023 - Aug 2026",
    gpa: "GPA: 3.7/4.00",
    initials: "SMI",
    highlights: [
      "Mempelajari Pemrograman Web, Internet of Things, Struktur Data, Algoritma dan Pemrograman, Analisis Sistem Informasi, Pemrograman Android, dan Pemrograman Python.",
      "Anggota Himpunan Mahasiswa D3 (HIMA).",
      "Anggota Unit Kegiatan Mahasiswa Creative Student Association (CSA), berfokus pada pengembangan keterampilan coding, inovasi teknologi, dan kolaborasi proyek kreatif di bidang IT.",
    ],
  },
]

export const certifications: Certification[] = [
  {
    slug: "frontend-developer-react-hackerrank",
    name: "Frontend Developer (React)",
    issuer: "HackerRank",
    date: "May 2025",
  },
  {
    slug: "javascript-dasar-codepolitan",
    name: "JavaScript Dasar",
    issuer: "CODEPOLITAN",
    date: "Apr 2025",
  },
  {
    slug: "java-foundations-oracle-academy",
    name: "Java Foundations",
    issuer: "ORACLE Academy",
    date: "Jun 2021",
  },
  {
    slug: "java-fundamentals-oracle-academy",
    name: "Java Fundamentals",
    issuer: "ORACLE Academy",
    date: "Jan 2021",
  },
]
