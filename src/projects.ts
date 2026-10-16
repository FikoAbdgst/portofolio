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

/**
 * Sumber data: portfolio-data.md (CV 5 Oktober 2026).
 * Demo URL / Repo URL / Gambar masih kosong di data ("-"):
 * tombol demo & repo disembunyikan otomatis kalau string-nya kosong,
 * dan gambar memakai placeholder yang sudah ada di public/projects.
 */
export const projects: Project[] = [
  {
    slug: "ngabuket-bandung",
    title: "Ngabuket Bandung",
    description:
      "Aplikasi e-commerce dan sistem manajemen pemesanan buket bunga dengan dua antarmuka: pelanggan dan admin.",
    longDescription:
      "E-commerce dan manajemen pemesanan buket bunga (Jul 2026 - Sep 2026) dengan dua antarmuka: pelanggan dan admin. Pelanggan menelusuri katalog produk, memakai keranjang, dan melakukan pemesanan; admin mengelola inventaris produk dan kategori, menangani pesanan masuk, serta memantau status pengiriman lewat tracking log.",
    tags: ["Laravel"],
    image: "/projects/project-satu.svg",
    alt: "Preview Ngabuket Bandung",
    url: "",
    github: "",
    year: 2026,
    role: "Fullstack Developer",
    category: "Fullstack",
    href: "",
    featured: true,
    highlights: [
      "Pelanggan: menelusuri katalog produk, keranjang, dan pemesanan.",
      "Admin: mengelola inventaris produk dan kategori, menangani pesanan masuk, memantau status pengiriman lewat tracking log.",
    ],
  },
  {
    slug: "sitami",
    title: "SITAMI (Sistem Informasi Tracer Study dan Portal Kerja Alumni)",
    description:
      "Wadah terintegrasi yang menghubungkan kampus, alumni, dan perusahaan. Proyek Tugas Akhir D3, STMIK Mardira Indonesia.",
    longDescription:
      "Proyek Tugas Akhir D3 di STMIK Mardira Indonesia (May 2026 - Sep 2026): wadah terintegrasi yang menghubungkan kampus, alumni, dan perusahaan. Dibangun dengan arsitektur full-stack Laravel, React, dan Inertia.js, dilengkapi kuesioner tracer study, portal lowongan kerja dengan manajemen lamaran dan talent pool, forum diskusi komunitas alumni, serta real-time chat antara pelamar dan perusahaan.",
    tags: ["Laravel", "React", "Inertia.js"],
    image: "/projects/project-dua.svg",
    alt: "Preview SITAMI",
    url: "",
    github: "",
    year: 2026,
    role: "Fullstack Developer",
    category: "Fullstack",
    href: "",
    featured: true,
    highlights: [
      "Kuesioner tracer study untuk pelacakan karir alumni.",
      "Portal lowongan kerja, manajemen lamaran, dan talent pool.",
      "Forum diskusi komunitas alumni.",
      "Real-time chat antara pelamar dan perusahaan.",
    ],
  },
  {
    slug: "cv-adzra",
    title: "Sistem Informasi Manajemen CV Adzra",
    description:
      "ERP untuk CV Adzra dengan sistem multi-role (Admin dan Staff) untuk mendigitalisasi proses operasional bisnis.",
    longDescription:
      "Sistem Informasi Manajemen / ERP untuk CV Adzra (Jul 2026 - Aug 2026) dengan sistem multi-role (Admin dan Staff) untuk mendigitalisasi proses operasional bisnis: manajemen inventaris produk dan supplier, transaksi dan pesanan termasuk pelacakan garansi pelanggan, pencatatan keuangan (buku kas), serta modul HR berisi data pekerja, presensi harian, dan penggajian (payroll).",
    tags: ["Laravel", "Blade", "Tailwind CSS"],
    image: "/projects/project-tiga.svg",
    alt: "Preview Sistem Informasi Manajemen CV Adzra",
    url: "",
    github: "",
    year: 2026,
    role: "Fullstack Developer",
    category: "Fullstack",
    href: "",
    featured: true,
    highlights: [
      "Manajemen inventaris produk dan supplier.",
      "Transaksi dan pesanan, termasuk pelacakan garansi pelanggan.",
      "Pencatatan keuangan (buku kas).",
      "Modul HR: data pekerja, presensi harian, penggajian (payroll).",
    ],
  },
  {
    slug: "kantin-mardira",
    title: "Kantin-Mardira",
    description:
      "Mendigitalisasi operasional kantin end-to-end, dari transaksi kasir (POS) sampai manajemen inventaris. Bagian yang saya kerjakan: frontend.",
    longDescription:
      "Platform manajemen kantin (May 2026) yang mendigitalisasi operasional kantin end-to-end, dari transaksi kasir (POS) sampai manajemen inventaris. Bagian yang saya kerjakan: frontend — modul POS untuk operasional kasir harian, dashboard Admin untuk mengelola data pengguna, kategori, dan menu makanan, serta manajemen state global (sesi dan autentikasi pengguna) dengan Pinia.",
    tags: ["Vue.js 3", "Vite", "Pinia", "Tailwind CSS", "Axios"],
    image: "/projects/project-empat.svg",
    alt: "Preview Kantin-Mardira",
    url: "",
    github: "",
    year: 2026,
    role: "Frontend Developer",
    category: "Frontend",
    href: "",
    featured: true,
    highlights: [
      "Modul POS untuk operasional kasir harian.",
      "Dashboard Admin untuk mengelola data pengguna, kategori, dan menu makanan.",
      "Manajemen state global (sesi dan autentikasi pengguna) dengan Pinia.",
    ],
  },
  {
    slug: "rifera-management",
    title: "Rifera Management",
    description:
      "Website company profile dan portofolio agensi talent/influencer. Berfokus pada performa dan SEO; landing page di-generate statis sehingga memuat sangat cepat.",
    longDescription:
      "Website company profile dan portofolio agensi talent/influencer (Apr 2026 - May 2026) yang dibangun dengan Next.js (Static Site Generation). Berfokus pada performa dan SEO; landing page di-generate statis sehingga memuat sangat cepat. Memuat katalog profil talent yang dinaungi serta portofolio klien/brand yang bekerja sama dengan agensi.",
    tags: ["Next.js", "SSG"],
    image: "/projects/project-lima.svg",
    alt: "Preview Rifera Management",
    url: "",
    github: "",
    year: 2026,
    role: "Frontend Developer",
    category: "Frontend",
    href: "",
    highlights: [
      "Katalog profil talent yang dinaungi.",
      "Portofolio klien/brand yang bekerja sama dengan agensi.",
    ],
  },
  {
    slug: "panoricam",
    title: "Panoricam",
    description:
      "Aplikasi photobooth berbasis web. Dipakai luas di acara kampus STMIK Mardira Indonesia dan menghasilkan pendapatan sebagai solusi tugas akhir yang berorientasi bisnis.",
    longDescription:
      "Aplikasi photobooth berbasis web (Jun 2025 - Aug 2025) yang dibangun full-stack dengan Laravel. Dipakai luas di acara kampus STMIK Mardira Indonesia (Pembukaan HIMA D3 dan Osmaru 2025) dan menghasilkan pendapatan sebagai solusi tugas akhir yang berorientasi bisnis.",
    tags: ["Laravel"],
    image: "/projects/project-enam.svg",
    alt: "Preview Panoricam",
    url: "",
    github: "",
    year: 2025,
    role: "Fullstack Developer",
    category: "Fullstack",
    href: "",
    highlights: [
      "Dipakai di Pembukaan HIMA D3 dan Osmaru 2025 STMIK Mardira Indonesia.",
      "Menghasilkan pendapatan sebagai solusi tugas akhir yang berorientasi bisnis.",
    ],
  },
  {
    slug: "spendtvise",
    title: "Spendtvise",
    description:
      "Aplikasi manajemen keuangan pribadi: pencatatan pengeluaran dan pemasukan serta analisis laporan keuangan bulanan.",
    longDescription:
      "Aplikasi manajemen keuangan pribadi (May 2025 - Jun 2025) untuk pencatatan pengeluaran dan pemasukan serta analisis laporan keuangan bulanan. Dibangun dengan Node.js, Express.js, React.js, dan MySQL. Efisiensi pencatatan meningkat hingga ±50% lewat antarmuka intuitif dan basis data terstruktur.",
    tags: ["Node.js", "Express.js", "React.js", "MySQL"],
    image: "/projects/project-satu.svg",
    alt: "Preview Spendtvise",
    url: "",
    github: "",
    year: 2025,
    role: "Fullstack Developer",
    category: "Fullstack",
    href: "",
    highlights: [
      "Pencatatan pengeluaran dan pemasukan serta analisis laporan keuangan bulanan.",
      "Efisiensi pencatatan meningkat hingga ±50% lewat antarmuka intuitif dan basis data terstruktur.",
    ],
  },
  {
    slug: "csa-web",
    title: "Creative Student Association Web",
    description:
      "Platform identitas resmi UKM CSA: UI/UX konsisten dengan branding organisasi, dilengkapi sistem manajemen konten untuk publikasi kegiatan.",
    longDescription:
      "Platform identitas resmi UKM Creative Student Association (Feb 2025 - Mar 2025) dengan UI/UX konsisten dengan branding organisasi, dilengkapi sistem manajemen konten untuk publikasi kegiatan. Dibangun dengan React.js, Node.js, Express.js, MySQL, dan Tailwind CSS. Visibilitas dan interaksi pengunjung naik hingga ±35% dalam 2 bulan.",
    tags: ["React.js", "Node.js", "Express.js", "MySQL", "Tailwind CSS"],
    image: "/projects/project-dua.svg",
    alt: "Preview Creative Student Association Web",
    url: "",
    github: "",
    year: 2025,
    role: "Fullstack Developer",
    category: "Fullstack",
    href: "",
    highlights: [
      "UI/UX konsisten dengan branding organisasi.",
      "Sistem manajemen konten untuk publikasi kegiatan.",
      "Visibilitas dan interaksi pengunjung naik hingga ±35% dalam 2 bulan.",
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
