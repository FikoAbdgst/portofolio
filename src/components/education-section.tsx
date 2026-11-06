"use client"

import Image from "next/image"
import {
  Binary,
  BookOpen,
  Code2,
  Cpu,
  Globe,
  Handshake,
  Lightbulb,
  Network,
  Smartphone,
  Terminal,
  Users,
  Workflow,
} from "lucide-react"
import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react"
import { education } from "@/src/education"
import { eduCourses, eduCoursesEn, eduDegreeEn, useLang } from "@/src/i18n"
import { Tagline } from "@/src/components/ui/Tagline"
import { useRevealGroup } from "@/src/components/use-reveal-group"

type TopicId = "coursework" | "organization"
type TopicIcon = typeof BookOpen

type TopicItem = {
  label: string
  icon: TopicIcon
}

type Topic = {
  id: TopicId
  icon: TopicIcon
  kicker: string
  note: string
  items: TopicItem[]
}

// Ikon mengikuti urutan mata kuliah yang sama di kedua bahasa.
const COURSE_ICONS: TopicIcon[] = [
  Globe,
  Cpu,
  Network,
  Binary,
  Workflow,
  Smartphone,
  Terminal,
]

// Tiga fokus organisasi: coding, inovasi teknologi, kolaborasi proyek.
const FOCUS_ICONS: TopicIcon[] = [Code2, Lightbulb, Handshake]

export function EducationSection() {
  const ref = useRevealGroup<HTMLElement>()
  const { lang, t } = useLang()
  const [active, setActive] = useState<TopicId>("coursework")
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const entry = education[0]
  if (!entry) return null

  const courses = lang === "en" ? eduCoursesEn : eduCourses
  const degree = lang === "en" ? eduDegreeEn : entry.degree

  // Dua catatan studi: mata kuliah dan organisasi. Judul tab sudah menjadi
  // labelnya, panel hanya memuat isi dalam bentuk butir — tanpa teks berulang.
  const topics: Topic[] = [
    {
      id: "coursework",
      icon: BookOpen,
      kicker: t.education.topicKickers.coursework,
      note: t.education.topicNotes.coursework,
      items: courses.map((label, index) => ({
        label,
        icon: COURSE_ICONS[index] ?? BookOpen,
      })),
    },
    {
      id: "organization",
      icon: Users,
      kicker: t.education.topicKickers.organization,
      note: t.education.topicNotes.organization,
      items: t.education.organizationFocus.map((label, index) => ({
        label,
        icon: FOCUS_ICONS[index] ?? Users,
      })),
    },
  ]

  const activeIndex = Math.max(
    0,
    topics.findIndex((topic) => topic.id === active),
  )
  const activeTopic = topics[activeIndex]

  // "GPA: 3.82/4.00" → angka utama + skala kecil, tanpa mengubah datanya.
  const gpaMatch = entry.gpa.match(/([\d.]+)\s*\/\s*([\d.]+)/)
  const gpaValue = gpaMatch?.[1] ?? entry.gpa
  const gpaMax = gpaMatch?.[2]

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = topics.length - 1
    let next = index
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = index === last ? 0 : index + 1
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = index === 0 ? last : index - 1
    } else if (event.key === "Home") {
      next = 0
    } else if (event.key === "End") {
      next = last
    } else {
      return
    }
    event.preventDefault()
    setActive(topics[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="edu"
      ref={ref}
    >
      <div className="container">
        <div data-reveal className="edu-head edu-reveal">
          <Tagline className="about-label">{t.education.tagline}</Tagline>
          <h2 id="education-heading" className="edu-title">
            {t.education.title}
          </h2>
          <p className="edu-subtitle">{t.education.subtitle}</p>
        </div>

        <div
          className="edu-card edu-reveal"
          data-reveal
          style={{ transitionDelay: "80ms" }}
        >
          <div className="edu-card__id">
            <span aria-hidden="true" className="edu-seal">
              {entry.logo ? (
                <Image
                  src={entry.logo}
                  alt=""
                  width={96}
                  height={96}
                  className="edu-seal__img"
                />
              ) : (
                <span className="edu-seal__initials">{entry.initials}</span>
              )}
            </span>

            <div className="edu-card__name">
              <span className="edu-card__kicker">{t.education.campusLabel}</span>
              <h3 className="edu-school">{entry.institution}</h3>
              <p className="edu-degree">{degree}</p>
            </div>

            <dl className="edu-meta">
              <div className="edu-meta__item">
                <dt>{t.education.gpaLabel}</dt>
                <dd>
                  <strong>{gpaValue}</strong>
                  {gpaMax ? <span> / {gpaMax}</span> : null}
                </dd>
              </div>
              <div className="edu-meta__item">
                <dt>{t.education.topics.period}</dt>
                <dd>{entry.period}</dd>
              </div>
            </dl>
          </div>

          <div className="edu-tabs">
            <div
              role="tablist"
              aria-label={t.education.tabsLabel}
              className="edu-tablist"
            >
              <span
                aria-hidden="true"
                className="edu-tablist__thumb"
                style={{
                  width: `calc((100% - 8px) / ${topics.length})`,
                  transform: `translateX(${activeIndex * 100}%)`,
                }}
              />

              {topics.map((topic, index) => {
                const Icon = topic.icon
                const selected = index === activeIndex
                return (
                  <button
                    key={topic.id}
                    type="button"
                    role="tab"
                    id={`edu-tab-${topic.id}`}
                    aria-selected={selected}
                    aria-controls="edu-panel"
                    tabIndex={selected ? 0 : -1}
                    ref={(node) => {
                      tabRefs.current[index] = node
                    }}
                    onClick={() => setActive(topic.id)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                    className="edu-tab"
                  >
                    <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
                    {t.education.topics[topic.id]}
                  </button>
                )
              })}
            </div>

            <div
              key={activeTopic.id}
              id="edu-panel"
              role="tabpanel"
              aria-labelledby={`edu-tab-${activeTopic.id}`}
              className="edu-panel"
            >
              <div className="edu-panel__head">
                <p className="edu-panel__kicker">{activeTopic.kicker}</p>
                <p className="edu-panel__note">{activeTopic.note}</p>
              </div>

              <ul className="edu-items" data-count={activeTopic.items.length}>
                {activeTopic.items.map((item, index) => {
                  const ItemIcon = item.icon
                  return (
                    <li
                      key={item.label}
                      className="edu-item"
                      style={{ "--i": index } as CSSProperties}
                    >
                      <span aria-hidden="true" className="edu-item__icon">
                        <ItemIcon size={17} strokeWidth={1.7} />
                      </span>
                      <span className="edu-item__label">{item.label}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
