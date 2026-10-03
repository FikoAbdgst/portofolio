"use client"

import { useEffect, useRef } from "react"

const HOVER_SELECTOR = "a, button, [role='button'], summary, input, textarea, select, label"
const RING_BASE = 36
const NAME_SIZE = 80

/**
 * Kursor dot + ring + label yang ditingkatkan:
 * - Dot cyan 8px mengikuti instan dengan glow lembut.
 * - Ring menempel halus ke tengah elemen interaktif (sticky), meregang
 *   searah gerak saat bergerak cepat, lalu kembali bulat saat diam.
 * - Label konteks ("View"/"Open") terpisah dari rotasi agar tetap tegak.
 * - Ripple melingkar saat klik. Nonaktif di sentuh & reduced-motion.
 */
export function CustomCursor() {
  const layerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const rippleRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return

    const layer = layerRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    const ripple = rippleRef.current
    if (!layer || !dot || !ring || !label || !ripple) return

    let x = -100
    let y = -100
    let rx = x
    let ry = y
    let px = x
    let py = y
    let angle = 0
    let stretch = 0
    let scale = 1
    let raf = 0
    let shown = false
    let mode: "default" | "link" | "name" = "default"
    let down = false
    let sticky: Element | null = null
    let currentLabel = ""

    const setLabel = (text: string) => {
      if (text === currentLabel) return
      currentLabel = text
      label.textContent = text
      label.classList.toggle("is-on", text !== "")
    }

    const show = () => {
      if (shown) return
      shown = true
      layer.classList.add("is-on")
      document.body.classList.add("has-custom-cursor")
    }

    const hide = () => {
      shown = false
      sticky = null
      layer.classList.remove("is-on")
      document.body.classList.remove("has-custom-cursor")
      cancelAnimationFrame(raf)
      raf = 0
    }

    const loop = () => {
      dot.style.transform = `translate(${x}px, ${y}px)`

      // Target lengket: 35% ke tengah elemen saat hover.
      let gx = x
      let gy = y
      if (sticky && !down) {
        const r = sticky.getBoundingClientRect()
        gx = x + (r.left + r.width / 2 - x) * 0.35
        gy = y + (r.top + r.height / 2 - y) * 0.35
      }
      rx += (gx - rx) * 0.18
      ry += (gy - ry) * 0.18

      // Regang searah kecepatan, kembali bulat saat melambat.
      const vx = rx - px
      const vy = ry - py
      const speed = Math.hypot(vx, vy)
      px = rx
      py = ry
      const targetStretch = Math.min(speed * 0.02, 0.35)
      stretch += (targetStretch - stretch) * 0.2
      if (speed > 1.5) {
        const targetAngle = (Math.atan2(vy, vx) * 180) / Math.PI
        angle += ((((targetAngle - angle + 540) % 360) - 180) * 0.2)
      }

      const base = mode === "name" ? NAME_SIZE / RING_BASE : mode === "link" ? 1.6 : 1
      const targetScale = base * (down ? 0.8 : 1)
      scale += (targetScale - scale) * 0.18

      const sx = scale * (1 + stretch)
      const sy = scale * (1 - stretch * 0.6)
      ring.style.transform = `translate(${rx}px, ${ry}px) rotate(${angle}deg) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`
      label.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return
      x = e.clientX
      y = e.clientY
      if (!shown) {
        rx = x
        ry = y
        px = x
        py = y
      }
      const t = e.target as Element | null
      const overName = Boolean(t?.closest?.("[data-cursor-name]"))
      const link = t?.closest?.(HOVER_SELECTOR)
      const hoverable = t?.closest?.("[data-cursor-hover]")
      const inNav = Boolean(t?.closest?.("header"))
      if (overName) {
        mode = "name"
        sticky = null
        ring.classList.add("is-name")
        ring.classList.remove("is-link")
        setLabel("")
      } else if (link && !inNav) {
        mode = "link"
        sticky = link
        ring.classList.add("is-link")
        ring.classList.remove("is-name")
        const href = (link as HTMLAnchorElement).getAttribute("href") ?? ""
        const explicit = link.getAttribute("data-cursor-label")
        setLabel(
          explicit ?? (href.includes("/projects") ? "View" : "Open")
        )
      } else if (hoverable && !inNav) {
        mode = "link"
        sticky = hoverable
        ring.classList.add("is-link")
        ring.classList.remove("is-name")
        setLabel("")
      } else {
        mode = "default"
        sticky = null
        ring.classList.remove("is-link", "is-name")
        setLabel("")
      }
      show()
      if (!raf) raf = requestAnimationFrame(loop)
    }

    const onDown = (e: PointerEvent) => {
      down = true
      ripple.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      ripple.classList.remove("go")
      void ripple.offsetWidth
      ripple.classList.add("go")
    }
    const onUp = () => {
      down = false
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    window.addEventListener("pointerup", onUp, { passive: true })
    document.documentElement.addEventListener("pointerleave", hide)

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      document.documentElement.removeEventListener("pointerleave", hide)
      hide()
    }
  }, [])

  return (
    <div aria-hidden="true" ref={layerRef} className="custom-cursor-layer">
      <div ref={ringRef} className="cc-ring" />
      <span ref={rippleRef} className="cc-ripple" />
      <span ref={labelRef} className="cc-label" />
      <div ref={dotRef} className="cc-dot" />
    </div>
  )
}
