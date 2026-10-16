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

export const education: EducationEntry[] = [
  {
    slug: "stmik-mardira-indonesia",
    institution: "STMIK Mardira Indonesia",
    degree: "Diploma 3 (D3) Teknik Informatika",
    period: "Aug 2023 - Aug 2026",
    gpa: "GPA: 3.7/4.00",
    logo: "/img/edu.png",
    initials: "SMI",
    highlights: [
      "Mempelajari Pemrograman Web, Internet of Things, Struktur Data, Algoritma dan Pemrograman, Analisis Sistem Informasi, Pemrograman Android, dan Pemrograman Python.",
      "Anggota Himpunan Mahasiswa D3 (HIMA).",
      "Anggota Unit Kegiatan Mahasiswa Creative Student Association (CSA), berfokus pada pengembangan keterampilan coding, inovasi teknologi, dan kolaborasi proyek kreatif di bidang IT.",
    ],
  },
]

export type Certification = {
  slug: string
  name: string
  issuer: string
  period: string
  credentialId?: string
}

/** Sumber data: portfolio-data.md bagian 4.2. */
export const certifications: Certification[] = [
  {
    slug: "frontend-developer-react",
    name: "Frontend Developer (React)",
    issuer: "HackerRank",
    period: "May 2025",
    credentialId: "8D91C23F837B",
  },
  {
    slug: "javascript-dasar",
    name: "JavaScript Dasar",
    issuer: "CODEPOLITAN",
    period: "Apr 2025",
  },
  {
    slug: "java-foundations",
    name: "Java Foundations",
    issuer: "ORACLE Academy",
    period: "Jun 2021",
  },
  {
    slug: "java-fundamentals",
    name: "Java Fundamentals",
    issuer: "ORACLE Academy",
    period: "Jan 2021",
  },
]

