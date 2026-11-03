"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { experience, initialsOf } from "@/src/experience"
import { expBulletsEn, useLang } from "@/src/i18n"
import { Tagline } from "@/src/components/ui/Tagline"
import { useRevealGroup } from "@/src/components/use-reveal-group"

/** Desktop: timeline penuh dengan semua detail terlihat. */
function ExperienceTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { lang } = useLang()

  // Garis timeline terisi mengikuti posisi scroll di dalam section.
  // Pengukuran hanya dilakukan saat section menyentuh viewport supaya
  // scroll di section lain tidak membayar layout read di sini.
  useEffect(() => {
    const root = timelineRef.current
    if (!root) return
    const items = Array.from(root.querySelectorAll<HTMLElement>(".exp-item"))
    const nodes = items.map((item) =>
      item.querySelector<HTMLElement>(".exp-item__node"),
    )

    let ticking = false
    const update = () => {
      ticking = false
      const rect = root.getBoundingClientRect()
      if (rect.height === 0) return
      // Jauh di luar layar: biarkan nilai terakhir, tidak perlu dihitung.
      if (rect.bottom < 0 || rect.top > window.innerHeight) return

      const passed = Math.min(
        Math.max(window.innerHeight * 0.5 - rect.top, 0),
        rect.height,
      )
      root.style.setProperty(
        "--exp-progress",
        `${Math.round((passed / rect.height) * 100)}%`,
      )

      const center = window.innerHeight * 0.5
      let activeIndex = -1
      nodes.forEach((node, index) => {
        if (!node) return
        if (node.getBoundingClientRect().top + node.offsetHeight / 2 <= center) {
          activeIndex = index
        }
      })
      items.forEach((item, index) =>
        item.classList.toggle("is-active", index === activeIndex),
      )
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div className="exp-timeline" ref={timelineRef}>
      <span aria-hidden="true" className="exp-timeline__line" />
      <span aria-hidden="true" className="exp-timeline__fill" />

      <ol className="exp-timeline__list">
        {experience.map((item, i) => (
          <li
            key={item.slug}
            className="exp-item exp-reveal"
            data-reveal
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span aria-hidden="true" className="exp-item__node" />

            <div className="exp-item__card">
              <div className="exp-item__head">
                <div className="exp-item__lead">
                  <h3 className="exp-item__title">{item.role}</h3>

                  <div className="exp-item__org">
                    <span className="exp-item__logo" aria-hidden="true">
                      {item.logo ? (
                        <Image src={item.logo} alt="" width={56} height={56} />
                      ) : (
                        initialsOf(item.company)
                      )}
                    </span>
                    <span className="exp-item__company">{item.company}</span>
                  </div>
                </div>

                <div className="exp-item__meta">
                  <span className="exp-item__period">
                    {item.current && (
                      <span
                        className="status-dot exp-item__live"
                        aria-hidden="true"
                      />
                    )}
                    {item.period}
                  </span>
                  <span className="exp-item__location">{item.location}</span>
                </div>
              </div>

              <ul className="exp-item__bullets">
                {(lang === "en"
                  ? (expBulletsEn[item.slug] ?? item.bullets)
                  : item.bullets
                ).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Mobile: accordion ringkas, satu entri terbuka. */
function ExperienceAccordion() {
  const { lang } = useLang()
  const [open, setOpen] = useState<string>(experience[0]?.slug ?? "")

  const toggle = (slug: string) =>
    setOpen((current) => (current === slug ? "" : slug))

  return (
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
  )
}

export function ExperienceSection() {
  const ref = useRevealGroup<HTMLElement>()
  const { t } = useLang()

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

        <div className="exp-view exp-view--desktop">
          <ExperienceTimeline />
        </div>

        <div className="exp-view exp-view--mobile">
          <ExperienceAccordion />
        </div>
      </div>
    </section>
  )
}
