import type { Metadata } from "next"
import { siteConfig } from "@/src/site.config"
import { JsonLd } from "@/src/components/json-ld"

export const metadata: Metadata = {
  title: "Kontak",
  description: `Hubungi ${siteConfig.name} — ${siteConfig.jobTitle}. Tersedia untuk kolaborasi, freelance, atau sekadar berkenalan.`,
  alternates: { canonical: `${siteConfig.url}/contact/` },
  openGraph: {
    title: `Kontak | ${siteConfig.name}`,
    description: `Hubungi ${siteConfig.name}.`,
    url: `${siteConfig.url}/contact/`,
  },
}

const socials = [
  {
    label: "GitHub",
    href: siteConfig.socials.github,
    note: "Kode sumber & open source",
  },
  {
    label: "LinkedIn",
    href: siteConfig.socials.linkedin,
    note: "Profil profesional",
  },
  {
    label: "Twitter / X",
    href: siteConfig.socials.twitter,
    note: "Update harian",
  },
]

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Kontak ${siteConfig.name}`,
    url: `${siteConfig.url}/contact/`,
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="max-w-3xl space-y-8">
        <header className="space-y-3">
          <p className="readout">
            <span className="lbl">comms</span>
            {"// UPLINK"}
          </p>
          <h1>Kontak</h1>
          <p className="text-lg" style={{ color: "var(--text-h)" }}>
            Punya proyek, ide kolaborasi, atau sekadar mau menyapa? Silakan
            hubungi saya.
          </p>
        </header>

        <div className="card">
          <h2 className="text-lg">Email</h2>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-1 block text-xl font-medium no-underline"
          >
            {siteConfig.email}
          </a>
        </div>

        <section aria-labelledby="socials-heading" className="space-y-4">
          <h2 id="socials-heading">Media Sosial</h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {socials.map((social) => (
              <li key={social.label} className="card">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline"
                >
                  <h3 className="text-lg font-semibold text-[var(--text-h)]">
                    {social.label}
                  </h3>
                  <p className="mt-1 text-sm">{social.note}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </>
  )
}