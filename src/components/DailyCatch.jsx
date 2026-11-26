import { PRODUCTS } from "../data/products"
import { useLang } from "../i18n/LanguageContext"

export default function DailyCatch({ onAdd }) {
  const { t } = useLang()
  const todaysCatch = PRODUCTS.filter((p) => p.tag === "இன்றைய பிடிப்பு")

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="font-heading font-bold text-2xl md:text-3xl text-ocean mb-1">{t("dailyCatch.heading")}</h2>
      <p className="text-ocean/60 mb-6">{t("dailyCatch.subtitle")}</p>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
        {todaysCatch.map((p) => (
          <div
            key={p.id}
            className="snap-start shrink-0 w-56 bg-white rounded-2xl shadow-sm border border-ocean/5 overflow-hidden"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-36 object-cover"
              style={{ objectPosition: p.imagePosition || "center" }}
            />
            <div className="p-4">
              <h3 className="font-heading font-semibold text-ocean text-sm mb-1">{p.name}</h3>
              <p className="text-coral font-bold mb-3">
                ₹{p.price}
                <span className="text-ocean/50 font-normal text-xs"> /{p.unit}</span>
              </p>
              <button
                onClick={() => onAdd(p)}
                className="w-full bg-teal text-white text-sm font-semibold py-2 rounded-full hover:bg-teal/90 transition-colors"
              >
                {t("dailyCatch.addToCart")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
