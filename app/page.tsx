import { siteConfig } from "@/src/site.config"
import { JsonLd } from "@/src/components/json-ld"
import { Hero } from "@/src/components/hero"
import { TechMarquee } from "@/src/components/tech-marquee"
import { AboutSection } from "@/src/components/about-section"
import { ExperienceSection } from "@/src/components/experience-section"
import { EducationSection } from "@/src/components/education-section"
import { FeaturedProjects } from "@/src/components/featured-projects"
import { ServicesSection } from "@/src/components/services-section"
import { ProcessSection } from "@/src/components/process-section"
import { ContactSection } from "@/src/components/contact-section"

export default function HomePage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.jobTitle,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    address: { "@type": "PostalAddress", addressLocality: siteConfig.location },
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
      siteConfig.socials.twitter,
    ],
    knowsAbout: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  }

  return (
    <>
      <JsonLd data={personJsonLd} />
      <div
        className="midnight-landing -mt-28 md:-mt-32"
        style={{ marginInline: "calc(50% - 50vw)" }}
      >
        <div aria-hidden="true" className="page-grain page-grain--landing" />
        <div className="landing-content">
          <Hero />
          <TechMarquee />
          <AboutSection />
          <ExperienceSection />
          <EducationSection />
          <div className="container">
            <FeaturedProjects />

            <ServicesSection />
            <ProcessSection />
          </div>

          <ContactSection />
        </div>
      </div>
    </>
  )
}
