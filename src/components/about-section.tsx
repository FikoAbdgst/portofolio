"use client"

import type { MouseEvent } from "react"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { FaLinkedin } from "react-icons/fa"
import { siteConfig } from "@/src/site.config"
import { useLang } from "@/src/i18n"
import { Tagline } from "@/src/components/ui/Tagline"
import { TechMarquee } from "@/src/components/tech-marquee"
import { useRevealGroup } from "@/src/components/use-reveal-group"

const PROFILE_IMAGE = "/img/profile.jpg"
const PROFILE_HANDLE = "@fikoabdgst"

export function AboutSection() {
  const { t } = useLang()
  const ref = useRevealGroup<HTMLElement>()
  const tiltRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const target = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 })
  const current = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 })

  // 3D tilt: lerp rotation + glare biar gerakannya buttery, bukan patah-patah.
  useEffect(() => {
    const tilt = tiltRef.current
    const card = cardRef.current
    if (!tilt || !card) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return

    const render = () => {
      const c = current.current
      const t = target.current
      c.rx += (t.rx - c.rx) * 0.12
      c.ry += (t.ry - c.ry) * 0.12
      c.gx += (t.gx - c.gx) * 0.12
      c.gy += (t.gy - c.gy) * 0.12

      card.style.transform =
        `rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg) translateZ(0)`
      card.style.setProperty("--mx", `${c.gx.toFixed(1)}%`)
      card.style.setProperty("--my", `${c.gy.toFixed(1)}%`)
      // Intensitas glare mengikuti jarak dari tengah.
      const dist = Math.min(
        1,
        Math.hypot(t.rx, t.ry) / 14
      )
      card.style.setProperty("--glare", (0.25 + dist * 0.75).toFixed(2))

      rafRef.current = requestAnimationFrame(render)
    }
    rafRef.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Pakai anchor #contact; fallback mailto kalau section contact tidak ada.
  const onContact = (e: MouseEvent<HTMLAnchorElement>) => {
    if (document.getElementById("contact")) return
    e.preventDefault()
    window.location.href = `mailto:${siteConfig.email}`
  }

  const onTiltMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current
    if (!el) return
    // Nonaktif di layar sentuh / kecil biar tidak ganggu scroll.
    if (window.matchMedia("(hover: none)").matches) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    target.current = {
      rx: -py * 14,
      ry: px * 16,
      gx: (px + 0.5) * 100,
      gy: (py + 0.5) * 100,
    }
    el.classList.add("is-tilting")
  }

  const onTiltLeave = () => {
    target.current = { rx: 0, ry: 0, gx: 50, gy: 50 }
    tiltRef.current?.classList.remove("is-tilting")
  }

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="about"
      ref={ref}
    >
      <TechMarquee />
      <div className="container about__grid">
        <div className="about__media about-reveal" data-reveal>
          <div
            ref={tiltRef}
            className="about-tilt"
            onMouseMove={onTiltMove}
            onMouseLeave={onTiltLeave}
          >
          <div ref={cardRef} className="about-card" data-cursor-hover>
            <span aria-hidden="true" className="about-card__edge" />
            <Image
              src={PROFILE_IMAGE}
              alt={`${siteConfig.name}, ${t.about.study}`}
              width={900}
              height={1125}
              sizes="(max-width: 1023px) 340px, 400px"
              className="about-card__img"
            />

            <span aria-hidden="true" className="about-card__scrim about-card__scrim--top" />
            <span aria-hidden="true" className="about-card__scrim about-card__scrim--bottom" />

            <div className="about-card__name">
              <p className="about-card__title">{siteConfig.name}</p>
              <p className="about-card__role">{t.about.study}</p>
            </div>

            <div className="about-card__glass">
              <Image
                src={PROFILE_IMAGE}
                alt=""
                width={48}
                height={48}
                className="about-card__avatar"
              />
              <div className="about-card__id">
                <p className="about-card__handle">{PROFILE_HANDLE}</p>
                <p className="about-card__presence">
                  <span className="status-dot" aria-hidden="true" />
                  Online
                </p>
              </div>
              <a
                href="#contact"
                onClick={onContact}
                data-cursor-label=""
                className="about-card__cta"
              >
                {t.about.cta}
              </a>
            </div>

            <span aria-hidden="true" className="about-card__glare" />
            <span aria-hidden="true" className="about-card__shine" />
          </div>
          </div>
        </div>

        <div
          className="about__body about-reveal"
          data-reveal
          style={{ transitionDelay: "80ms" }}
        >
          <Tagline className="about-label">{t.about.tagline}</Tagline>

          <h2 id="about-heading" className="about-title">
            {t.about.titleA}{" "}
            <span className="about-title__accent">
              {t.about.titleB}
            </span>
          </h2>

          <p className="about-text">
            {t.about.body}
          </p>

          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="about-linkedin"
          >
            <FaLinkedin aria-hidden="true" className="about-linkedin__icon" />
            {t.about.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
