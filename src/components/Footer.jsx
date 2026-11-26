import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY } from "../data/constants"
import logo from "../assets/logo.png"

export default function Footer() {
  return (
    <footer className="bg-ocean text-white/70 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-heading font-bold text-white">
          <img src={logo} alt="Mandaadi Fresh Seafoods" className="w-7 h-7 rounded-full object-cover" />
          Mandaadi Fresh Seafoods
        </p>
        <div className="flex items-center gap-4">
          <span>{PHONE_DISPLAY}</span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-white">
            {INSTAGRAM_HANDLE}
          </a>
        </div>
        <p>© {new Date().getFullYear()} Mandaadi Fresh Seafoods. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.</p>
      </div>
      <div className="text-center pb-4">
        <a href="/admin" className="text-white/30 text-xs hover:text-white/60">
          நிர்வாகி
        </a>
      </div>
    </footer>
  )
}
