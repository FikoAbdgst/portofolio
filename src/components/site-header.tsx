"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { useLang } from "@/src/i18n"
import { LangToggle } from "@/src/components/lang-toggle"
import { scrollToSection } from "@/src/components/smooth-scroll"

type NavId = "top" | "about" | "projects" | "services" | "contact"

const NAV_DEFS = [
  { href: "/#top", id: "top" },
  { href: "/#about", id: "about" },
  { href: "/#projects", id: "projects" },
  { href: "/#services", id: "services" },
  { href: "/#contact", id: "contact" },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>("top")
  const [hovered, setHovered] = useState<string | null>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 })
  // Tray bahasa menempel di bawah navbar: terbuka di awal, menutup ke atas
  // otomatis setelah 2 detik; dibuka lagi lewat handle chevron.
  const [langOpen, setLangOpen] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLangOpen(false), 2000)
    return () => window.clearTimeout(timer)
  }, [])
  const navRef = useRef<HTMLElement>(null)
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>())
  const pathname = usePathname()
  const isHome = pathname === "/"
  const { t } = useLang()
  const navLabels: Record<NavId, string> = {
    top: t.nav.home,
    about: t.nav.about,
    projects: t.nav.projects,
    services: t.nav.services,
    contact: t.nav.contact,
  }
  const NAV_ITEMS = NAV_DEFS.map((def) => ({
    ...def,
    label: navLabels[def.id as NavId],
  }))
  // Di luar home tidak ada section untuk diintip: turunkan status aktif
  // langsung dari rute saat render (tanpa setState di dalam effect).
  const routeActive = isHome
    ? null
    : pathname.startsWith("/projects")
      ? "projects"
      : pathname.slice(1)
  const shownActive = routeActive ?? active

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open ])

  useEffect(() => {
    if (!isHome) return
    const sections = ["about", "projects", "services", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    sections.forEach((el) => observer.observe(el))
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.4) setActive("top")
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [isHome])

  // Indikator putih meluncur mengikuti hover, kembali ke item aktif saat leave.
  const highlighted = hovered ?? shownActive
  useEffect(() => {
    const measure = () => {
      const nav = navRef.current
      const el = itemRefs.current.get(highlighted)
      if (!nav || !el) return
      const n = nav.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      setIndicator({ left: r.left - n.left, width: r.width, opacity: 1 })
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [highlighted])

  return (
    <header className="fade-up pointer-events-none fixed inset-x-0 top-4 z-40 flex w-full justify-center px-4 md:top-6">
      <div className="pointer-events-auto">
        <div className="hidden flex-col items-center md:flex">
        <nav
          ref={navRef}
          aria-label={t.nav.mainLabel}
          onMouseLeave={() => setHovered(null)}
          className="relative hidden items-center gap-1 rounded-2xl border p-2 md:flex"
          style={{
            background: "rgba(10, 17, 40, 0.8)",
            borderColor: "rgba(255,255,255,0.1)",
            boxShadow: "0 18px 42px -18px rgba(0, 0, 0, 0.65)",
            WebkitBackdropFilter: "blur(12px)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 rounded-xl bg-white"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.opacity,
              transition: "left 0.35s cubic-bezier(0.2,0.8,0.2,1), width 0.35s cubic-bezier(0.2,0.8,0.2,1), opacity 0.3s ease",
            }}
          />
          {NAV_ITEMS.map((item) => {
            const isOn = highlighted === item.id
            return (
              <Link
                key={item.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(item.id, el)
                  else itemRefs.current.delete(item.id)
                }}
                href={item.href}
                aria-current={shownActive === item.id ? "true" : undefined}
                onMouseEnter={() => setHovered(item.id)}
                onFocus={() => setHovered(item.id)}
                onClick={(e) => {
                  // Cegat router Next (lompat instan) agar scroll mulus 1300ms.
                  if (!isHome) return
                  e.preventDefault()
                  window.history.replaceState(null, "", item.href)
                  scrollToSection(item.id)
                }}
                className="relative z-10 rounded-xl px-5 py-2.5 font-[family-name:var(--font-sans)] text-[15px] font-medium no-underline transition-colors"
                style={isOn ? { color: "#0a1128" } : { color: "rgba(255,255,255,0.75)" }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
          <div
            id="lang-tray-desktop"
            className={`lang-tray${langOpen ? " is-open" : ""}`}
          >
            <div className="lang-tray__clip">
              <div className="lang-tray__body">
                <LangToggle />
              </div>
            </div>
          </div>
          <button
            type="button"
            className="lang-handle"
            aria-expanded={langOpen}
            aria-controls="lang-tray-desktop"
            aria-label={langOpen ? t.nav.hideLang : t.nav.showLang}
            onClick={() => setLangOpen((v) => !v)}
          >
            <ChevronDown
              aria-hidden="true"
              size={14}
              strokeWidth={2.5}
              className={`lang-handle__chev${langOpen ? " is-up" : ""}`}
            />
          </button>
        </div>

        <div className="flex flex-col items-center md:hidden">
          <nav
            aria-label={t.nav.mainLabel}
            className="flex items-center gap-1 rounded-2xl border p-2"
            style={{
              background: "rgba(10, 17, 40, 0.85)",
              borderColor: "rgba(255,255,255,0.1)",
              boxShadow: "0 18px 42px -18px rgba(0, 0, 0, 0.65)",
              WebkitBackdropFilter: "blur(12px)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Link
              href="/#top"
              onClick={(e) => {
                setOpen(false)
                if (!isHome) return
                e.preventDefault()
                window.history.replaceState(null, "", "/#top")
                scrollToSection("top")
              }}
              className="rounded-xl px-4 py-2 font-[family-name:var(--font-sans)] text-[15px] font-medium no-underline"
              style={shownActive === "top" ? { background: "#fff", color: "#0a1128" } : { color: "rgba(255,255,255,0.75)" }}
            >
              {t.nav.home}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-controls="site-menu-mobile"
              aria-expanded={open}
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl text-white"
            >
              <span aria-hidden="true" className={`h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
              <span aria-hidden="true" className={`h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </button>
          </nav>
          <div
            id="lang-tray-mobile"
            className={`lang-tray${langOpen ? " is-open" : ""}`}
          >
            <div className="lang-tray__clip">
              <div className="lang-tray__body">
                <LangToggle />
              </div>
            </div>
          </div>
          <button
            type="button"
            className="lang-handle"
            aria-expanded={langOpen}
            aria-controls="lang-tray-mobile"
            aria-label={langOpen ? t.nav.hideLang : t.nav.showLang}
            onClick={() => setLangOpen((v) => !v)}
          >
            <ChevronDown
              aria-hidden="true"
              size={14}
              strokeWidth={2.5}
              className={`lang-handle__chev${langOpen ? " is-up" : ""}`}
            />
          </button>
        </div>

        {open && (
          <div id="site-menu-mobile" className="mt-2 md:hidden">
            <nav
              aria-label={t.nav.mobileMenuLabel}
              className="flex flex-col gap-1 rounded-2xl border p-3"
              style={{ background: "rgba(10,17,40,0.97)", borderColor: "rgba(255,255,255,0.1)" }}
            >
          {NAV_ITEMS.map((item) => {
                const isActive = shownActive === item.id
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      setOpen(false)
                      if (!isHome) return
                      e.preventDefault()
                      window.history.replaceState(null, "", item.href)
                      scrollToSection(item.id)
                    }}
                    className="rounded-xl px-4 py-3 font-[family-name:var(--font-sans)] text-base font-medium no-underline hover:bg-white/5"
                    style={isActive ? { background: "#fff", color: "#0a1128" } : { color: "#fff" }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
