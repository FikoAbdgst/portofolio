import type { ReactNode } from "react"

export function Tagline({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const cls = className ? `tagline ${className}` : "tagline"
  return (
    <span className={cls}>
      <span aria-hidden="true" className="tagline-icon">
        ✦
      </span>
      <span className="tagline-text">{children}</span>
    </span>
  )
}
