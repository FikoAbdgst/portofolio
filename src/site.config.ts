export const siteConfig = {
  name: "Fiko Abdigusti",
  jobTitle: "Frontend Developer",
  tagline: "Frontend Developer & UI Engineer",
  email: "fikoabdigusti15@gmail.com",
  url: "https://example.com",
  description:
    "Frontend Developer portofolio — proyek, pengalaman, dan kontak. Bangun web cepat, aksesibel, dan SEO-friendly.",
  location: "Bandung, Indonesia",
  socials: {
    github: "https://github.com/fikoabdgst",
    linkedin: "https://linkedin.com/in/fiko-abdigusti",
    twitter: "https://x.com/",
  },
} as const

export type SiteConfig = typeof siteConfig