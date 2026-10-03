"use client"

import type { MouseEvent } from "react"
import Image from "next/image"
import { FaLinkedin } from "react-icons/fa"
import { siteConfig } from "@/src/site.config"
import { useRevealGroup } from "@/src/components/use-reveal-group"

const PROFILE_IMAGE = "/img/profile.jpg"
const PROFILE_HANDLE = "@fikoabdgst"
const STUDY = "Informatics Engineering"

export function AboutSection() {
  const ref = useRevealGroup<HTMLElement>()

  // Pakai anchor #contact; fallback mailto kalau section contact tidak ada.
  const onContact = (e: MouseEvent<HTMLAnchorElement>) => {
    if (document.getElementById("contact")) return
    e.preventDefault()
    window.location.href = `mailto:${siteConfig.email}`
  }

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="about"
      ref={ref}
    >
      <div className="container about__grid">
        <div className="about__media about-reveal" data-reveal>
          <div className="about-card" data-cursor-hover>
            <Image
              src={PROFILE_IMAGE}
              alt={`${siteConfig.name}, ${STUDY}`}
              width={900}
              height={1125}
              sizes="(max-width: 1023px) 340px, 400px"
              className="about-card__img"
            />

            <span aria-hidden="true" className="about-card__scrim about-card__scrim--top" />
            <span aria-hidden="true" className="about-card__scrim about-card__scrim--bottom" />

            <div className="about-card__name">
              <p className="about-card__title">{siteConfig.name}</p>
              <p className="about-card__role">{STUDY}</p>
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
                Contact Me
              </a>
            </div>
          </div>
        </div>

        <div
          className="about__body about-reveal"
          data-reveal
          style={{ transitionDelay: "80ms" }}
        >
          <p className="about-label">
            <span className="about-label__spark" aria-hidden="true">
              ✦
            </span>
            About Me
          </p>

          <h2 id="about-heading" className="about-title">
            A full-stack developer &amp;{" "}
            <span className="about-title__accent">
              builder of fast, accessible web.
            </span>
          </h2>

          <p className="about-text">
            Full-Stack Engineer yang menguasai ekosistem web modern, termasuk
            React.js, Vue.js, Laravel, dan Node.js. Terampil merancang
            arsitektur perangkat lunak yang terstruktur, troubleshooting,
            debugging, dan optimasi performa aplikasi web. Berpengalaman membuat
            antarmuka responsif dan user-friendly dengan Tailwind CSS, dan
            terbuka untuk peluang di lingkungan kerja yang inovatif.
          </p>

          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="about-linkedin"
          >
            <FaLinkedin aria-hidden="true" className="about-linkedin__icon" />
            Connect LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
