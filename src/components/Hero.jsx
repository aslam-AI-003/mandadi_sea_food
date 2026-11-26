import { buildWhatsAppLink } from "../data/constants"
import { PRODUCTS } from "../data/products"
import { useLang } from "../i18n/LanguageContext"

const collage = PRODUCTS.slice(0, 6)

export default function Hero() {
  const { t } = useLang()
  return (
    <section id="home" className="relative overflow-hidden bg-ocean">
      <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left text-white">
          <p className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1 text-sm font-medium mb-5">
            {t("hero.badge")}
          </p>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-white/85 text-base md:text-lg mb-8">{t("hero.subtitle")}</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <a
              href={buildWhatsAppLink("வணக்கம் Mandaadi! நான் கடல் உணவு ஆர்டர் பண்ண விரும்புறேன்.")}
              target="_blank"
              rel="noreferrer"
              className="bg-coral text-white font-semibold px-6 py-3 rounded-full hover:bg-coral/90 transition-colors shadow-lg"
            >
              {t("hero.orderNow")}
            </a>
            <a
              href="#products"
              className="bg-white text-ocean font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors shadow-lg"
            >
              {t("hero.viewProducts")}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {collage.map((p, i) => (
            <img
              key={p.id}
              src={p.image}
              alt={p.name}
              style={{ objectPosition: p.imagePosition || "center" }}
              className={`w-full object-cover rounded-xl shadow-lg ${
                i === 0 ? "col-span-2 row-span-2 h-40 md:h-52" : "h-20 md:h-24"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
