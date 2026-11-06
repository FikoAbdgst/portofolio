"use client"

import { useEffect } from "react"

/**
 * Fokus section: section yang paling banyak terlihat tetap tajam, section lain
 * diredupkan (class `is-dim`). Section panjang yang masih memenuhi layar
 * (seperti deck proyek) tetap fokus sampai benar-benar pergi.
 * Hanya jalan di landing (`.landing-content`) dan nonaktif total saat
 * prefers-reduced-motion.
 */
export function SectionFocus() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const root = document.querySelector(".landing-content")
    if (!root) return
    // Marquee stack nested di hero, jadi tetap tajam saat hero sedang fokus.
    const sections = (Array.from(
      root.querySelectorAll("section"),
    ) as HTMLElement[]).filter((el) => !el.parentElement?.closest("section"))
    if (sections.length === 0) return

    let current: HTMLElement | null = null

    const pick = (): HTMLElement | null => {
      const vh = window.innerHeight
      let best: HTMLElement | null = null
      let bestVisible = 0
      for (const el of sections) {
        const r = el.getBoundingClientRect()
        // Section terlihat paling banyak menang. Ini menjaga section panjang
        // (mis. deck proyek yang sticky) tetap fokus selama masih di layar.
        const visible =
          Math.min(r.bottom, vh) - Math.max(r.top, 0)
        if (visible > bestVisible) {
          bestVisible = visible
          best = el
        }
      }
      return best
    }

    const apply = () => {
      const focused = pick() ?? current
      if (!focused || focused === current) return
      current = focused
      for (const el of sections) el.classList.toggle("is-dim", el !== focused)
    }

    const observer = new IntersectionObserver(apply, {
      threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    })
    sections.forEach((el) => observer.observe(el))
    apply()
    return () => observer.disconnect()
  }, [])

  return null
}
