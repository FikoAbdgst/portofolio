"use client"

import { useEffect } from "react"

/**
 * Fokus section: section yang sedang menempati pita tengah viewport tetap
 * tajam, section lain diburamkan + diredupkan (class `is-dim`).
 * Hanya jalan di landing (`.landing-content`) dan nonaktif total saat
 * prefers-reduced-motion.
 */
export function SectionFocus() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const root = document.querySelector(".landing-content")
    if (!root) return
    // Semua section kecuali yang bersarang (stack/tech marquee sudah
    // menyatu di dalam #about, jadi fokus about mencakup keduanya).
    const sections = (Array.from(
      root.querySelectorAll("section"),
    ) as HTMLElement[]).filter((el) => !el.parentElement?.closest("section"))
    if (sections.length === 0) return

    let current: HTMLElement | null = null

    const pick = (): HTMLElement | null => {
      const center = window.innerHeight / 2
      let best: HTMLElement | null = null
      let bestDist = Infinity
      for (const el of sections) {
        const r = el.getBoundingClientRect()
        // Hanya kandidat yang menyentuh pita tengah viewport.
        if (r.bottom < window.innerHeight * 0.42) continue
        if (r.top > window.innerHeight * 0.58) continue
        const dist = Math.abs(r.top + r.height / 2 - center)
        if (dist < bestDist) {
          bestDist = dist
          best = el
        }
      }
      return best
    }

    const apply = () => {
      const focused = pick()
      if (focused === current) return
      current = focused
      for (const el of sections) el.classList.toggle("is-dim", el !== focused)
    }

    const observer = new IntersectionObserver(apply, {
      rootMargin: "-42% 0px -42% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    })
    sections.forEach((el) => observer.observe(el))
    apply()
    return () => observer.disconnect()
  }, [])

  return null
}
