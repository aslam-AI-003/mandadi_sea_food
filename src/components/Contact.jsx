import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, buildWhatsAppLink } from "../data/constants"

export default function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="font-heading font-bold text-2xl md:text-3xl text-ocean mb-1">தொடர்பு கொள்ள</h2>
      <p className="text-ocean/60 mb-6">உங்கள் ஆர்டருக்கு நாங்கள் எப்போதும் உதவுவோம்.</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <a
            href={`tel:+${"919972426009"}`}
            className="flex items-center gap-3 bg-white border border-ocean/5 rounded-2xl p-4 shadow-sm hover:border-teal/40 transition-colors"
          >
            <span className="text-2xl">📞</span>
            <div>
              <p className="text-xs text-ocean/50">அழைக்கவும்</p>
              <p className="font-semibold text-ocean">{PHONE_DISPLAY}</p>
            </div>
          </a>

          <a
            href={buildWhatsAppLink("வணக்கம் Mandaadi! எனக்கு ஆர்டர் பற்றி ஒரு கேள்வி இருக்கு.")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 bg-white border border-ocean/5 rounded-2xl p-4 shadow-sm hover:border-teal/40 transition-colors"
          >
            <span className="text-2xl">💬</span>
            <div>
              <p className="text-xs text-ocean/50">WhatsApp</p>
              <p className="font-semibold text-ocean">{PHONE_DISPLAY}</p>
            </div>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 bg-white border border-ocean/5 rounded-2xl p-4 shadow-sm hover:border-teal/40 transition-colors"
          >
            <span className="text-2xl">📸</span>
            <div>
              <p className="text-xs text-ocean/50">Instagram</p>
              <p className="font-semibold text-ocean">{INSTAGRAM_HANDLE}</p>
            </div>
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-sm border border-ocean/5 min-h-64">
          <iframe
            title="Pickup location map"
            src="https://maps.google.com/maps?q=Chennai&t=&z=11&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full min-h-64"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
