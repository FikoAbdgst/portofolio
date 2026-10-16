"use client"

import Image from "next/image"
import { FaAward, FaCalendarAlt } from "react-icons/fa"
import {
  certifications,
  education,
  type EducationEntry,
} from "@/src/education"
import { eduDegreeEn, eduHighlightsEn, useLang } from "@/src/i18n"
import { Tagline } from "@/src/components/ui/Tagline"
import { useRevealGroup } from "@/src/components/use-reveal-group"

export function EducationCard({
  entry,
  delay,
  lang,
}: {
  entry: EducationEntry
  delay: number
  lang: "id" | "en"
}) {
  return (
    <article
      data-cursor-hover
      data-reveal
      className="edu-card edu-reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
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

      <div className="edu-main">
        <div className="edu-top">
          <h3 className="edu-school">{entry.institution}</h3>
          <div className="edu-pills">
            <span className="edu-pill">
              <FaCalendarAlt aria-hidden="true" className="edu-pill__icon" />
              {entry.period}
            </span>
            <span className="edu-pill">
              <FaAward aria-hidden="true" className="edu-pill__icon" />
              <strong className="edu-pill__strong">{entry.gpa}</strong>
            </span>
          </div>
        </div>

        <p className="edu-degree">
          {lang === "en" ? eduDegreeEn : entry.degree}
        </p>
        <div aria-hidden="true" className="edu-divider" />
        <ul className="edu-highlights">
          {(lang === "en" ? eduHighlightsEn : entry.highlights).map(
            (highlight) => (
              <li key={highlight}>{highlight}</li>
            ),
          )}
        </ul>
      </div>
    </article>
  )
}

export function EducationSection() {
  const ref = useRevealGroup<HTMLElement>()
  const { lang, t } = useLang()

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
          <p className="edu-subtitle">
            {t.education.subtitle}
          </p>
        </div>

        <div className="edu-card-wrap">
          {education.map((entry) => (
            <EducationCard
              key={entry.slug}
              entry={entry}
              delay={80}
              lang={lang}
            />
          ))}
        </div>

        <div
          data-reveal
          className="edu-head edu-reveal"
          style={{ marginTop: "64px" }}
        >
          <Tagline className="edu-label">{t.education.certTagline}</Tagline>
          <h3 className="edu-title" style={{ fontSize: "clamp(24px, 2.6vw, 32px)" }}>
            {t.education.certTitle}
          </h3>
        </div>

        <ul className="edu-certs">
          {certifications.map((cert, index) => (
            <li
              key={cert.slug}
              data-reveal
              className="edu-reveal edu-cert"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="edu-cert__text">
                <p className="edu-cert__name">{cert.name}</p>
                <p className="edu-cert__issuer">
                  {cert.issuer}
                  {cert.credentialId
                    ? ` · Credential ID: ${cert.credentialId}`
                    : ""}
                </p>
              </div>
              <span className="edu-cert__date">{cert.period}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
