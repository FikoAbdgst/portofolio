import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi"
import { siteConfig } from "@/src/site.config"
import { SiteHeader } from "@/src/components/site-header"
import { CustomCursor } from "@/src/components/custom-cursor"
import { ChalkGrain } from "@/src/components/chalk-grain"
import { Preloader } from "@/src/components/preloader"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.jobTitle}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    siteConfig.name,
    siteConfig.jobTitle,
    "portfolio",
    "react developer",
    "frontend developer indonesia",
    "web developer",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.jobTitle}`,
    description: siteConfig.description,
    images: [
      { url: "/img/hero.png", width: 170, height: 179, alt: siteConfig.name },
    ],
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} — ${siteConfig.jobTitle}`,
    description: siteConfig.description,
    images: ["/img/hero.png"],
    creator: siteConfig.socials.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" data-theme="dark">
      <body
        className="flex min-h-svh flex-col"
        style={{ background: "var(--bg)", color: "var(--text)" }}
      >
        {/*
        THESIS: Midnight-blue editorial, fixed dark; the giant serif name is the
          monument on a clean gradient, not a dashboard or 3D stage.
        OWN-WORLD: Deep navy #0F1B3D→#0A1128→#070C1C, centered top glow,
          vignette, black-and-blue sand/chalk grain behind all content
          (no white anywhere); Cormorant giant #C9D4E3 flat with slate
          stroke, Outfit blue→cyan tagline, dot+ring cursor.
        STORY: Visitor reads the name, follows intro to projects
          or Contact Me in one tap.
        FIRST VIEWPORT: Floating #101C3A nav; cropped 19vw name; gradient tagline;
          intro line; quiet CTAs; scroll hint. No 3D, no theme switch.
        FORM: Brief-pinned midnight editorial v2 (fixed-dark refinement).
        FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Outfit:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        />
        <ChalkGrain />
        <Preloader />
        <CustomCursor />
        <SiteHeader />
        <main className="container relative z-10 flex-1 pb-10 pt-28 md:pt-32">
          {children}
        </main>
        <footer className="contact-footer">
          <div className="container contact-footer__row">
            <p className="contact-footer__copy">
              © {new Date().getFullYear()} {siteConfig.name.toUpperCase()}.
            </p>
            <ul className="contact-footer__socials">
              <li>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="contact-footer__link"
                >
                  <FiLinkedin aria-hidden="true" size={20} strokeWidth={1.5} />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="contact-footer__link"
                >
                  <FiGithub aria-hidden="true" size={20} strokeWidth={1.5} />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  aria-label="Email"
                  className="contact-footer__link"
                >
                  <FiMail aria-hidden="true" size={20} strokeWidth={1.5} />
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </body>
    </html>
  )
}
