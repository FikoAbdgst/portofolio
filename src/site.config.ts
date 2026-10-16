export const siteConfig = {
  name: "Fiko Abdigusti",
  jobTitle: "Full-Stack Developer",
  tagline: "Full-Stack Developer (fokus kuat di Frontend)",
  email: "fikoabdigusti15@gmail.com",
  phone: "+62882001330851",
  url: "https://example.com",
  description:
    "Portofolio Fiko Abdigusti — Full-Stack Developer dengan fokus kuat di Frontend. Proyek, pengalaman, dan kontak. Bangun web cepat, aksesibel, dan SEO-friendly.",
  location: "Cimahi, Indonesia",
  socials: {
    github: "https://github.com/fikoabdgst",
    linkedin: "https://linkedin.com/in/fiko-abdigusti",
  },
} as const

export type SiteConfig = typeof siteConfig