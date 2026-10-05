"use client"

import { useEffect, useRef } from "react"

const REPEATS_PER_GROUP = 4
const BASE_SPEED = 70 // px/s
const MAX_BOOST = 240 // px/s
const DIR_EASE = 0.08

function wrapOffset(value: number, width: number) {
  if (width <= 0) return 0
  // Keep offset in (-width, 0] so the 2-group track loops seamlessly.
  let v = value % width
  if (v > 0) v -= width
  if (v <= -width) v += width
  return v
}

/**
 * Two endless marquee rows driven by scroll direction (no CSS keyframes).
 * - Scroll DOWN (+1): row 1 moves LEFT, row 2 moves RIGHT.
 * - Scroll UP (-1): row 1 moves RIGHT, row 2 moves LEFT.
 * - Keeps moving in the last direction when scrolling stops.
 */
export function ScrollMarqueeRows({
  rows,
}: {
  rows: [string, string]
}) {
  const backRef = useRef<HTMLDivElement>(null)
  const trackRefs = useRef<Array<HTMLDivElement | null>>([])
  const groupRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const back = backRef.current
    const tracks = trackRefs.current
    const groups = groupRefs.current
    if (!back || tracks.length < 2 || groups.length < 2) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")

    const groupWidths = [0, 0]
    const offsets = [0, 0]

    const measure = () => {
      for (let i = 0; i < 2; i += 1) {
        const g = groups[i]
        if (g) {
          const w = g.getBoundingClientRect().width
          if (w > 0) groupWidths[i] = w
        }
      }
      // Static phase offsets so the rows sit out of phase.
      offsets[0] = wrapOffset(offsets[0] || 0, groupWidths[0])
      const base = offsets[1] === 0 ? -groupWidths[1] * 0.25 : offsets[1]
      offsets[1] = wrapOffset(base, groupWidths[1])
      apply()
    }

    const apply = () => {
      for (let i = 0; i < 2; i += 1) {
        const t = tracks[i]
        if (t) t.style.transform = `translate3d(${offsets[i]}px, 0, 0)`
      }
    }

    const applyStatic = () => {
      offsets[0] = 0
      offsets[1] = groupWidths[1] > 0 ? -groupWidths[1] * 0.25 : 0
      apply()
    }

    if (reduced.matches) {
      measure()
      applyStatic()
      const onResize = () => {
        measure()
        applyStatic()
      }
      window.addEventListener("resize", onResize)
      let fontsDone = false
      document.fonts?.ready.then(() => {
        if (!fontsDone) {
          fontsDone = true
          measure()
          applyStatic()
        }
      }).catch(() => {})
      return () => window.removeEventListener("resize", onResize)
    }

    measure()

    let raf = 0
    let running = false
    let lastTime = 0
    let lastScrollY = window.scrollY
    let lastScrollT = performance.now()
    const targetDir = { value: 1 } // default = "scroll down" state
    const currentDir = { value: 1 }
    const boost = { value: 0 }

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY
      if (Math.abs(delta) >= 1) {
        targetDir.value = delta > 0 ? 1 : -1
        // Scroll-velocity boost: px per second * 0.08, capped.
        const now = performance.now()
        const dt = Math.max((now - lastScrollT) / 1000, 1 / 240)
        const velocity = Math.abs(delta) / dt
        const next = Math.min(velocity * 0.08, MAX_BOOST)
        boost.value = Math.max(boost.value, next)
        lastScrollY = y
        lastScrollT = now
      }
    }

    const tick = (now: number) => {
      if (!running) return
      const dt = Math.min(Math.max((now - lastTime) / 1000, 0), 0.05)
      lastTime = now

      // Ease direction so rows slow through a stop instead of snapping.
      currentDir.value += (targetDir.value - currentDir.value) * DIR_EASE
      if (Math.abs(targetDir.value - currentDir.value) < 0.001) {
        currentDir.value = targetDir.value
      }

      // Decay boost back to 0 when scrolling stops.
      boost.value += (0 - boost.value) * 0.06
      if (boost.value < 0.5) boost.value = 0

      const speed = BASE_SPEED + boost.value
      const step = currentDir.value * speed * dt

      offsets[0] = wrapOffset(offsets[0] - step, groupWidths[0])
      offsets[1] = wrapOffset(offsets[1] + step, groupWidths[1])
      apply()

      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running) return
      running = true
      lastTime = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) start()
        else stop()
      },
      { rootMargin: "200px" },
    )
    // Observe the whole section (parent) so the loop runs when near viewport.
    const section = back.parentElement
    if (section) io.observe(section)

    const ro = new ResizeObserver(measure)
    groups.forEach((g) => {
      if (g) ro.observe(g)
    })

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", measure)
    document.fonts?.ready.then(() => measure()).catch(() => {})

    start()

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", measure)
    }
  }, [])

  return (
    <div ref={backRef} aria-hidden="true" className="process-back">
      {rows.map((text, rowIndex) => (
        <div key={text} className="process-marquee-row">
          <div
            ref={(el) => {
              trackRefs.current[rowIndex] = el
            }}
            className="process-track"
          >
            {[0, 1].map((half) => (
              <div
                key={half}
                ref={
                  half === 0
                    ? (el) => {
                        groupRefs.current[rowIndex] = el
                      }
                    : undefined
                }
                className="process-group"
              >
                {Array.from({ length: REPEATS_PER_GROUP }).map((_, i) => (
                  <span key={i} className="process-phrase">
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
