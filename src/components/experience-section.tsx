"use client"

import { useEffect } from "react"
import Image from "next/image"
import { experience, initialsOf } from "@/src/experience"
import { useRevealGroup } from "@/src/components/use-reveal-group"


export function ExperienceSection() {
  const ref = useRevealGroup<HTMLElement>()

  // Gradien garis timeline mengikuti progress scroll di dalam section.
  useEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let ticking = false
    const update = () => {
      ticking = false
      const rect = root.getBoundingClientRect()
      if (rect.height === 0) return
      const passed = Math.min(
        Math.max(window.innerHeight * 0.5 - rect.top, 0),
        rect.height,
      )
      root.style.setProperty(
        "--exp-progress",
        `${Math.round((passed / rect.height) * 100)}%`,
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
  }, [ref])

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="exp"
      ref={ref}
    >
      <div className="container exp__grid">
        <div className="exp__intro exp-reveal" data-reveal>
          <p className="about-label">
            <span className="about-label__spark" aria-hidden="true">
              ✦
            </span>
            Work History
          </p>
          <h2 id="experience-heading" className="exp-title">
            Experience
          </h2>
          <p className="exp-subtitle">
            Perjalanan profesional dan peran-peran utama saya di industri
            teknologi.
          </p>
        </div>

        <div className="exp-timeline">
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
                              <Image
                                src={item.logo}
                                alt=""
                                width={56}
                                height={56}
                              />
                            ) : (
                              initialsOf(item.company)
                            )}
                          </span>
                          <span className="exp-item__company">
                            {item.company}
                          </span>
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
                        <span className="exp-item__location">
                          {item.location}
                        </span>
                      </div>
                    </div>

                    <ul className="exp-item__bullets">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
