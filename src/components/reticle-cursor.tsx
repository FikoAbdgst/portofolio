"use client"

import { useEffect, useRef } from "react"

const INTERACTIVE =
  "a, button, input, textarea, select, [role='button'], label, .card, summary"

export function ReticleCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add("rendering-cursor")

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let ringX = x
    let ringY = y
    let active = false
    let down = false
    let raf = 0
    let visible = false

    const show = () => {
      if (visible) return
      visible = true
      ring.classList.add("is-on")
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return
      x = e.clientX
      y = e.clientY
      const target = e.target as Element | null
      active = Boolean(target?.closest?.(INTERACTIVE))
      dot.style.transform = `translate(${x}px, ${y}px)`
      show()
      if (!raf) raf = requestAnimationFrame(loop)
    }

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return
      down = true
      ring.classList.add("is-down")
    }

    const onUp = () => {
      down = false
      ring.classList.remove("is-down")
    }

    const onLeave = () => {
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
      visible = false
      ring.classList.remove("is-on")
    }

    const loop = () => {
      // Ease ring toward the dot — the reticle trails the finger
      const ease = down ? 0.9 : 0.16
      ringX += (x - ringX) * ease
      ringY += (y - ringY) * ease
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      ring.classList.toggle("is-active", active)
      if (!down && Math.hypot(x - ringX, y - ringY) < 0.02) {
        raf = 0
        return
      }
      raf = requestAnimationFrame(loop)
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") active = Boolean((e.target as Element)?.closest?.(INTERACTIVE))
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    window.addEventListener("pointerup", onUp, { passive: true })
    window.addEventListener("pointerleave", onLeave)
    document.addEventListener("keydown", onKey)

    return () => {
      document.body.classList.remove("rendering-cursor")
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  return (
    <div aria-hidden="true" className="cursor-layer">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}