import { buildWhatsAppLink } from "../data/constants"
import { useLang } from "../i18n/LanguageContext"

export default function FloatingWhatsApp() {
  const { t } = useLang()
  return (
    <a
      href={buildWhatsAppLink("வணக்கம் Mandaadi! நான் கடல் உணவு ஆர்டர் பண்ண விரும்புறேன்.")}
      target="_blank"
      rel="noreferrer"
      aria-label={t("whatsappFloat.label")}
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl shadow-xl hover:scale-105 transition-transform"
    >
      💬
    </a>
  )
}
