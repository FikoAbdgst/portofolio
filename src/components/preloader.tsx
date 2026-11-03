"use client"

import { useEffect, useRef, useState } from "react"

/** Lantai waktu: logo tidak boleh selesai terlalu cepat. */
const MIN_MS = 700
/** Batas keras: font yang menggantung tidak boleh memblokir situs. */
const MAX_MS = 3000
/** Kecepatan merayap menuju 92% sebelum semua benar-benar siap. */
const RAMP_MS = 1400
/** Tween terakhir ke 100: melambat, bukan merambat ke asymptotically. */
const FINAL_MS = 520
/** Jeda di logo penuh sebelum mulai keluar. */
const HOLD_MS = 380
/** Logo naik + memudar lebih dulu. */
const FADE_MS = 440
/** Baru setelah logo selesai memudar, plate layar terangkat membuka halaman. */
const EXIT_DELAY_MS = FADE_MS + 20
/** Lama plate lift (sinkron dengan CSS .preloader[data-state="exit"]). */
const EXIT_MS = 900

/**
 * Plate pembuka: hanya sparkle ✦ yang berdenyut seperti ikon tagline.
 * Terangnya mengikuti kesiapan sungguhan (font + event load), jadi bintang
 * itu sendiri yang berperan sebagai loading. Saat siap, logo memudar ke atas
 * lebih dulu, baru layar bergeser membuka halaman sepersekian detik kemudian.
 * Di-render di server supaya langsung tampil tanpa flash; ada failsafe CSS.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null)
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
    const timers: number[] = []

    const finish = () => {
      if (finished) return
      finished = true
      cancelAnimationFrame(raf)
      window.removeEventListener("load", onLoad)
      root.dataset.state = "done"

      // Logo sudah naik & memudar; baru plate layar mengikuti.
      timers.push(
        window.setTimeout(() => {
          root.dataset.state = "exit"
          doc.classList.remove("is-preloading")
          doc.classList.add("is-ready")
          // Beri tahu hero: plate terangkat, animasi hero boleh jalan.
          window.dispatchEvent(new CustomEvent("preloader:done"))
          // Apa pun yang bergeser selama load, halaman tetap terbuka di atas.
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant" as ScrollBehavior,
          })
        }, EXIT_DELAY_MS),
      )
      timers.push(
        window.setTimeout(() => setGone(true), EXIT_DELAY_MS + EXIT_MS + 40),
      )
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
        root.style.setProperty("--load", String(value / 100))
        if (value === 100) root.dataset.phase = "ready"
      }

      // Tahan sebentar di logo penuh, baru keluar.
      if (ready && now - readyAt >= FINAL_MS + HOLD_MS) finish()
      else raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      timers.forEach((id) => window.clearTimeout(id))
      window.removeEventListener("load", onLoad)
      doc.classList.remove("is-preloading")
    }
  }, [])

  if (gone) return null

  return (
    <div ref={rootRef} className="preloader" aria-hidden="true">
      <div className="page-grain preloader__grain" />
      <div className="preloader__stack">
        <span className="preloader__logo">
          <span aria-hidden="true" className="preloader__glyph">
            ✦
          </span>
        </span>
      </div>
    </div>
  )
}
