import type { Metadata } from "next"
import { siteConfig } from "@/src/site.config"
import { JsonLd } from "@/src/components/json-ld"

export const metadata: Metadata = {
  title: "Tentang Saya",
  description: `Profil ${siteConfig.name} — ${siteConfig.jobTitle} dengan fokus pada web modern, aksesibel, dan performa tinggi.`,
  alternates: { canonical: `${siteConfig.url}/about/` },
  openGraph: {
    title: `Tentang Saya | ${siteConfig.name}`,
    description: `Profil ${siteConfig.name} — ${siteConfig.jobTitle}.`,
    url: `${siteConfig.url}/about/`,
  },
}

const skills = [
  { name: "React", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Next.js", level: 80 },
  { name: "Tailwind CSS", level: 85 },
  { name: "Node.js", level: 70 },
  { name: "PostgreSQL", level: 65 },
]

const timeline = [
  {
    period: "2024 — sekarang",
    role: "Frontend Developer",
    org: "Perusahaan / Freelance",
    note: "Deskripsi singkat peran dan tanggung jawabmu.",
  },
  {
    period: "2022 — 2024",
    role: "Junior Web Developer",
    org: "Perusahaan sebelumnya",
    note: "Deskripsi singkat peran dan tanggung jawabmu.",
  },
]

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: siteConfig.jobTitle,
      url: `${siteConfig.url}/about/`,
    },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="max-w-3xl space-y-8">
        <header className="space-y-3">
          <p className="readout">
            <span className="lbl">id</span>
            {"// PROFILE.ABOUT"}
          </p>
          <h1>Tentang Saya</h1>
          <p className="text-lg" style={{ color: "var(--text-h)" }}>
            Tulis paragraf singkat tentang siapa dirimu — latar belakang,
            apa yang kamu kerjakan, dan apa yang kamu suka.
          </p>
        </header>

        <div className="space-y-4">
          <p>
            Ganti teks ini dengan cerita lengkapmu: bagaimana kamu mulai
            berkecimpung di dunia pengembangan web, tools yang biasa kamu pakai
            sehari-hari, dan jenis project yang paling menarik bagimu. Tambahkan
            angka pencapaian bila ada, misalnya jumlah project, tahun pengalaman,
            atau skala pengguna.
          </p>
        </div>

        <section aria-labelledby="skills-heading" className="space-y-4">
          <p className="readout">
            <span className="lbl">data</span>
            {"// SYSTEM.PROFICIENCY"}
          </p>
          <h2 id="skills-heading">Keahlian</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {skills.map((skill) => (
              <li key={skill.name} className="card">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium text-[var(--text-h)]">
                    {skill.name}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-xs" style={{ color: "var(--text-muted)" }}>
                    {skill.level}%
                  </span>
                </div>
                <div
                  className="mt-3 h-2 overflow-hidden rounded-full border"
                  style={{ background: "var(--surface-soft)", borderColor: "var(--border)" }}
                >
                  <div
                    className="h-full rounded-full transition-[width] duration-700"
                    style={{
                      background: "var(--accent)",
                      width: `${skill.level}%`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="timeline-heading" className="space-y-4">
          <p className="readout">
            <span className="lbl">log</span>
            {"// MISSION.HISTORY"}
          </p>
          <h2 id="timeline-heading">Pengalaman</h2>
          <ol className="relative space-y-6 border-l pl-6" style={{ borderColor: "var(--border)" }}>
            {timeline.map((item) => (
              <li key={item.period} className="relative">
                <span
                  className="absolute -left-[34px] top-1.5 h-3 w-3 rounded-full border-2"
                  style={{
                    background: "var(--accent)",
                    borderColor: "var(--bg)",
                    boxShadow: "0 0 0 2px var(--accent-border)",
                  }}
                />
                <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em]" style={{ color: "var(--accent)" }}>
                  {item.period}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-[var(--text-h)]">
                  {item.role} — {item.org}
                </h3>
                <p className="mt-1">{item.note}</p>
              </li>
            ))}
          </ol>
        </section>
      </section>
    </>
  )
}