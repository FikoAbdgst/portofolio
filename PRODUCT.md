# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: a mixed audience of freelance clients, hiring teams, and fellow developers visiting a personal portfolio. No single segment dominates; visitors judge craft, personality, and fit, then decide to reach out (inquiry, hiring, or collaboration).

## Product Purpose

A personal frontend-developer portfolio that showcases projects and profile, and converts visitor interest into contact. Success = a visitor understands who this developer is and what they build within seconds, and has a clear path to get in touch.

## Positioning

The interface itself is the proof: a frontend developer's portfolio whose craft (interaction, performance, polish) demonstrates the skill it claims, rather than only describing it.

## Operating Context

- Static multi-page site (Next.js App Router): home, about, projects index/detail, contact, 404.
- Content is evaluated on personal devices, mostly desktop browsers, some mobile.
- Indonesian-language UI copy throughout; developer is based in Bandung, Indonesia.

## Capabilities and Constraints

- Existing routes, content structure, SEO/metadata, JSON-LD, and placeholder copy stay; this work replaces the visual world, not the information architecture.
- Light/dark theme toggle is preserved; dark becomes the default, light remains available (confirmed).
- Background interaction and cursor interaction are explicit requirements of the requested retheme.
- Respect `prefers-reduced-motion`; keep semantic HTML, keyboard access, and current performance posture.
- Content is placeholder by choice ("Nama Kamu", example.com, sample projects); the design ships against it and the owner replaces it later (confirmed).

## Brand Commitments

- Name/brand placeholder: "Nama Kamu" (siteConfig), to be swapped by the owner later.
- Voice and copy language: Indonesian, first-person, plainspoken.
- Binding visual brief (user-declared): space theme with a slightly modern sensibility and a sci-fi touch, including interactive background and interactive cursor.
- Confirmed workflow: dark-default theme with the existing light-mode toggle retained.

## Evidence on Hand

- `src/site.config.ts` — name, tagline, email, location, socials (all placeholder).
- `src/projects.ts` + `public/img/` — sample project entries and hero image.
- `app/globals.css` — incumbent Rush Blue token system (evidence of the current look only; superseded by this retheme).
- No testimonials, clients, metrics, or press exist; future work must not fabricate any.

## Product Principles

1. The interface proves the craft — what ships must demonstrate frontend skill, not just claim it.
2. Speed and accessibility are non-negotiable; delight never blocks content.
3. Honest content: placeholders stay clearly replaceable, no invented claims.
4. One coherent voice — personal, direct, Indonesian-first.
5. Every interaction earns its place by clarifying or delighting, never by noise.

## Accessibility & Inclusion

- Keyboard-navigable, screen-reader-safe semantics; canvas/decorative layers `aria-hidden`.
- `prefers-reduced-motion` honored (static fallbacks for animated backgrounds/cursor).
- Contrast targets: body ≥4.5:1, large text ≥3:1 in both themes.
