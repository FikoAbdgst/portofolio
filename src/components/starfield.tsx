"use client"

import { useEffect, useRef } from "react"

type RGB = [number, number, number]

function mix(a: RGB, b: RGB, f: number): string {
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * f)},${Math.round(
    a[1] + (b[1] - a[1]) * f,
  )},${Math.round(a[2] + (b[2] - a[2]) * f)})`
}

type Star = {
  bx: number
  by: number
  x: number
  y: number
  depth: number // 0.2..1 — parallax factor
  size: number
  tw: number // twinkle phase
}

function StarfieldImpl() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let w = 0
    let h = 0
    let scrollY = 0
    let stars: Star[] = []
    let raf = 0
    let running = false
    let last = 0
    // Fixed deep-blue palette: background stars must never read as white.
    const base: RGB = [30, 48, 96]
    const accent: RGB = [52, 80, 150]

    const build = () => {
      const count = Math.min(900, Math.round((w * h) / 2800))
      stars = []
      for (let i = 0; i < count; i += 1) {
        const depth = 0.18 + Math.pow(Math.random(), 1.6) * 0.82
        const bx = Math.random() * w
        const by = Math.random() * h
        stars.push({
          bx,
          by,
          x: bx,
          y: by,
          depth,
          size: 0.4 + depth * 1.3,
          tw: Math.random() * Math.PI * 2,
        })
      }
    }

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        ctx.beginPath()
        ctx.fillStyle = mix(base, accent, 0.3)
        ctx.globalAlpha = 0.12 + s.depth * 0.18
        ctx.arc(s.bx, s.by, s.size * 0.8, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame)
      last = t
      const time = t / 1000

      ctx.clearRect(0, 0, w, h)

      for (const s of stars) {
        // Parallax on scroll: deeper stars shift less; all float upward slightly
        const parallax = (1 - s.depth) * scrollY * 0.16
        const drift = scrollY * 0.0012
        const px = s.bx
        const py = (((s.by + parallax + drift * s.depth * 120) % h) + h) % h

        ctx.beginPath()
        const twinkle = reduced ? 0 : (Math.sin(time * 1.6 + s.tw) + 1) / 2
        const lit = 0.1 + twinkle * 0.22
        ctx.fillStyle = mix(base, accent, s.depth * 0.4)
        ctx.globalAlpha = lit * (0.3 + s.depth * 0.4)
        ctx.arc(px, py, s.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const start = () => {
      if (reduced || running) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    const onScroll = () => {
      scrollY = window.scrollY
      start()
    }

    if (reduced) {
      drawStatic()
    } else {
      onScroll()
      window.addEventListener("scroll", onScroll, { passive: true })
    }
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}

export function Starfield() {
  return <StarfieldImpl />
}