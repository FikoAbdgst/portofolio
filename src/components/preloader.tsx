"use client"

import { useEffect, useRef, useState } from "react"

/** Lantai waktu: angka tidak boleh merayap terlalu singkat. */
const MIN_MS = 700
/** Batas keras: font yang menggantung tidak boleh memblokir situs. */
const MAX_MS = 3000
/** Kecepatan merayap menuju 92% sebelum semua benar-benar siap. */
const RAMP_MS = 1400
/** Tween terakhir ke 100: melambat, bukan merambat ke asymptotically. */
const FINAL_MS = 520
/** Jeda di angka 100 sebelum halaman dibuka. */
const HOLD_MS = 850
/** Lama plate lift (harus sinkron dengan CSS .preloader). */
const EXIT_MS = 900

/**
 * Plate pembuka: satu angka 000→100 di tengah yang mengikuti kesiapan
 * sungguhan (font + event load), ditahan sebentar di 100, lalu plate terangkat
 * membuka halaman pada posisi teratas. Plate di-render di server supaya
 * langsung tampil tanpa flash; ada failsafe CSS bila JS tidak pernah jalan.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    const doc = document.documentElement

    // Selalu buka di puncak halaman, apa pun yang dipulihkan browser.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual"
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior })

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduced || !root) return

    doc.classList.add("is-preloading")

    let fontsReady = false
    let pageReady = document.readyState === "complete"
    document.fonts?.ready.then(() => {
      fontsReady = true
    })
    const onLoad = () => {
      pageReady = true
    }
    window.addEventListener("load", onLoad, { once: true })

    const t0 = performance.now()
    let raf = 0
    let shown = 0
    let last = t0
    let printed = -1
    let readyAt = 0
    let readyFrom = 0
    let finished = false

    const finish = () => {
      if (finished) return
      finished = true
      cancelAnimationFrame(raf)
      window.removeEventListener("load", onLoad)
      doc.classList.remove("is-preloading")
      // Apa pun yang bergeser selama load, halaman tetap terbuka di atas.
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior })
      root.dataset.state = "done"
      window.setTimeout(() => setGone(true), EXIT_MS + 40)
    }

    const tick = (now: number) => {
      const elapsed = now - t0
      // Clamp lonjakan waktu (tabswitch) agar animasi tidak meloncat.
      const dt = Math.min(64, now - last)
      last = now

      const isReady = (fontsReady && pageReady) || elapsed > MAX_MS
      const ready = isReady && elapsed >= MIN_MS
      if (ready && readyAt === 0) {
        readyAt = now
        readyFrom = shown
      }

      if (!ready) {
        // Ramp ease-in-out, dismoothed dengan faktor bebas-framerate.
        const p = Math.min(1, elapsed / RAMP_MS)
        const eased = p * p * (3 - 2 * p)
        const target = eased * 92
        const k = 1 - Math.pow(1 - 0.14, dt / 16.667)
        shown += (target - shown) * k
      } else {
        // Tween easeOutCubic ke tepat 100.
        const t = Math.min(1, (now - readyAt) / FINAL_MS)
        shown = readyFrom + (100 - readyFrom) * (1 - Math.pow(1 - t, 3))
      }

      const value = Math.min(100, Math.round(shown))
      if (value !== printed) {
        printed = value
        if (countRef.current) {
          countRef.current.textContent = String(value).padStart(3, "0")
        }
        if (value === 100) root.dataset.phase = "ready"
      }

      // Jeda di 100 dulu, baru lift.
      if (ready && now - readyAt >= FINAL_MS + HOLD_MS) finish()
      else raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("load", onLoad)
      doc.classList.remove("is-preloading")
    }
  }, [])

  if (gone) return null

  return (
    <div ref={rootRef} className="preloader" aria-hidden="true">
      <div className="page-grain preloader__grain" />
      <span ref={countRef} className="preloader__count">
        000
      </span>
    </div>
  )
}
