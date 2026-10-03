import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/src/site.config"
import { projects, type Project } from "@/src/projects"
import { JsonLd } from "@/src/components/json-ld"
import { Hero, Reveal } from "@/src/components/hero"
import { TechMarquee } from "@/src/components/tech-marquee"
import { AboutSection } from "@/src/components/about-section"
import { ExperienceSection } from "@/src/components/experience-section"
import { EducationSection } from "@/src/components/education-section"

const services = [
  {
    title: "Web Development",
    desc: "Membangun website modern dengan React dan Next.js — cepat, terstruktur, dan mudah dikembangkan.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "UI Implementation",
    desc: "Menerjemahkan desain menjadi antarmuka responsif dan aksesibel yang nyaman dipakai di semua perangkat.",
    tags: ["Tailwind CSS", "Responsif", "A11y"],
  },
  {
    title: "SEO & Performance",
    desc: "Optimasi performa, metadata, dan struktur halaman agar website mudah ditemukan dan cepat dibuka.",
    tags: ["SEO", "Core Web Vitals"],
  },
]

const socials = [
  { label: "GitHub", href: siteConfig.socials.github, note: "Kode sumber & open source" },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, note: "Profil profesional" },
  { label: "Twitter / X", href: siteConfig.socials.twitter, note: "Update harian" },
]

/** Pemisah antar-section senada tema: garis cahaya tipis + titik pendaran. */
function SectionDivider() {
  return (
    <div aria-hidden="true" className="mx-auto mt-24 max-w-6xl">
      <div className="relative" style={{ height: "1px" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            background: "#7dd3fc",
            boxShadow: "0 0 12px 2px rgba(125, 211, 252, 0.6)",
          }}
        />
      </div>
    </div>
  )
}

/** Kepala section: watermark raksasa + readout + heading. */
function SectionHeading({
  id,
  lbl,
  code,
  title,
  watermark,
}: {
  id: string
  lbl: string
  code: string
  title: string
  watermark: string
}) {
  return (
    <div className="relative">
      <span aria-hidden="true" className="section-watermark">
        {watermark}
      </span>
      <p className="readout relative z-10">
        <span className="lbl">{lbl}</span>
        {code}
      </p>
      <h2 id={id} className="relative z-10 mt-2">
        {title}
      </h2>
    </div>
  )
}

export default function HomePage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.jobTitle,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    address: { "@type": "PostalAddress", addressLocality: siteConfig.location },
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
      siteConfig.socials.twitter,
    ],
    knowsAbout: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  }

  return (
    <>
      <JsonLd data={personJsonLd} />
      <div
        className="midnight-landing -mt-28 md:-mt-32"
        style={{ marginInline: "calc(50% - 50vw)" }}
      >
        <div aria-hidden="true" className="page-grain page-grain--landing" />
        <div className="landing-content">
          <Hero />
          <TechMarquee />
          <AboutSection />
          <ExperienceSection />
          <EducationSection />
          <div className="container">
            <SectionDivider />
      <SectionDivider />
      <Reveal>
      <section id="services" aria-labelledby="services-heading" className="mt-16 scroll-mt-28">
        <SectionHeading id="services-heading" lbl="fn" code="// SERVICES.OFFER" title="Services" watermark="Services" />
        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="card">
              <h3 className="text-xl font-semibold text-[var(--text-h)]">{service.title}</h3>
              <p className="mt-2 text-sm">{service.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      </Reveal>

      <SectionDivider />
      <Reveal>
      <section id="works" aria-labelledby="works-heading" className="mt-16 scroll-mt-28">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionHeading id="works-heading" lbl="db" code="// PROJECT.REGISTRY" title="Works" watermark="Works" />
            <span className="chip">
              {projects.length} proyek
            </span>
          </div>
          <p className="mt-4 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Kumpulan karya yang pernah saya kerjakan. Klik untuk melihat detail,
            teknologi, dan hasilnya.
          </p>
          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            {projects.map((project: Project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}/`}
                className="card group block no-underline"
              >
                <Image
                  src={project.image}
                  alt={project.alt}
                  width={400}
                  height={225}
                  loading="lazy"
                  className="h-44 w-full rounded-xl border object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ borderColor: "var(--border)" }}
                />
                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold text-[var(--text-h)]">
                    {project.title}
                  </h3>
                  <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.1em] text-[var(--text-muted)]">
                    {project.year}
                  </span>
                </div>
                <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <SectionDivider />
      <Reveal>
      <section id="contact" aria-labelledby="contact-heading" className="mt-16 scroll-mt-28">
        <SectionHeading id="contact-heading" lbl="comms" code="// UPLINK" title="Contact" watermark="Contact" />
        <p className="mt-4 max-w-2xl text-lg" style={{ color: "var(--text-h)" }}>
          Punya proyek, ide kolaborasi, atau sekadar mau menyapa? Silakan hubungi saya.
        </p>
        <div className="card mt-6">
          <h3 className="text-lg">Email</h3>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-1 block text-xl font-medium no-underline"
          >
            {siteConfig.email}
          </a>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
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
      </Reveal>
          </div>
        </div>
      </div>
    </>
  )
}
