import { useState } from "react"
import { buildWhatsAppLink } from "../data/constants"
import { useLang } from "../i18n/LanguageContext"
import LanguageToggle from "./LanguageToggle"
import logo from "../assets/logo.png"

export default function Navbar({ cartCount, onCartClick }) {
  const [open, setOpen] = useState(false)
  const { t } = useLang()

  const LINKS = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.products"), href: "#products" },
    { label: t("nav.delivery"), href: "#delivery" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.contact"), href: "#contact" },
  ]

  return (
    <header className="sticky top-0 z-40 bg-sand/95 backdrop-blur border-b border-ocean/10">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16 gap-2">
        <a href="#home" className="flex items-center gap-2 font-heading font-extrabold text-ocean text-lg shrink-0">
          <img src={logo} alt="Mandaadi Fresh Seafoods" className="w-9 h-9 rounded-full object-cover" />
          Mandaadi
        </a>

        <nav className="hidden md:flex items-center gap-7 font-medium text-ocean/80">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-coral transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle className="hidden sm:flex" />
          <button
            onClick={onCartClick}
            className="relative px-3 py-2 rounded-full bg-ocean/5 hover:bg-ocean/10 transition-colors text-ocean"
            aria-label="Open cart"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-coral text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <a
            href={buildWhatsAppLink("வணக்கம் Mandaadi! நான் கடல் உணவு ஆர்டர் பண்ண விரும்புறேன்.")}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-coral text-white font-semibold px-4 py-2 rounded-full hover:bg-coral/90 transition-colors whitespace-nowrap"
          >
            {t("nav.orderWhatsApp")}
          </a>
          <button
            className="md:hidden text-ocean text-2xl px-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col gap-1 px-4 pb-4 font-medium text-ocean/80">
          <LanguageToggle className="self-start mb-2" />
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 border-b border-ocean/10">
              {l.label}
            </a>
          ))}
          <a
            href={buildWhatsAppLink("வணக்கம் Mandaadi! நான் கடல் உணவு ஆர்டர் பண்ண விரும்புறேன்.")}
            target="_blank"
            rel="noreferrer"
            className="mt-2 text-center bg-coral text-white font-semibold px-4 py-2 rounded-full hover:bg-coral/90 transition-colors"
          >
            {t("nav.orderWhatsApp")}
          </a>
        </nav>
      )}
    </header>
  )
}
