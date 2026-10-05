"use client"

import { useEffect, useRef, type ReactNode, type MouseEvent } from "react"
import Link from "next/link"
import { siteConfig } from "@/src/site.config"
import { HeroBottomBar } from "@/src/components/hero-bottom-bar"

/** Spotlight lembut 600px mengikuti mouse dengan lerp ~0.08 (khusus hero). */
function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const fine = window.matchMedia("(pointer: fine)").matches
    if (reduced || !fine) return
    const el = ref.current
    if (!el) return

    let tx = window.innerWidth / 2
    let ty = 300
    let sx = tx
    let sy = ty
    let raf = 0

    const loop = () => {
      sx += (tx - sx) * 0.08
      sy += (ty - sy) * 0.08
      el.style.transform = `translate(${sx}px, ${sy}px)`
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      // Koordinat relatif terhadap section hero.
      const rect = el.parentElement?.getBoundingClientRect()
      if (rect) ty = e.clientY - rect.top
    }

    el.style.transform = `translate(${sx}px, ${sy}px)`
    window.addEventListener("pointermove", onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div aria-hidden="true" ref={ref} className="hero-spotlight" />
}

/** Pembungkus magnetik: tertarik ke kursor dalam radius ~80px, maks 8px. */
function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
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
    if (!el) return
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

/** Reveal-on-scroll sekali jalan untuk section di bawah hero. */
export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduced) {
      el.classList.add("is-in")
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add("is-in")
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  )
}

export function Hero() {
  const displayName = siteConfig.name.toUpperCase()
  const nameRef = useRef<HTMLHeadingElement>(null)
  const scrollRef = useRef<HTMLParagraphElement>(null)

  // Parallax nama raksasa 0.15x + SCROLL memudar setelah 80px scroll.
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduced) return
    const h1 = nameRef.current
    const hint = scrollRef.current
    let ticking = false
    const update = () => {
      ticking = false
      const y = window.scrollY
      if (h1)
        h1.style.transform = `translate3d(0, ${(y * 0.15).toFixed(1)}px, 0)`
      if (hint) hint.style.opacity = String(Math.max(0, 1 - y / 80))
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section
      id="top"
      aria-label="Intro"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      <Spotlight />
      <div className="container relative z-10 flex flex-1 flex-col justify-center px-5 pb-10 pt-28 md:px-6 md:pb-14 md:pt-40">
        <div className="hero-top flex flex-wrap items-start justify-between gap-6">
          <p
            className="fade-up max-w-xl font-[family-name:var(--font-sans)] text-base leading-relaxed md:text-lg"
            style={{ color: "#c9d4e3", animationDelay: "0.55s" }}
          >
            Frontend developer yang membangun website cepat, aksesibel, dan
            SEO-friendly.
          </p>

          <div
            className="hero-meta fade-up text-right font-[family-name:var(--font-sans)] text-sm leading-7"
            style={{
              color: "rgba(201, 212, 227, 0.65)",
              animationDelay: "0.7s",
            }}
          >
            <p>Frontend Developer</p>
            <p>
              <span
                className="status-dot mr-2 inline-block align-middle"
                aria-hidden="true"
              />
              Available for work
            </p>
            <p ref={scrollRef} className="tracking-[0.3em] uppercase">
              Scroll
              <span
                aria-hidden="true"
                className="scroll-line ml-3 inline-block h-px w-10 translate-y-[-4px] bg-current"
              />
            </p>
          </div>
        </div>

        <h1
          ref={nameRef}
          data-cursor-name
          aria-label={displayName}
          className="giant-name giant-name--full mt-10"
        >
          {displayName.split("").map((ch, i) => (
            <span key={i} aria-hidden="true" className="giant-mask">
              <span
                className="giant-letter"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {ch === " " ? " " : ch}
              </span>
            </span>
          ))}
        </h1>
      </div>

      <HeroBottomBar />
    </section>
  )
}
