const SLOTS = [
  { label: "காலை", time: "8:00 AM – 11:00 AM" },
  { label: "மதியம்", time: "12:00 PM – 3:00 PM" },
  { label: "மாலை", time: "5:00 PM – 8:00 PM" },
]

const AREAS = {
  "சென்னை": ["அண்ணா நகர்", "T. நகர்", "வேளச்சேரி", "அடையார்", "OMR"],
  "பெங்களூரு": ["இந்திரநகர்", "கோரமங்களா", "HSR லேஅவுட்", "வைட்ஃபீல்ட்", "ஜெயநகர்"],
}

export default function DeliveryInfo() {
  return (
    <section id="delivery" className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="font-heading font-bold text-2xl md:text-3xl text-ocean mb-1">டெலிவரி தகவல்</h2>
      <p className="text-ocean/60 mb-6">புதிய கடல் உணவு, சரியான நேரத்தில் டெலிவரி.</p>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-ocean/5 shadow-sm">
          <h3 className="font-heading font-semibold text-ocean mb-3">🕒 டெலிவரி நேரங்கள்</h3>
          <ul className="space-y-2 text-sm text-ocean/70">
            {SLOTS.map((s) => (
              <li key={s.label} className="flex justify-between">
                <span>{s.label}</span>
                <span className="font-medium text-ocean">{s.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-ocean/5 shadow-sm">
          <h3 className="font-heading font-semibold text-ocean mb-3">📍 சேவை பகுதிகள்</h3>
          {Object.entries(AREAS).map(([city, areas]) => (
            <div key={city} className="mb-2">
              <p className="text-xs font-semibold text-teal mb-1">{city}</p>
              <p className="text-sm text-ocean/70">{areas.join(", ")} மற்றும் பல</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-5 border border-ocean/5 shadow-sm">
          <h3 className="font-heading font-semibold text-ocean mb-3">🧊 குறைந்தபட்ச ஆர்டர்</h3>
          <p className="text-sm text-ocean/70 mb-3">ஆர்டருக்கு ₹500, ₹1500க்கு மேல் டெலிவரி இலவசம்.</p>
          <p className="text-sm text-ocean/70">ஒவ்வொரு டெலிவரிக்கும் சுத்தமான, குளிர் பாதுகாப்பு பேக்கிங்கில் அனுப்பப்படும்.</p>
        </div>
      </div>
    </section>
  )
}
