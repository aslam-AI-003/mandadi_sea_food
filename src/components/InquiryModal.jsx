import { useState } from "react"
import { useLang } from "../i18n/LanguageContext"
import { buildWhatsAppLink } from "../data/constants"
import { submitInquiry } from "../firebase"

export default function InquiryModal({ open, onClose }) {
  const { t } = useLang()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  if (!open) return null

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return setError(t("inquiry.nameRequired"))
    if (!phone.trim()) return setError(t("inquiry.phoneRequired"))
    if (!message.trim()) return setError(t("inquiry.messageRequired"))

    setError("")
    setSending(true)
    try {
      await submitInquiry({ name: name.trim(), phone: phone.trim(), message: message.trim() })
      const text = t("inquiry.whatsappTemplate")(name.trim(), phone.trim(), message.trim())
      window.open(buildWhatsAppLink(text), "_blank")
      setSent(true)
    } catch {
      setError(t("inquiry.error"))
    } finally {
      setSending(false)
    }
  }

  function handleClose() {
    setName("")
    setPhone("")
    setMessage("")
    setError("")
    setSent(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-ocean/50 z-[60] flex items-center justify-center px-4" onClick={handleClose}>
      <div
        className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {sent ? (
          <div className="text-center py-4">
            <p className="text-3xl mb-2">✅</p>
            <p className="text-ocean font-semibold mb-4">{t("inquiry.success")}</p>
            <button
              onClick={handleClose}
              className="bg-coral text-white font-semibold px-5 py-2 rounded-full hover:bg-coral/90 transition-colors"
            >
              {t("inquiry.cancel")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 className="font-heading font-bold text-ocean text-lg mb-1">{t("inquiry.heading")}</h3>
            <p className="text-ocean/60 text-sm mb-4">{t("inquiry.subtitle")}</p>

            <label className="block text-sm font-medium text-ocean/70 mb-1">{t("inquiry.name")}</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-ocean/20 rounded-xl px-3 py-2 mb-3 focus:outline-none focus:border-teal"
            />

            <label className="block text-sm font-medium text-ocean/70 mb-1">{t("inquiry.phone")}</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-ocean/20 rounded-xl px-3 py-2 mb-3 focus:outline-none focus:border-teal"
            />

            <label className="block text-sm font-medium text-ocean/70 mb-1">{t("inquiry.message")}</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("inquiry.messagePlaceholder")}
              className="w-full border border-ocean/20 rounded-xl px-3 py-2 mb-3 h-20 resize-none focus:outline-none focus:border-teal"
            />

            {error && <p className="text-coral text-sm mb-3">{error}</p>}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 border border-ocean/20 text-ocean font-semibold py-2.5 rounded-full hover:bg-ocean/5 transition-colors"
              >
                {t("inquiry.cancel")}
              </button>
              <button
                disabled={sending}
                className="flex-1 bg-coral text-white font-semibold py-2.5 rounded-full hover:bg-coral/90 transition-colors disabled:opacity-50"
              >
                {sending ? t("inquiry.sending") : t("inquiry.send")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
