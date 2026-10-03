"use client"

/**
 * Fine, tight sandy grain (page-wide).
 * Tiled SVG noise (200px tiles), low opacity, normal blending —
 * adds tiny speckles without shifting the average background color.
 * Rendered BEHIND all content (z-1).
 */
export function ChalkGrain() {
  return <div aria-hidden="true" className="page-grain page-grain--fixed" />
}
