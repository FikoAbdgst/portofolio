"use client"

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react"
import { siteConfig } from "@/src/site.config"

const SOCIALS = [
  { label: "LinkedIn", href: siteConfig.socials.linkedin },
  { label: "GitHub", href: siteConfig.socials.github },
  { label: "Email", href: `mailto:${siteConfig.email}` },
] as const

const MAGNET_RADIUS = 70
const MAGNET_PULL = 6

/** Pembungkus magnetik ringan untuk pill: tarikan maksimal 6px, mati di reduced-motion. */
function MagneticPull({ children }: { children: ReactNode }) {
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
    if (d === 0 || d >= MAGNET_RADIUS) return
    const m = (1 - d / MAGNET_RADIUS) * MAGNET_PULL
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
      className="magnet-wrap hero-scroll-magnet"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}

export function HeroBottomBar() {
  return (
    <div className="hero-bar">
      <div className="container">
        <div className="hero-bar__rule" />
        <div
          className="hero-bar__row fade-up"
          style={{ animationDelay: "0.8s" }}
        >
          <ul className="hero-socials">
            {SOCIALS.map((item) => {
              const external = item.href.startsWith("http")
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hero-social"
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    {item.label}
                    <svg
                      aria-hidden="true"
                      className="hero-social__arrow"
                      viewBox="0 0 16 16"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 11 11 5M6.5 5H11v4.5" />
                    </svg>
                  </a>
                </li>
              )
            })}
          </ul>

          <MagneticPull>
            <a
              href="#contact"
              data-cursor-label=""
              className="hero-scroll-pill"
            >
              Contact Us
              <span aria-hidden="true" className="hero-scroll-pill__arrow">
                &rarr;
              </span>
            </a>
          </MagneticPull>
        </div>
      </div>
    </div>
  )
}
