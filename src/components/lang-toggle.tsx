"use client"

import { useLang, type Lang } from "@/src/i18n"

/**
 * Toggle switch bahasa ID/EN: pil dua label dengan knob geser,
 * mengikuti bahasa aktif dari LanguageProvider.
 */
export function LangToggle() {
  const { lang, setLang } = useLang()
  const isEn = lang === "en"

  const switchLang = (next: Lang) => {
    if (next !== lang) setLang(next)
  }

  return (
    <div
      role="group"
      aria-label="Language / Bahasa"
      className="lang-toggle"
      data-lang={lang}
    >
      {(["id", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          aria-label={code === "id" ? "Bahasa Indonesia" : "English"}
          onClick={() => switchLang(code)}
          tabIndex={lang === code ? -1 : 0}
          className={`lang-toggle__opt${lang === code ? " is-on" : ""}`}
        >
          {code.toUpperCase()}
        </button>
      ))}
      <span aria-hidden="true" className={`lang-toggle__knob${isEn ? " is-en" : ""}`} />
    </div>
  )
}
