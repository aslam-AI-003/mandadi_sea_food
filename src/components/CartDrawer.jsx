import { useState } from "react"
import { CITIES, buildWhatsAppLink } from "../data/constants"
import { useLang } from "../i18n/LanguageContext"
import { submitOrder } from "../firebase"

export default function CartDrawer({ open, onClose, items, onUpdateQty, onRemove }) {
  const { t } = useLang()
  const [city, setCity] = useState(CITIES[0])
  const [address, setAddress] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)

  const total = items.reduce((sum, i) => sum + i.price * i.weight, 0)

  function checkoutMessage() {
    const lines = items.map(
      (i) => `• ${i.name} — ${i.weight}கிலோ x ₹${i.price}/கிலோ = ₹${(i.price * i.weight).toFixed(0)}`
    )
    return [
      t("cart.checkoutIntro"),
      "",
      `பெயர்: ${name}`,
      `மொபைல்: ${phone}`,
      "",
      ...lines,
      "",
      `மொத்தம்: ₹${total.toFixed(0)}`,
      `டெலிவரி நகரம்: ${city}`,
      address ? `முகவரி: ${address}` : "முகவரி: (பின்னாடி சொல்றேன்)",
    ].join("\n")
  }

  async function handleCheckout(e) {
    e.preventDefault()
    if (!name.trim()) return setError(t("cart.nameRequired"))
    if (!phone.trim()) return setError(t("cart.phoneRequired"))

    setError("")
    setSending(true)
    try {
      await submitOrder({
        name: name.trim(),
        phone: phone.trim(),
        city,
        address: address.trim(),
        items,
        total,
      })
    } catch {
      // non-critical: still let the WhatsApp order go through
    } finally {
      setSending(false)
    }
    window.open(buildWhatsAppLink(checkoutMessage()), "_blank")
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
          <h3 className="font-heading font-bold text-ocean text-lg">{t("cart.heading")}</h3>
          <button onClick={onClose} className="text-ocean/60 text-xl" aria-label="Close cart">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 && <p className="text-ocean/50 text-sm">{t("cart.empty")}</p>}
          {items.map((i) => (
            <div key={i.id} className="flex items-center gap-3 border border-ocean/10 rounded-xl p-2">
              <img src={i.image} alt={i.name} className="w-14 h-14 object-cover rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-ocean text-sm truncate">{i.name}</p>
                <p className="text-coral text-sm font-bold">₹{(i.price * i.weight).toFixed(0)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => onUpdateQty(i.id, Math.max(0.5, i.weight - 0.5))}
                    className="w-6 h-6 rounded-full bg-ocean/10 text-ocean text-sm shrink-0"
                  >
                    −
                  </button>
                  <span className="text-xs text-ocean/70">
                    {i.weight} {t("cart.kg")}
                  </span>
                  <button
                    onClick={() => onUpdateQty(i.id, i.weight + 0.5)}
                    className="w-6 h-6 rounded-full bg-ocean/10 text-ocean text-sm shrink-0"
                  >
                    +
                  </button>
                </div>
              </div>
              <button onClick={() => onRemove(i.id)} className="text-ocean/40 hover:text-coral text-sm shrink-0">
                {t("cart.remove")}
              </button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <form onSubmit={handleCheckout} className="p-4 border-t border-ocean/10 space-y-3 overflow-y-auto">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("cart.name")}
              className="w-full border border-ocean/15 rounded-xl p-2 text-sm focus:outline-none focus:border-teal"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("cart.phone")}
              className="w-full border border-ocean/15 rounded-xl p-2 text-sm focus:outline-none focus:border-teal"
            />
            <div className="flex gap-2">
              {CITIES.map((c) => (
                <button
                  key={c}
                  type="button"
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
              placeholder={t("cart.addressPlaceholder")}
              className="w-full border border-ocean/15 rounded-xl p-2 text-sm resize-none h-16 focus:outline-none focus:border-teal"
            />
            {error && <p className="text-coral text-sm">{error}</p>}
            <div className="flex items-center justify-between font-heading font-bold text-ocean">
              <span>{t("cart.total")}</span>
              <span>₹{total.toFixed(0)}</span>
            </div>
            <button
              disabled={sending}
              className="block w-full text-center bg-coral text-white font-semibold py-3 rounded-full hover:bg-coral/90 transition-colors disabled:opacity-50"
            >
              {t("cart.checkoutButton")}
            </button>
          </form>
        )}
      </aside>
    </>
  )
}
