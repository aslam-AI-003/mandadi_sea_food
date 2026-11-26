import { useLang } from "../i18n/LanguageContext"

const SLOTS = [
  { key: "morning", time: "8:00 AM – 11:00 AM" },
  { key: "afternoon", time: "12:00 PM – 3:00 PM" },
  { key: "evening", time: "5:00 PM – 8:00 PM" },
]

const AREAS = {
  "சென்னை": ["அண்ணா நகர்", "T. நகர்", "வேளச்சேரி", "அடையார்", "OMR"],
  "பெங்களூரு": ["இந்திரநகர்", "கோரமங்களா", "HSR லேஅவுட்", "வைட்ஃபீல்ட்", "ஜெயநகர்"],
}

export default function DeliveryInfo() {
  const { t } = useLang()

  return (
    <section id="delivery" className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="font-heading font-bold text-2xl md:text-3xl text-ocean mb-1">{t("delivery.heading")}</h2>
      <p className="text-ocean/60 mb-6">{t("delivery.subtitle")}</p>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-ocean/5 shadow-sm">
          <h3 className="font-heading font-semibold text-ocean mb-3">{t("delivery.timesHeading")}</h3>
          <ul className="space-y-2 text-sm text-ocean/70">
            {SLOTS.map((s) => (
              <li key={s.key} className="flex justify-between">
                <span>{t(`delivery.slots.${s.key}`)}</span>
                <span className="font-medium text-ocean">{s.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-ocean/5 shadow-sm">
          <h3 className="font-heading font-semibold text-ocean mb-3">{t("delivery.areasHeading")}</h3>
          {Object.entries(AREAS).map(([city, areas]) => (
            <div key={city} className="mb-2">
              <p className="text-xs font-semibold text-teal mb-1">{t(`delivery.cities.${city}`)}</p>
              <p className="text-sm text-ocean/70">
                {areas.join(", ")} {t("delivery.andMore")}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-5 border border-ocean/5 shadow-sm">
          <h3 className="font-heading font-semibold text-ocean mb-3">{t("delivery.minOrderHeading")}</h3>
          <p className="text-sm text-ocean/70 mb-3">{t("delivery.minOrderText")}</p>
          <p className="text-sm text-ocean/70">{t("delivery.packagingText")}</p>
        </div>
      </div>
    </section>
  )
}
