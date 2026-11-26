export const WHATSAPP_NUMBER = "919972426009"
export const PHONE_DISPLAY = "+91 99724 26009"
export const INSTAGRAM_HANDLE = "@mandaadi_fresh_seafoods"
export const INSTAGRAM_URL = "https://www.instagram.com/mandaadi_fresh_seafoods/"
export const CITIES = ["சென்னை", "பெங்களூரு"]

export function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
