import { useState } from "react"
import { CITIES, buildWhatsAppLink } from "../data/constants"

export default function CartDrawer({ open, onClose, items, onUpdateQty, onRemove }) {
  const [city, setCity] = useState(CITIES[0])
  const [address, setAddress] = useState("")

  const total = items.reduce((sum, i) => sum + i.price * i.weight, 0)

  function checkoutMessage() {
    const lines = items.map(
      (i) => `• ${i.name} — ${i.weight}கிலோ x ₹${i.price}/கிலோ = ₹${(i.price * i.weight).toFixed(0)}`
    )
    return [
      "வணக்கம் Mandaadi! இந்த ஆர்டரை பண்ண விரும்புறேன்:",
      "",
      ...lines,
      "",
      `மொத்தம்: ₹${total.toFixed(0)}`,
      `டெலிவரி நகரம்: ${city}`,
      address ? `முகவரி: ${address}` : "முகவரி: (பின்னாடி சொல்றேன்)",
    ].join("\n")
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-ocean/40 z-50 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transition-transform flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-ocean/10">
          <h3 className="font-heading font-bold text-ocean text-lg">உங்கள் கார்ட்</h3>
          <button onClick={onClose} className="text-ocean/60 text-xl" aria-label="Close cart">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 && <p className="text-ocean/50 text-sm">உங்கள் கார்ட் காலியாக உள்ளது.</p>}
          {items.map((i) => (
            <div key={i.id} className="flex items-center gap-3 border border-ocean/10 rounded-xl p-2">
              <img src={i.image} alt={i.name} className="w-14 h-14 object-cover rounded-lg" />
              <div className="flex-1">
                <p className="font-semibold text-ocean text-sm">{i.name}</p>
                <p className="text-coral text-sm font-bold">₹{(i.price * i.weight).toFixed(0)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => onUpdateQty(i.id, Math.max(0.5, i.weight - 0.5))}
                    className="w-6 h-6 rounded-full bg-ocean/10 text-ocean text-sm"
                  >
                    −
                  </button>
                  <span className="text-xs text-ocean/70">{i.weight} கிலோ</span>
                  <button
                    onClick={() => onUpdateQty(i.id, i.weight + 0.5)}
                    className="w-6 h-6 rounded-full bg-ocean/10 text-ocean text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              <button onClick={() => onRemove(i.id)} className="text-ocean/40 hover:text-coral text-sm">
                அகற்று
              </button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-ocean/10 space-y-3">
            <div className="flex gap-2">
              {CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`flex-1 py-1.5 rounded-full text-sm font-semibold border ${
                    city === c ? "bg-ocean text-white border-ocean" : "border-ocean/20 text-ocean/70"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="டெலிவரி முகவரி (விருப்பத்திற்கு)"
              className="w-full border border-ocean/15 rounded-xl p-2 text-sm resize-none h-16 focus:outline-none focus:border-teal"
            />
            <div className="flex items-center justify-between font-heading font-bold text-ocean">
              <span>மொத்தம்</span>
              <span>₹{total.toFixed(0)}</span>
            </div>
            <a
              href={buildWhatsAppLink(checkoutMessage())}
              target="_blank"
              rel="noreferrer"
              className="block text-center bg-coral text-white font-semibold py-3 rounded-full hover:bg-coral/90 transition-colors"
            >
              WhatsApp மூலம் ஆர்டர் செய்யுங்கள்
            </a>
          </div>
        )}
      </aside>
    </>
  )
}
