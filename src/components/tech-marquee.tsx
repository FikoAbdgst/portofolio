"use client"

import { useEffect, useRef } from "react"
import type { TechItem } from "@/src/tech-stack"
import { techRow1, techRow2 } from "@/src/tech-stack"

function Pill({ item }: { item: TechItem }) {
  const Icon = item.icon
  return (
    <li className="tech-pill" style={{ color: item.color ?? "#E8EEF8" }}>
      <Icon aria-hidden="true" className="tech-pill-icon" />
      <span className="tech-pill-label">{item.name}</span>
    </li>
  )
}

function Row({
  items,
  reverse,
  label,
}: {
  items: TechItem[]
  reverse?: boolean
  label: string
}) {
  return (
    <div className="tech-marquee" role="presentation">
      <div className={`tech-track${reverse ? " tech-track--reverse" : ""}`}>
        <div className="tech-track__inner">
          {[0, 1, 2, 3].map((half) => (
            <ul
              key={half}
              aria-hidden={half !== 0}
              className="tech-group"
            >
              {items.map((item) => (
                <Pill key={`${half}-${item.name}`} item={item} />
              ))}
            </ul>
          ))}
        </div>
      </div>
      <span className="sr-only">{label}</span>
    </div>
  )
}

export function TechMarquee() {
  const sectionRef = useRef<HTMLElement>(null)
  const items = [...techRow1, ...techRow2]

  // Hentikan animasi marquee saat section jauh dari viewport: compositor
  // tidak perlu menghitung puluhan pill yang tidak terlihat selama scroll.
  // Ditulis langsung ke dataset agar tidak memicu re-render 70+ pill.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        el.dataset.paused = entry.isIntersecting ? "false" : "true"
      },
      { rootMargin: "160px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Hover = melambat mulus, bukan berhenti mendadak. playbackRate di kedua
  // lapisan marquee di-ease per frame (Web Animations API) supaya laju turun
  // perlahan. Hanya rAF pendek saat transisi; setelah konvergen loop berhenti.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const tracks = Array.from(
      el.querySelectorAll<HTMLElement>(".tech-track, .tech-track__inner"),
    )
    if (tracks.length === 0) return

    const SLOW = 0.4
    const EASE = 0.12
    let targetRate = 1
    let rate = 1
    let raf = 0
    let running = false

    const apply = (value: number) => {
      for (const track of tracks) {
        for (const anim of track.getAnimations()) anim.playbackRate = value
      }
    }

    const tick = () => {
      const diff = targetRate - rate
      if (Math.abs(diff) < 0.004) {
        rate = targetRate
        apply(rate)
        running = false
        raf = 0
        return
      }
      rate += diff * EASE
      apply(rate)
      raf = requestAnimationFrame(tick)
    }

    const kick = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(tick)
    }

    const onEnter = () => {
      targetRate = SLOW
      kick()
    }
    const onLeave = () => {
      targetRate = 1
      kick()
    }

    el.addEventListener("pointerenter", onEnter)
    el.addEventListener("pointerleave", onLeave)

    return () => {
      el.removeEventListener("pointerenter", onEnter)
      el.removeEventListener("pointerleave", onLeave)
      cancelAnimationFrame(raf)
      apply(1)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Tech Stack"
      className="tech-section"
      data-paused="false"
    >
      <div className="fade-up tech-rows" style={{ animationDelay: "0.15s" }}>
        <Row
          items={items}
          label="Tech stack: React, Next.js, Vue.js, TypeScript, Tailwind CSS, Inertia.js, Vite, Pinia, Axios, Blade, Laravel, Node.js, Express.js, MySQL, PostgreSQL, Docker, Java, Python."
        />
      </div>
    </section>
  )
}
