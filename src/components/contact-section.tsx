"use client"

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/src/site.config"
import { useRevealGroup } from "@/src/components/use-reveal-group"

const MAILTO = `mailto:${siteConfig.email}?subject=Project%20Inquiry`

/** Pembungkus magnetik ringan untuk tombol CTA, mati di reduced-motion. */
function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
  }, [])

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || reduced.current) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    const d = Math.hypot(dx, dy)
    if (d === 0 || d >= 80) return
    const m = (1 - d / 80) * 8
    el.style.transition = "transform 0.1s ease-out"
    el.style.transform = `translate(${(dx / d) * m}px, ${(dy / d) * m}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el || reduced.current) return
    el.style.transition = "transform 0.3s cubic-bezier(0.2,0.8,0.2,1)"
    el.style.transform = "translate(0, 0)"
  }

  return (
    <div
      ref={ref}
      className="magnet-wrap"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}

export function ContactSection() {
  const ref = useRevealGroup<HTMLElement>()

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="contact"
      ref={ref}
    >
      <div className="container">
        <div className="contact-card" data-reveal>
          <div aria-hidden="true" className="contact-card__glow" />
          <div className="contact-card__inner">
            <p
              className="contact-reveal contact-pill"
              data-reveal
              style={{ transitionDelay: "80ms" }}
            >
              <span className="status-dot" aria-hidden="true" />
              Available for new projects
            </p>
            <h2
              id="contact-heading"
              className="contact-reveal contact-title"
              data-reveal
              style={{ transitionDelay: "160ms" }}
            >
              Let&apos;s work
              <br />
              <span className="contact-title__muted">together.</span>
            </h2>
            <div
              className="contact-reveal"
              data-reveal
              style={{ transitionDelay: "240ms" }}
            >
              <Magnetic>
                <a href={MAILTO} data-cursor-hover className="contact-cta">
                  <span className="contact-cta__label">Start a Project</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={20}
                    strokeWidth={2}
                    className="contact-cta__icon"
                  />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
