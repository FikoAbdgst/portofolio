"use client"

import { useEffect, useRef } from "react"

/**
 * Satu IntersectionObserver untuk seluruh `[data-reveal]` di dalam container:
 * saat container masuk viewport semua elemen revealed sekali, stagger diambil
 * dari `transitionDelay` inline masing-masing elemen.
 */
export function useRevealGroup<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
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

  return ref
}
