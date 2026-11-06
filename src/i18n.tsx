"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export type Lang = "id" | "en"

const STORAGE_KEY = "portfolio-lang"

/** Seluruh teks UI landing dalam dua bahasa. Kunci id & en wajib sejajar. */
const ui = {
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      projects: "Proyek",
      services: "Layanan",
      contact: "Kontak",
      mainLabel: "Navigasi utama",
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",
      mobileMenuLabel: "Menu ponsel",
      showLang: "Tampilkan pilihan bahasa",
      hideLang: "Sembunyikan pilihan bahasa",
    },
    hero: {
      intro:
        "Saya mengubah ide menjadi pengalaman web yang cepat, hidup, dan bermakna.",
      role: "Full-Stack Developer",
      available: "Tersedia untuk proyek baru",
      scroll: "Gulir",
      contact: "Hubungi Saya",
    },
    about: {
      tagline: "Tentang Saya",
      titleA: "Seorang full-stack developer &",
      titleB: "pembangun web yang cepat dan aksesibel.",
      body: "Full-stack developer lulusan D3 Teknik Informatika yang terbiasa membangun aplikasi web nyata dengan React, Vue.js, Laravel, dan Node.js. Fokus pada antarmuka yang responsif, cepat, dan mudah dipakai.",
      study: "Teknik Informatika",
      cta: "Hubungi Saya",
    },
    experience: {
      tagline: "Riwayat Kerja",
      title: "Pengalaman",
      subtitle: "Peran dan kontribusi saya di industri teknologi.",
    },
    education: {
      tagline: "Latar Akademik",
      title: "Pendidikan",
      subtitle:
        "Fondasi pengetahuan dan pengalaman akademik yang membentuk perjalanan profesional saya.",
      campusLabel: "Kampus",
      recordLabel: "Catatan Akademik",
      gpaLabel: "IPK",
      tabsLabel: "Detail pendidikan",
      topics: {
        degree: "Gelar",
        coursework: "Mata Kuliah",
        organization: "Organisasi",
        period: "Periode",
      },
      topicKickers: {
        degree: "Gelar akademik",
        coursework: "Yang dipelajari",
        organization: "Di luar kelas",
        period: "Masa studi",
      },
      topicNotes: {
        coursework: "Tujuh mata kuliah inti yang membentuk dasar teknis saya.",
        organization: "Anggota UKM Creative Student Association (CSA).",
      },
      organizationFocus: [
        "Keterampilan Coding",
        "Inovasi Teknologi",
        "Kolaborasi Proyek",
      ],
      periodNote:
        "Rentang masa studi di STMIK Mardira Indonesia, dari awal masuk sampai lulus.",
    },
    projects: {
      tagline: "Proyek Pilihan",
      title: "Proyek Unggulan",
      desc: "Pilihan proyek yang saya rancang dan bangun.",
      viewAll: "Lihat semua proyek",
      viewLabel: "Lihat",
      visit: "Buka situs",
      all: "Semua",
      filterLabel: "Filter proyek berdasarkan kategori",
      empty: "Belum ada proyek pada kategori ini.",
      pageTagline: "Semua Proyek",
      pageTitle: "Semua Proyek",
      pageDesc:
        "Koleksi lengkap karya yang pernah saya kerjakan — dari antarmuka frontend hingga aplikasi fullstack. Klik untuk melihat detail, teknologi, dan hasilnya.",
      backHome: "← Kembali ke beranda",
      listLabel: "Daftar proyek",
      crumbHome: "Beranda",
      crumbProjects: "Proyek",
      aboutProject: "Tentang Proyek",
      highlights: "Pencapaian",
      liveDemo: "Demo Live",
      sourceCode: "Kode Sumber",
    },
    services: {
      tagline: "Yang Saya Kerjakan",
      titleA: "Mengubah Ide menjadi",
      titleB: "Realitas Digital",
      intro:
        "Saya berfokus di frontend dan memahami sisi full-stack, sehingga bisa membangun antarmuka yang rapi sekaligus menghubungkannya dengan backend. Dari website company profile hingga sistem informasi, hasilnya cepat, mudah diakses, dan berpusat pada pengguna.",
      statProjects: "Proyek Selesai",
      statYears: "Tahun Ngoding",
      statStack: "Tech Stack",
      cta: "Mari Berkolaborasi",
    },
    process: {
      rows: ["PROSES DESAIN", "LANGKAH YANG SAYA IKUTI"],
      tagline: "Proses",
      title: "Cara Saya Bekerja",
    },
    contact: {
      pill: "Tersedia untuk proyek baru",
      titleA: "Mari bekerja",
      titleB: "sama.",
      cta: "Mulai Proyek",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      services: "Services",
      contact: "Contact",
      mainLabel: "Main navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      mobileMenuLabel: "Mobile menu",
      showLang: "Show language options",
      hideLang: "Hide language options",
    },
    hero: {
      intro:
        "I turn ideas into fast, vivid, and meaningful web experiences.",
      role: "Full-Stack Developer",
      available: "Available for work",
      scroll: "Scroll",
      contact: "Contact Us",
    },
    about: {
      tagline: "About Me",
      titleA: "A full-stack developer &",
      titleB: "builder of fast, accessible web.",
      body: "A full-stack developer with a Diploma in Informatics Engineering, building real-world web apps with React, Vue.js, Laravel, and Node.js. I focus on interfaces that are responsive, fast, and easy to use.",
      study: "Informatics Engineering",
      cta: "Contact Me",
    },
    experience: {
      tagline: "Work History",
      title: "Experience",
      subtitle:
        "My professional journey and key roles in the tech industry.",
    },
    education: {
      tagline: "Academic Background",
      title: "Education",
      subtitle:
        "The knowledge foundation and academic journey shaping my professional path.",
      campusLabel: "Campus",
      recordLabel: "Academic Record",
      gpaLabel: "GPA",
      tabsLabel: "Education details",
      topics: {
        degree: "Degree",
        coursework: "Coursework",
        organization: "Organization",
        period: "Period",
      },
      topicKickers: {
        degree: "Academic degree",
        coursework: "What I studied",
        organization: "Beyond the classroom",
        period: "Study period",
      },
      topicNotes: {
        coursework: "Seven core courses that shaped my technical foundation.",
        organization: "Member of the Creative Student Association (CSA) student unit.",
      },
      organizationFocus: [
        "Coding Skills",
        "Tech Innovation",
        "Project Collaboration",
      ],
      periodNote:
        "The study period at STMIK Mardira Indonesia, from enrollment to graduation.",
    },
    projects: {
      tagline: "Selected Projects",
      title: "Featured Projects",
      desc: "A curated selection of projects I've designed and built.",
      viewAll: "View all projects",
      viewLabel: "View",
      visit: "Visit site",
      all: "All",
      filterLabel: "Filter projects by category",
      empty: "No projects in this category yet.",
      pageTagline: "All Projects",
      pageTitle: "All Projects",
      pageDesc:
        "The complete collection of my work — from frontend interfaces to fullstack apps. Click to see details, tech, and outcomes.",
      backHome: "← Back to home",
      listLabel: "Project list",
      crumbHome: "Home",
      crumbProjects: "Projects",
      aboutProject: "About the Project",
      highlights: "Highlights",
      liveDemo: "Live Demo",
      sourceCode: "Source Code",
    },
    services: {
      tagline: "What I Do",
      titleA: "Turning Ideas into",
      titleB: "Digital Reality",
      intro:
        "I focus on frontend with full-stack understanding, so I can build neat interfaces and connect them to the backend. From company profiles to information systems, the result is fast, accessible, and user-centered.",
      statProjects: "Projects Done",
      statYears: "Years Coding",
      statStack: "Tech Stack",
      cta: "Let's Collaborate",
    },
    process: {
      rows: ["DESIGN PROCESS", "STEPS I FOLLOW"],
      tagline: "Process",
      title: "How I Work",
    },
    contact: {
      pill: "Available for new projects",
      titleA: "Let's work",
      titleB: "together.",
      cta: "Start a Project",
    },
  },
} as const

