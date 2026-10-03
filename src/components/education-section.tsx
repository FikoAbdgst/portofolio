"use client"

import Image from "next/image"
import { FaAward, FaCalendarAlt } from "react-icons/fa"
import {
  certifications,
  education,
  type Certification,
  type EducationEntry,
} from "@/src/education"
import { useRevealGroup } from "@/src/components/use-reveal-group"

export function EducationCard({
  entry,
  delay,
}: {
  entry: EducationEntry
  delay: number
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

        <p className="edu-degree">{entry.degree}</p>
        <div aria-hidden="true" className="edu-divider" />
        <ul className="edu-highlights">
          {entry.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function CertificationCard({
  certification,
  delay,
}: {
  certification: Certification
  delay: number
}) {
  return (
    <li
      data-cursor-hover
      data-reveal
      className="edu-cert edu-reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="edu-cert__text">
        <h3 className="edu-cert__name">{certification.name}</h3>
        <p className="edu-cert__issuer">{certification.issuer}</p>
      </div>
      <span className="edu-cert__date">{certification.date}</span>
    </li>
  )
}

export function EducationSection() {
  const ref = useRevealGroup<HTMLElement>()

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="edu"
      ref={ref}
    >
      <div className="container">
        <div data-reveal className="edu-head edu-reveal">
          <p className="edu-label">
            <span aria-hidden="true" className="edu-label__spark">
              ✦
            </span>
            Academic Background
          </p>
          <h2 id="education-heading" className="edu-title">
            Education &amp; Learning
          </h2>
          <p className="edu-subtitle">
            Fondasi pengetahuan dan pengalaman akademik yang membentuk perjalanan
            profesional saya.
          </p>
        </div>

        <div className="edu-card-wrap">
          {education.map((entry) => (
            <EducationCard key={entry.slug} entry={entry} delay={80} />
          ))}
        </div>

        <ul className="edu-certs">
          {certifications.map((certification, index) => (
            <CertificationCard
              key={certification.slug}
              certification={certification}
              delay={160 + index * 80}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
