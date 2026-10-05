"use client"

import { useEffect, useState } from "react"

/** Count-up 0 -> target dengan easeOutCubic; hormati prefers-reduced-motion. */
export function useCountUp(
  target: number,
  started: boolean,
  durationMs = 1400,
) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!started) return
    // Disalurkan lewat rAF agar bukan setState sinkron di badan effect.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setValue(target))
      return () => cancelAnimationFrame(raf)
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / durationMs)
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, target, durationMs])

  return value
}
