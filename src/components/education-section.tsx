"use client"

import Image from "next/image"
import { FaAward, FaBookOpen, FaCalendarAlt, FaUsers } from "react-icons/fa"
import { education } from "@/src/education"
import { eduDegreeEn, eduHighlightsEn, useLang } from "@/src/i18n"
import { Tagline } from "@/src/components/ui/Tagline"
import { useRevealGroup } from "@/src/components/use-reveal-group"

export function EducationSection() {
  const ref = useRevealGroup<HTMLElement>()
  const { lang, t } = useLang()
  const entry = education[0]

  if (!entry) return null

  const highlights = lang === "en" ? eduHighlightsEn : entry.highlights
  const degree = lang === "en" ? eduDegreeEn : entry.degree

  // Dua bagian isi, keduanya selalu terbaca — tanpa tab yang menyembunyikan teks.
  const parts = [
    {
      id: "coursework",
      index: "01",
      icon: FaBookOpen,
      kicker: t.education.topicKickers.coursework,
      title: t.education.topics.coursework,
      body: highlights[0] ?? "",
    },
    {
      id: "organization",
      index: "02",
      icon: FaUsers,
      kicker: t.education.topicKickers.organization,
      title: t.education.topics.organization,
      body: highlights[1] ?? "",
    },
  ]

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="edu"
      ref={ref}
    >
      <div className="container">
        <div data-reveal className="edu-head edu-reveal">
          <Tagline className="edu-label">{t.education.tagline}</Tagline>
          <h2 id="education-heading" className="edu-title">
            {t.education.title}
          </h2>
          <p className="edu-subtitle">{t.education.subtitle}</p>
        </div>

        <article data-reveal className="edu-record edu-reveal">
          <span aria-hidden="true" className="edu-record__glow" />
          <span aria-hidden="true" className="edu-record__watermark">
            {entry.initials}
          </span>

          <div className="edu-record__grid">
            <div className="edu-record__id">
              <span aria-hidden="true" className="edu-logo">
                {entry.logo ? (
                  <Image
                    src={entry.logo}
                    alt=""
                    width={120}
                    height={120}
                    className="edu-logo__img"
                  />
                ) : (
                  <span className="edu-logo__initials">{entry.initials}</span>
                )}
              </span>

              <p className="edu-record__kicker">{t.education.campusLabel}</p>
              <h3 className="edu-record__school">{entry.institution}</h3>
              <p className="edu-record__degree">{degree}</p>

              <dl className="edu-record__facts">
                <div className="edu-fact">
                  <dt>
                    <FaCalendarAlt aria-hidden="true" />
                    {t.education.topics.period}
                  </dt>
                  <dd>{entry.period}</dd>
                </div>
                <div className="edu-fact">
                  <dt>
                    <FaAward aria-hidden="true" />
                    {t.education.gpaLabel}
                  </dt>
                  <dd>{entry.gpa}</dd>
                </div>
              </dl>
            </div>

            <div className="edu-record__parts">
              {parts.map((part) => {
                const Icon = part.icon
                return (
                  <section
                    key={part.id}
                    className="edu-part"
                    aria-labelledby={`edu-part-${part.id}`}
                  >
                    <span aria-hidden="true" className="edu-part__icon">
                      <Icon />
                    </span>
                    <div className="edu-part__copy">
                      <p className="edu-part__kicker">{part.kicker}</p>
                      <h4
                        id={`edu-part-${part.id}`}
                        className="edu-part__title"
                      >
                        {part.title}
                      </h4>
                      <p className="edu-part__text">{part.body}</p>
                    </div>
                  </section>
                )
              })}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
