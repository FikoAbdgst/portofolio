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

