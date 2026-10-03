"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const NAV_ITEMS = [
  { href: "#top", label: "Home", id: "top" },
  { href: "#about", label: "About", id: "about" },
  { href: "#services", label: "Services", id: "services" },
  { href: "#works", label: "Works", id: "works" },
  { href: "#contact", label: "Contact", id: "contact" },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>("top")
  const [hovered, setHovered] = useState<string | null>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 })
  const navRef = useRef<HTMLElement>(null)
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>())

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open ])

  useEffect(() => {
    const sections = ["about", "services", "works", "contact"]
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
  }, [])

  // Indikator putih meluncur mengikuti hover, kembali ke item aktif saat leave.
  const highlighted = hovered ?? active
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
        <nav
          ref={navRef}
          aria-label="Navigasi utama"
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
                aria-current={active === item.id ? "true" : undefined}
                onMouseEnter={() => setHovered(item.id)}
                onFocus={() => setHovered(item.id)}
                className="relative z-10 rounded-xl px-5 py-2.5 font-[family-name:var(--font-sans)] text-[15px] font-medium no-underline transition-colors"
                style={isOn ? { color: "#0a1128" } : { color: "rgba(255,255,255,0.75)" }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <nav
            aria-label="Navigasi utama"
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
              href="#top"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-2 font-[family-name:var(--font-sans)] text-[15px] font-medium no-underline"
              style={active === "top" ? { background: "#fff", color: "#0a1128" } : { color: "rgba(255,255,255,0.75)" }}
            >
              Home
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-controls="site-menu-mobile"
              aria-expanded={open}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl text-white"
            >
              <span aria-hidden="true" className={`h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
              <span aria-hidden="true" className={`h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </button>
          </nav>
        </div>

        {open && (
          <div id="site-menu-mobile" className="mt-2 md:hidden">
            <nav
              aria-label="Menu ponsel"
              className="flex flex-col gap-1 rounded-2xl border p-3"
              style={{ background: "rgba(10,17,40,0.97)", borderColor: "rgba(255,255,255,0.1)" }}
            >
          {NAV_ITEMS.map((item) => {
                const isActive = active === item.id
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setOpen(false)}
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
