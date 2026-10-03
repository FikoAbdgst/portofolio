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
        {[0, 1].map((half) => (
          <ul key={half} aria-hidden={half === 1} className="tech-group">
            {items.map((item) => (
              <Pill key={`${half}-${item.name}`} item={item} />
            ))}
          </ul>
        ))}
      </div>
      <span className="sr-only">{label}</span>
    </div>
  )
}

export function TechMarquee() {
  return (
    <section aria-label="Tech Stack" className="tech-section">
      <div className="fade-up tech-rows" style={{ animationDelay: "0.15s" }}>
        <Row
          items={techRow1}
          label="Frontend dan teknologi inti: React, Next.js, Vue.js, TypeScript, Tailwind CSS, Inertia.js, Vite."
        />
        <Row
          items={techRow2}
          reverse
          label="Backend, database, dan tools: Laravel, PHP, Node.js, Express.js, Spring Boot, MySQL, PostgreSQL, Python, Java, Kotlin, Docker, Bun."
        />
      </div>
    </section>
  )
}
