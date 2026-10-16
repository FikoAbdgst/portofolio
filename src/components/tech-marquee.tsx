"use client"

import type { TechItem } from "@/src/tech-stack"
import { techRow1, techRow2 } from "@/src/tech-stack"

function Pill({ item }: { item: TechItem }) {
  const Icon = item.icon
  return (
    <li
      data-cursor-hover
      className="tech-pill"
      style={{ color: item.color ?? "#E8EEF8" }}
    >
      <Icon aria-hidden="true" className="tech-pill-icon" />
      <span className="tech-pill-label">{item.name}</span>
    </li>
  )
}

function Row({
  items,
  reverse,
  label,
}: {
  items: TechItem[]
  reverse?: boolean
  label: string
}) {
  return (
    <div className="tech-marquee" role="presentation">
      <div className={`tech-track${reverse ? " tech-track--reverse" : ""}`}>
        <div className="tech-track__inner">
          {[0, 1, 2, 3].map((half) => (
            <ul
              key={half}
              aria-hidden={half !== 0}
              className="tech-group"
            >
              {items.map((item) => (
                <Pill key={`${half}-${item.name}`} item={item} />
              ))}
            </ul>
          ))}
        </div>
      </div>
      <span className="sr-only">{label}</span>
    </div>
  )
}

export function TechMarquee() {
  const items = [...techRow1, ...techRow2]
  return (
    <section aria-label="Tech Stack" className="tech-section">
      <div className="fade-up tech-rows" style={{ animationDelay: "0.15s" }}>
        <Row
          items={items}
          label="Tech stack: React, Next.js, Vue.js, TypeScript, Tailwind CSS, Inertia.js, Vite, Pinia, Axios, Blade, Laravel, Node.js, Express.js, MySQL, PostgreSQL, Docker, Java, Python."
        />
      </div>
    </section>
  )
}
