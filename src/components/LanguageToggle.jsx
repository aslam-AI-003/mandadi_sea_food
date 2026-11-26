import { useLang } from "../i18n/LanguageContext"

export default function LanguageToggle({ className = "" }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`flex items-center rounded-full border border-ocean/20 overflow-hidden text-xs font-semibold ${className}`}>
      <button
        onClick={() => setLang("ta")}
        className={`px-2.5 py-1.5 transition-colors ${lang === "ta" ? "bg-ocean text-white" : "text-ocean/70"}`}
      >
        தமிழ்
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-2.5 py-1.5 transition-colors ${lang === "en" ? "bg-ocean text-white" : "text-ocean/70"}`}
      >
        EN
      </button>
    </div>
  )
}
