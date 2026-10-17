"use client"

import { useState } from "react"
import Image from "next/image"
import { experience, initialsOf } from "@/src/experience"
import { expBulletsEn, useLang } from "@/src/i18n"
import { Tagline } from "@/src/components/ui/Tagline"
import { useRevealGroup } from "@/src/components/use-reveal-group"

export function ExperienceSection() {
  const ref = useRevealGroup<HTMLElement>()
  const { lang, t } = useLang()
  // Accordion eksklusif: hanya satu entri terbuka. Item terbaru terbuka awal.
  const [open, setOpen] = useState<string>(experience[0]?.slug ?? "")

  const toggle = (slug: string) =>
    setOpen((current) => (current === slug ? "" : slug))

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="exp"
      ref={ref}
    >
      <div className="container exp__grid">
        <div className="exp__intro exp-reveal" data-reveal>
          <Tagline className="about-label">{t.experience.tagline}</Tagline>
          <h2 id="experience-heading" className="exp-title">
            {t.experience.title}
          </h2>
          <p className="exp-subtitle">{t.experience.subtitle}</p>
        </div>

        <ul className="exp-list">
          {experience.map((item, i) => {
            const isOpen = open === item.slug
            const triggerId = `exp-trigger-${item.slug}`
            const panelId = `exp-panel-${item.slug}`
            const bullets =
              lang === "en" ? (expBulletsEn[item.slug] ?? item.bullets) : item.bullets

            return (
              <li
                key={item.slug}
                className="exp-row exp-reveal"
                data-reveal
                data-open={isOpen}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <h3 className="exp-row__heading">
                  <button
                    type="button"
                    id={triggerId}
                    className="exp-row__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.slug)}
                  >
                    <span className="exp-row__mark" aria-hidden="true">
                      {item.logo ? (
                        <Image src={item.logo} alt="" width={56} height={56} />
                      ) : (
                        initialsOf(item.company)
                      )}
                    </span>

                    <span className="exp-row__main">
                      <span className="exp-row__role">
                        {item.current && (
                          <span
                            className="status-dot exp-row__live"
                            aria-hidden="true"
                          />
                        )}
                        {item.role}
                      </span>
                      <span className="exp-row__company">{item.company}</span>
                    </span>

                    <span className="exp-row__period">{item.period}</span>

                    <span className="exp-row__icon" aria-hidden="true">
                      <svg
                        viewBox="0 0 16 16"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      >
                        <path d="M8 2.5v11M2.5 8h11" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="exp-row__panel"
                >
                  <div className="exp-row__panel-inner">
                    <p className="exp-row__location">{item.location}</p>
                    <ul className="exp-row__bullets">
                      {bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
