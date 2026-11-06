"use client"

import { useEffect } from "react"

/** Porsi delta wheel yang diteruskan (sisanya dibuang agar tak bisa ngebut). */
const DAMPEN = 0.45
/** Kelenturan antar menuju target tiap frame (makin kecil makin pelan). */
const LERP = 0.1
/** Durasi scroll anchor (#contact dsb) — sengaja lambat dan tenang. */
const ANCHOR_MS = 1300
/** Jeda agar heading tidak tertutup navbar melayang saat mendarat. */
const NAV_OFFSET = 88

/** Jembatan agar link React (mis. navbar `/#about`) bisa memakai animasi yang sama. */
let flyToElement: ((el: Element) => void) | null = null

/**
 * Scroll mulus ke section ber-id `id`. Dipakai navbar yang href-nya
 * berbentuk `/#id` (ditangani router Next bila tidak di-cegat).
 * Mengembalikan true bila target ketemu.
 */
export function scrollToSection(id: string): boolean {
  const el = document.getElementById(id)
  if (!el) return false
  if (flyToElement) flyToElement(el)
  else el.scrollIntoView({ behavior: "smooth", block: "start" })
  return true
}

/**
 * Scroll lambat & smooth: delta wheel diredam (±45%) lalu diantar dengan
 * lerp tiap frame, jadi sentakan scroll cepat terasa dibatasi dan buttery.
 * Nonaktif saat preloading, prefers-reduced-motion, layar sentuh,
 * pinch-zoom (ctrl), dan di dalam elemen bertanda [data-native-scroll].
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(hover: none)").matches) return

    const doc = document.documentElement
    doc.classList.add("has-smooth-scroll")

    let target = window.scrollY
    let current = window.scrollY
    let maxY = 0
    let raf = 0
    let running = false
    let self = false
    let anchorRaf = 0
    let anchorOn = false

    // Tinggi dokumen dibaca sekali + saat konten berubah, bukan tiap wheel
    // (membaca scrollHeight setelah menulis scroll memaksa layout).
    const measure = () => {
      maxY = Math.max(0, doc.scrollHeight - window.innerHeight)
      if (target > maxY) target = maxY
      if (current > maxY) current = maxY
    }
    measure()

    const loop = () => {
      const diff = target - current
      if (Math.abs(diff) < 0.5) {
        current = target
        self = true
        window.scrollTo(0, Math.round(current))
        running = false
        return
      }
      current += diff * LERP
      self = true
      window.scrollTo(0, Math.round(current))
      raf = requestAnimationFrame(loop)
    }

    const kick = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    }

    const stopGlide = () => {
      running = false
      cancelAnimationFrame(raf)
      target = window.scrollY
      current = window.scrollY
    }

    const stopAnchor = () => {
      anchorOn = false
      cancelAnimationFrame(anchorRaf)
    }

    const flyTo = (el: Element) => {
      stopGlide()
      stopAnchor()
      const from = window.scrollY
      const to = Math.max(
        0,
        Math.min(
          maxY,
          el.getBoundingClientRect().top + from - NAV_OFFSET,
        ),
      )
      if (Math.abs(to - from) < 2) return
      anchorOn = true
      const t0 = performance.now()
      const step = (now: number) => {
        if (!anchorOn) return
        const t = Math.min(1, (now - t0) / ANCHOR_MS)
        const eased =
          t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2
        self = true
        window.scrollTo(0, Math.round(from + (to - from) * eased))
        target = window.scrollY
        current = window.scrollY
        if (t < 1) anchorRaf = requestAnimationFrame(step)
        else anchorOn = false
      }
      anchorRaf = requestAnimationFrame(step)
    }

    flyToElement = flyTo

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return
      if (doc.classList.contains("is-preloading")) return
      if (
        (e.target as HTMLElement | null)?.closest?.("[data-native-scroll]")
      )
        return
      let dy = e.deltaY
      if (!dy) return
      e.preventDefault()
      stopAnchor()
      // Sinkron dulu bila posisi bergeser di luar kendali (scrollbar/Resize).
      if (!running) {
        target = window.scrollY
        current = window.scrollY
      }
      if (e.deltaMode === 1) dy *= 16
      else if (e.deltaMode === 2) dy *= window.innerHeight
      target = Math.min(maxY, Math.max(0, target + dy * DAMPEN))
      kick()
    }

    const onScroll = () => {
      if (self) {
        self = false
        return
      }
      // Scroll dari keyboard/scrollbar: adopsi, jangan dilawan.
      if (!anchorOn) stopGlide()
    }

    const onClick = (e: globalThis.MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null
      if (!anchor) return
      const id = anchor.getAttribute("href")
      if (!id || id === "#") return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      flyTo(el)
    }

    const onResize = () => {
      measure()
      if (!running) {
        target = window.scrollY
        current = window.scrollY
      }
    }

    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure)
      ro.observe(document.body)
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    document.addEventListener("click", onClick)
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("click", onClick)
      ro?.disconnect()
      doc.classList.remove("has-smooth-scroll")
      if (flyToElement === flyTo) flyToElement = null
      cancelAnimationFrame(raf)
      cancelAnimationFrame(anchorRaf)
    }
  }, [])

  return null
}
