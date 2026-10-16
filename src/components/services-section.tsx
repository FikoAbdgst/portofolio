"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/src/projects"
import { techRow1, techRow2 } from "@/src/tech-stack"
import { services } from "@/src/services"
import { serviceDescEn, useLang } from "@/src/i18n"
import { Tagline } from "@/src/components/ui/Tagline"
import { useCountUp } from "@/src/components/use-count-up"
import { useRevealGroup } from "@/src/components/use-reveal-group"

function Stat({
  value,
  label,
  started,
  delay,
}: {
  value: number
  label: string
  started: boolean
  delay: number
}) {
  const current = useCountUp(value, started)
  return (
    <div
      data-reveal
      className="services-reveal services-stat"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="services-stat__number">
        {current}
        <span aria-hidden="true" className="services-stat__plus">
          +
        </span>
      </p>
      <p className="services-stat__label">{label}</p>
    </div>
  )
}

export function ServicesSection() {
  const ref = useRevealGroup<HTMLElement>()
  const [statsStarted, setStatsStarted] = useState(false)
  const { lang, t } = useLang()

  useEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setStatsStarted(true))
      return () => cancelAnimationFrame(raf)
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        setStatsStarted(true)
        io.disconnect()
      },
      { threshold: 0.12 },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [ref])

  const stats = [
    { label: t.services.statProjects, value: projects.length || 8 },
    { label: t.services.statYears, value: new Date().getFullYear() - 2021 },
    {
      label: t.services.statStack,
      value: techRow1.length + techRow2.length,
    },
  ]

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="services"
      ref={ref}
    >
      <div className="container services__grid">
        <div className="services__intro">
          <div data-reveal className="services-reveal">
            <span style={{ ["--tag-icon" as string]: "#22d3ee" }}>
              <Tagline className="about-label">{t.services.tagline}</Tagline>
            </span>
          </div>
          <h2
            id="services-heading"
            data-reveal
            className="services-reveal services-title"
            style={{ transitionDelay: "80ms" }}
          >
            {t.services.titleA}
            <br aria-hidden="true" className="services-title__break" />{" "}
            <span className="services-title__accent">{t.services.titleB}</span>
          </h2>
          <p
            data-reveal
            className="services-reveal services-text"
            style={{ transitionDelay: "160ms" }}
          >
            {t.services.intro}
          </p>

          <div className="services-stats">
            {stats.map((stat, index) => (
              <Stat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                started={statsStarted}
                delay={240 + index * 80}
              />
            ))}
          </div>

          <div
            data-reveal
            className="services-reveal"
            style={{ transitionDelay: "480ms" }}
          >
            <a href="#contact" data-cursor-hover className="services-cta">
              {t.services.cta}
              <ArrowUpRight
                aria-hidden="true"
                size={20}
                strokeWidth={2}
                className="services-cta__icon"
              />
            </a>
          </div>
        </div>

        <ul className="services-cards">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <li
                key={service.slug}
                data-reveal
                className="services-reveal"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <article data-cursor-hover className="services-card">
                  <Icon
                    aria-hidden="true"
                    size={26}
                    strokeWidth={1.75}
                    className="services-card__icon"
                  />
                  <div className="services-card__body">
                    <h3 className="services-card__title">{service.title}</h3>
                    <p className="services-card__desc">
                      {lang === "en"
                        ? (serviceDescEn[service.slug] ?? service.description)
                        : service.description}
                    </p>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
