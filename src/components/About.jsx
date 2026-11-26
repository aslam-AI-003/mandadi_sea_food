import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../data/constants"
import { useLang } from "../i18n/LanguageContext"

const PARTNERS = [
  "Ungal Meenavan",
  "Kadal Meenavan",
  "Nagai Meenavan",
  "Tiruchendur Meenavan",
  "Thoothukudi Meenavan",
  "Indian Ocean Fisherman",
  "Fisherman Voice",
  "KK Jack Sparrow Fishing",
  "Anthony Alaripai",
]

export default function About() {
  const { t, lang } = useLang()
  return (
    <section id="about" className="bg-ocean text-white">
      <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">{t("about.heading")}</h2>
          <p className="text-white/80 mb-4 leading-relaxed">{t("about.p1")}</p>
          <p className="text-white/80 mb-6 leading-relaxed">{t("about.p2")}</p>
          <p className="text-white/80 mb-3 leading-relaxed">{t("about.partnersIntro")}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {PARTNERS.map((name) => (
              <span
                key={name}
                className="bg-white/10 border border-white/15 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full"
              >
                {name}
              </span>
            ))}
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-ocean font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
          >
            {lang === "en" ? (
              <>📸 {t("about.follow")}{INSTAGRAM_HANDLE}</>
            ) : (
              <>📸 {INSTAGRAM_HANDLE}{t("about.follow")}</>
            )}
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Narrow-barred_Spanish_mackerel_%28Scomberomorus_commerson%29.jpg/500px-Narrow-barred_Spanish_mackerel_%28Scomberomorus_commerson%29.jpg",
              pos: "center 20%",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Liat_Portal_for_Foodie_Disorder_-_Fresh_jumbo_shrimp_from_San_Francisco_farmers_market.jpg/500px-Liat_Portal_for_Foodie_Disorder_-_Fresh_jumbo_shrimp_from_San_Francisco_farmers_market.jpg",
              pos: "center",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Live_Mud_Crabs.jpg/500px-Live_Mud_Crabs.jpg",
              pos: "center 35%",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Pomfret_fishes.jpg/500px-Pomfret_fishes.jpg",
              pos: "center",
            },
          ].map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt="Fresh seafood"
              className="w-full h-32 md:h-36 object-cover rounded-xl"
              style={{ objectPosition: img.pos }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