export type Strings = typeof ui.id

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Strings
}

const LangContext = createContext<LangContextValue>({
  lang: "id",
  setLang: () => {},
  t: ui.id,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Bahasa tersimpan dibaca di initializer (guard SSR) agar tidak ada
  // setState sinkron di dalam effect dan tanpa flash bahasa saat hydrate.
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "id"
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === "id" || stored === "en" ? stored : "id"
  })

  useEffect(() => {
    document.documentElement.lang = lang
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  return (
    <LangContext.Provider
      // Kedua bahasa disusun dengan kunci sejajar; cast aman by-construction.
      value={{ lang, setLang, t: ui[lang] as unknown as Strings }}
    >
      {children}
    </LangContext.Provider>
  )
}

export function useLang(): LangContextValue {
  return useContext(LangContext)
}

/** Terjemahan Inggris untuk bullet pengalaman (kunci = slug). */
export const expBulletsEn: Record<string, string[]> = {
  freelance: [
    "Built web apps for clients—from academic assignments to small-business sites.",
    "Shaped interfaces with React, Laravel, and Tailwind: UI/UX, database, and deployment.",
    "Improved site performance by ±40% through cleaner code and responsive design.",
    "Guided clients from requirements to on-time release.",
  ],
  csa: [
    "Built the e-report interface for vocational schools in a community service (CSA) program.",
    "Developed responsive UI with React and TypeScript, integrated with a Laravel backend (Inertia.js).",
    "Designed the frontend architecture and supported endpoint and database planning.",
  ],
  idsolusi: [
    "Worked on company ERP modules, mainly CRUD and transaction logic with Vue.js.",
    "Studied professional folder structure and large-scale project architecture.",
    "Solved frontend issues and coordinated with the backend team.",
  ],
  bara: [
    "Designed and built web apps from ideation to implementation.",
    "Improved internal workflow efficiency by ±25% through a structured, documented system.",
  ],
}

/** Terjemahan Inggris untuk deskripsi proyek (kunci = slug). */
export const projectTextEn: Record<
  string,
  { description: string; longDescription: string; highlights: string[] }
> = {
  "ngabuket-bandung": {
    description:
      "E-commerce app and bouquet order management system with two interfaces: customer and admin.",
    longDescription:
      "E-commerce and bouquet order management (Jul 2026 - Sep 2026) with two interfaces: customer and admin. Customers browse the product catalog, use the cart, and place orders; admins manage product and category inventory, handle incoming orders, and track delivery status via a tracking log.",
    highlights: [
      "Customers: browse the product catalog, cart, and ordering.",
      "Admins: manage product and category inventory, handle incoming orders, track delivery status via a tracking log.",
    ],
  },
  sitami: {
    description:
      "An integrated hub connecting campus, alumni, and companies. D3 final project at STMIK Mardira Indonesia.",
    longDescription:
      "D3 final project at STMIK Mardira Indonesia (May 2026 - Sep 2026): an integrated hub connecting campus, alumni, and companies. Built full-stack with Laravel, React, and Inertia.js — featuring tracer-study questionnaires, a job portal with application management and talent pool, an alumni community forum, and real-time chat between applicants and companies.",
    highlights: [
      "Tracer-study questionnaires for tracking alumni careers.",
      "Job portal, application management, and talent pool.",
      "Alumni community discussion forum.",
      "Real-time chat between applicants and companies.",
    ],
  },
  "cv-adzra": {
    description:
      "ERP for CV Adzra with a multi-role system (Admin and Staff) digitizing business operations.",
    longDescription:
      "Management Information System / ERP for CV Adzra (Jul 2026 - Aug 2026) with a multi-role system (Admin and Staff) digitizing business operations: product and supplier inventory management, transactions and orders including customer warranty tracking, financial bookkeeping (cash ledger), plus HR modules with employee data, daily attendance, and payroll.",
    highlights: [
      "Product and supplier inventory management.",
      "Transactions and orders, including customer warranty tracking.",
      "Financial bookkeeping (cash ledger).",
      "HR modules: employee data, daily attendance, payroll.",
    ],
  },
  "kantin-mardira": {
    description:
      "Digitizing canteen operations end-to-end, from cashier transactions (POS) to inventory management. My part: frontend.",
    longDescription:
      "Canteen management platform (May 2026) digitizing canteen operations end-to-end, from cashier transactions (POS) to inventory management. My part: frontend — a POS module for daily cashier operations, an Admin dashboard for users, categories, and food menus, plus global state management (user sessions and auth) with Pinia.",
    highlights: [
      "POS module for daily cashier operations.",
      "Admin dashboard for users, categories, and food menus.",
      "Global state management (user sessions and auth) with Pinia.",
    ],
  },
  "rifera-management": {
    description:
      "Company profile and portfolio site for a talent/influencer agency. Performance and SEO focused; statically generated landing for blazing loads.",
    longDescription:
      "Company profile and portfolio website for a talent/influencer agency (Apr 2026 - May 2026) built with Next.js (Static Site Generation). Focused on performance and SEO; the statically generated landing loads extremely fast. Showcases the talents' catalog and the brands partnering with the agency.",
    highlights: [
      "Catalog of represented talents.",
      "Portfolio of brands partnering with the agency.",
    ],
  },
  panoricam: {
    description:
      "Web-based photobooth app. Widely used at STMIK Mardira Indonesia campus events and earning revenue as a business-oriented final project.",
    longDescription:
      "Web-based photobooth app (Jun 2025 - Aug 2025) built full-stack with Laravel. Widely used at STMIK Mardira Indonesia campus events (HIMA D3 Opening and Osmaru 2025) and earning revenue as a business-oriented final-project solution.",
    highlights: [
      "Used at HIMA D3 Opening and Osmaru 2025, STMIK Mardira Indonesia.",
      "Earning revenue as a business-oriented final-project solution.",
    ],
  },
  spendtvise: {
    description:
      "Personal finance manager: income/expense records plus monthly financial report analysis.",
    longDescription:
      "Personal finance management app (May 2025 - Jun 2025) for recording income and expenses plus monthly financial report analysis. Built with Node.js, Express.js, React.js, and MySQL. Record-keeping efficiency improved by ±50% through an intuitive interface and structured database.",
    highlights: [
      "Income and expense records plus monthly financial report analysis.",
      "Record-keeping efficiency up ±50% via an intuitive interface and structured database.",
    ],
  },
  "csa-web": {
    description:
      "The official identity platform of UKM CSA: on-brand UI/UX with a content system for activity publications.",
    longDescription:
      "The official identity platform of UKM Creative Student Association (Feb 2025 - Mar 2025) with on-brand UI/UX and a content management system for activity publications. Built with React.js, Node.js, Express.js, MySQL, and Tailwind CSS. Visitor visibility and engagement grew ±35% within 2 months.",
    highlights: [
      "On-brand UI/UX consistent with the organization.",
      "Content management system for activity publications.",
      "Visitor visibility and engagement up ±35% within 2 months.",
    ],
  },
}

/** Terjemahan Inggris untuk deskripsi layanan (kunci = slug). */
export const serviceDescEn: Record<string, string> = {
  "frontend-development":
    "Building fast, responsive, and accessible web interfaces with React, Next.js, Vue.js, TypeScript, and Tailwind CSS.",
  "ui-implementation":
    "Translating designs into neat, pixel-perfect, responsive layouts on every screen size.",
  "fullstack-integration":
    "Connecting frontend to backend and databases via APIs using Laravel (Inertia.js), Node.js, MySQL, and PostgreSQL.",
  "performance-seo":
    "Performance optimization (up to ±40%), Static Site Generation, and SEO so websites load fast and get found.",
}

/** Terjemahan Inggris untuk langkah proses (kunci = slug). */
export const processDescEn: Record<string, string> = {
  discovery:
    "Understanding the core problem and business goals through research and client discussions.",
  strategy:
    "Planning architecture, user flows, and tech stack for easy growth and scale.",
  design: "Creating wireframes and high-resolution interactive prototypes.",
  development: "Writing clean, efficient code and integrating APIs.",
}

/** Terjemahan Inggris untuk highlight pendidikan. */
export const eduHighlightsEn: string[] = [
  "Studied Web Programming, Internet of Things, Data Structures, Algorithms and Programming, Information Systems Analysis, Android Programming, and Python Programming.",
  "Member of the D3 Student Association (HIMA).",
  "Member of the Creative Student Association (CSA) student unit, focused on coding skills, tech innovation, and creative IT project collaboration.",
]

export const eduDegreeEn = "Diploma 3 (D3) in Informatics Engineering"

/** Mata kuliah inti — urutan sama di kedua bahasa agar ikon tetap sejajar. */
export const eduCourses: string[] = [
  "Pemrograman Web",
  "Internet of Things",
  "Struktur Data",
  "Algoritma dan Pemrograman",
  "Analisis Sistem Informasi",
  "Pemrograman Android",
  "Pemrograman Python",
]

export const eduCoursesEn: string[] = [
  "Web Programming",
  "Internet of Things",
  "Data Structures",
  "Algorithms and Programming",
  "Information Systems Analysis",
  "Android Programming",
  "Python Programming",
]
