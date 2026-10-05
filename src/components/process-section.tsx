"use client"

import { useEffect, useRef } from "react"
import { processSteps } from "@/src/process"
import { Tagline } from "@/src/components/ui/Tagline"
import { ScrollMarqueeRows } from "@/src/components/scroll-marquee-rows"

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = Array.from(
      root.querySelectorAll<HTMLElement>(".process-reveal"),
    )
    if (targets.length === 0) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((el) => el.classList.add("is-in"))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        targets.forEach((el) => el.classList.add("is-in"))
        io.disconnect()
      },
      { threshold: 0.12 },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="process"
      ref={ref}
    >
      <ScrollMarqueeRows rows={["DESIGN PROCESS", "STEPS I FOLLOW"]} />

      <div className="container process-front">
        <div className="process-reveal process-head">
          <Tagline className="process-label">Process</Tagline>
          <h2 id="process-heading" className="process-title">
            How I Work
          </h2>
        </div>

        <div className="process-grid">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <article
                key={step.slug}
                data-cursor-hover
                className="process-reveal process-card"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="process-icon">
                  <Icon aria-hidden="true" size={24} strokeWidth={1.8} />
                </div>
                <div className="process-card__body">
                  <p className="process-number">{step.number}</p>
                  <h3 className="process-card__title">{step.title}</h3>
                  <p className="process-card__desc">{step.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
