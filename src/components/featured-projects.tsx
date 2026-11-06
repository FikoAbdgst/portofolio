"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useEffect, useRef } from "react"
import { useLang } from "@/src/i18n"
import { Tagline } from "@/src/components/ui/Tagline"
import { useRevealGroup } from "@/src/components/use-reveal-group"

type Showcase = {
  slug: string
  title: string
  href: string
  image: string
  alt: string
  meta: string
  description: { id: string; en: string }
}

/** Urutan tumpukan: Panori paling depan, jadi keluar pertama saat scroll. */
const SHOWCASE: Showcase[] = [
  {
    slug: "panoricam",
    title: "Panoricam",
    href: "https://panoricam.vercel.app/",
    image: "/panoricam.png",
    alt: "Tampilan beranda Panoricam",
    meta: "Laravel · 2025",
    description: {
      id: "Photobooth berbasis web yang dipakai di acara kampus STMIK Mardira Indonesia, lahir sebagai solusi tugas akhir berorientasi bisnis.",
      en: "A web-based photobooth used at STMIK Mardira Indonesia campus events, built as a business-oriented final project.",
    },
  },
  {
    slug: "alvaro-mobil",
    title: "Alvaro Mobil",
    href: "https://www.alvaromobil.com/",
    image: "/alvaro.png",
    alt: "Tampilan beranda Alvaro Mobil",
    meta: "Showroom mobil · Bandung",
    description: {
      id: "Situs showroom mobil di Bandung: katalog unit pilihan, jam operasional, testimoni, dan jalur kontak langsung.",
      en: "A car showroom site in Bandung: a curated unit catalog, opening hours, testimonials, and a direct contact path.",
    },
  },
  {
    slug: "rifera-management",
    title: "Rifera Management",
    href: "https://riferamanagement.com/",
    image: "/riferamanagement.png",
    alt: "Tampilan beranda Rifera Management",
    meta: "Next.js · 2026",
    description: {
      id: "Company profile agensi talent dan influencer, memuat katalog talent serta brand yang bekerja sama.",
      en: "A company profile for a talent and influencer agency, with its talent catalog and partner brands.",
    },
  },
]

export function FeaturedProjects() {
  const ref = useRevealGroup<HTMLElement>()
  const deckRef = useRef<HTMLDivElement>(null)
  const { lang, t } = useLang()

  // Tumpukan kartu: satu kartu terangkat keluar tiap satu langkah scroll.
  // Hanya transform yang ditulis, dan hanya saat deck di layar.
  useEffect(() => {
    const deck = deckRef.current
    if (!deck) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const stage = deck.querySelector<HTMLElement>(".proj-deck__stage")
    const cards = Array.from(deck.querySelectorAll<HTMLElement>(".ps-card"))
    if (!stage || cards.length === 0) return

    const count = cards.length
    let stageHeight = stage.offsetHeight
    let raf = 0
    let ticking = false
    let near = false

    const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

    const apply = () => {
      ticking = false
      if (!near) return
      const rect = deck.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return

      const stickyTop = window.innerHeight * 0.13
      const travel = Math.max(1, rect.height - stageHeight)
      const raw = clamp01((stickyTop - rect.top) / travel)
      const progress = raw * (count - 1)

      cards.forEach((card, index) => {
        const behind = Math.max(0, index - progress)
        const exit = clamp01(progress - index)
        // Kartu yang keluar naik keluar dari stack. Tanpa fade: kartu tetap
        // solid sampai benar-benar pergi, jadi scroll terasa lebih jernih.
        card.style.transform =
          `translate3d(0, calc(${(-exit * 130).toFixed(2)}% + ${(behind * 18).toFixed(2)}px), 0) ` +
          `scale(${(1 - behind * 0.04 - exit * 0.04).toFixed(3)}) ` +
          `rotate(${(-exit * 3).toFixed(2)}deg)`
      })
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      raf = requestAnimationFrame(apply)
    }

    const onResize = () => {
      stageHeight = stage.offsetHeight
      onScroll()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting
        if (near) onScroll()
      },
      { rootMargin: "200px 0px" },
    )
    io.observe(deck)

    apply()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="proj-stack mt-16 scroll-mt-28"
      ref={ref}
    >
      <div
        data-reveal
        className="proj-reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <Tagline className="about-label">{t.projects.tagline}</Tagline>
          <h2
            id="projects-heading"
            className="mt-4 font-[family-name:var(--font-display)] text-[clamp(44px,6vw,84px)] leading-[1.05] font-semibold text-[#E8EEF8]"
          >
            {t.projects.title}
          </h2>
        </div>
        <p
          data-reveal
          className="proj-reveal max-w-sm font-[family-name:var(--font-sans)] text-base leading-relaxed text-[#9AA9C4] md:pb-2 md:text-right"
          style={{ transitionDelay: "80ms" }}
        >
          {t.projects.desc}
        </p>
      </div>

      <div className="proj-deck" ref={deckRef}>
        <div className="proj-deck__stage">
          <div className="proj-deck__stack">
            {SHOWCASE.map((item, index) => (
              <a
                key={item.slug}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label={`${item.title}: ${t.projects.visit}`}
                className="ps-card"
                style={{
                  zIndex: SHOWCASE.length - index,
                  transform: `translate3d(0, ${index * 18}px, 0) scale(${1 - index * 0.04})`,
                }}
              >
                <span className="ps-card__media">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 1000px"
                    className="ps-card__img"
                  />
                  <span aria-hidden="true" className="ps-card__media-shade" />
                  <span className="ps-card__count">
                    {String(index + 1).padStart(2, "0")}
                    <span aria-hidden="true"> / </span>
                    {String(SHOWCASE.length).padStart(2, "0")}
                  </span>
                </span>

                <span className="ps-card__body">
                  <span className="ps-card__copy">
                    <span className="ps-card__meta">{item.meta}</span>
                    <span className="ps-card__title">{item.title}</span>
                    <span className="ps-card__desc">
                      {item.description[lang]}
                    </span>
                  </span>
                  <span className="ps-card__cta">
                    {t.projects.visit}
                    <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2} />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div data-reveal className="proj-reveal mt-12 text-center">
        <Link
          href="/projects"
          data-cursor-hover
          className="about-linkedin"
          style={{ marginTop: 0 }}
        >
          {t.projects.viewAll}
          <ArrowRight aria-hidden="true" size={20} strokeWidth={2} />
        </Link>
      </div>
    </section>
  )
}
