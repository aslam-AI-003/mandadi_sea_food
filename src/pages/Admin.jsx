import { useEffect, useState } from "react"
import { ADMIN_PASSCODE } from "../data/constants"
import {
  addFreshUpdate,
  deleteFreshUpdate,
  fileToDataUrl,
  getFreshUpdates,
  subscribeFreshUpdates,
} from "../data/freshUpdates"
import logo from "../assets/logo.png"

function LoginGate({ onSuccess }) {
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (passcode === ADMIN_PASSCODE) {
      onSuccess()
    } else {
      setError("தவறான கடவுச்சொல்.")
    }
  }

  return (
    <div className="min-h-screen bg-ocean flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <img src={logo} alt="Mandaadi" className="w-14 h-14 rounded-full mx-auto mb-3" />
        <h1 className="font-heading font-bold text-ocean text-xl text-center mb-1">நிர்வாகி உள்நுழைவு</h1>
        <p className="text-ocean/60 text-sm text-center mb-4">Mandaadi Admin Panel</p>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="கடவுச்சொல்"
          className="w-full border border-ocean/20 rounded-xl px-3 py-2 mb-2 focus:outline-none focus:border-teal"
          autoFocus
        />
        {error && <p className="text-coral text-sm mb-2">{error}</p>}
        <button className="w-full bg-coral text-white font-semibold py-2.5 rounded-full hover:bg-coral/90 transition-colors">
          உள்நுழை
        </button>
        <a href="/" className="block text-center text-ocean/50 text-sm mt-3 hover:text-ocean">
          ← வெப்சைட்-க்கு திரும்பு
        </a>
      </form>
    </div>
  )
}

function AdminDashboard() {
  const [updates, setUpdates] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setUpdates(getFreshUpdates())
    return subscribeFreshUpdates(() => setUpdates(getFreshUpdates()))
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (!title.trim()) {
      setError("தலைப்பு கொடுங்க.")
      return
    }
    if (!imageFile && !videoFile) {
      setError("ஒரு படம் அல்லது வீடியோ தேர்ந்தெடுங்க.")
      return
    }

    setSubmitting(true)
    try {
      const image = imageFile ? await fileToDataUrl(imageFile) : null
      const video = videoFile ? await fileToDataUrl(videoFile) : null
      addFreshUpdate({ title: title.trim(), description: description.trim(), image, video })
      setTitle("")
      setDescription("")
      setImageFile(null)
      setVideoFile(null)
      e.target.reset()
    } catch {
      setError("பதிவேற்றம் தோல்வியடைந்தது. சிறிய file-ஐ முயற்சி செய்யுங்க.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-sand">
      <header className="bg-ocean text-white px-4 py-4 flex items-center gap-3">
        <img src={logo} alt="Mandaadi" className="w-9 h-9 rounded-full" />
        <div className="flex-1">
          <h1 className="font-heading font-bold">Mandaadi நிர்வாகி பக்கம்</h1>
          <p className="text-white/70 text-xs">புதிய படங்கள் / வீடியோக்களை இங்க பதிவேற்றுங்க</p>
        </div>
        <a href="/" className="text-sm bg-white/15 px-3 py-1.5 rounded-full hover:bg-white/25">
          வெப்சைட்-க்கு திரும்பு
        </a>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 shadow-sm border border-ocean/5 mb-8">
          <h2 className="font-heading font-semibold text-ocean mb-4">புதிய அப்டேட் சேருங்க</h2>

          <label className="block text-sm font-medium text-ocean/70 mb-1">தலைப்பு</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="உதா: இன்று காலை வஞ்சரம் பிடிப்பு"
            className="w-full border border-ocean/15 rounded-xl px-3 py-2 mb-3 focus:outline-none focus:border-teal"
          />

          <label className="block text-sm font-medium text-ocean/70 mb-1">விளக்கம் (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="சுருக்கமா ஒரு வரி..."
            className="w-full border border-ocean/15 rounded-xl px-3 py-2 mb-3 h-20 resize-none focus:outline-none focus:border-teal"
          />

          <label className="block text-sm font-medium text-ocean/70 mb-1">படம் பதிவேற்று</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full text-sm mb-3"
          />

          <label className="block text-sm font-medium text-ocean/70 mb-1">வீடியோ பதிவேற்று</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            className="w-full text-sm mb-1"
          />
          <p className="text-xs text-ocean/40 mb-3">சிறிய வீடியோ clips (20MB-க்கு கீழ்) பதிவேற்றவும்.</p>

          {error && <p className="text-coral text-sm mb-3">{error}</p>}

          <button
            disabled={submitting}
            className="w-full bg-teal text-white font-semibold py-2.5 rounded-full hover:bg-teal/90 transition-colors disabled:opacity-50"
          >
            {submitting ? "பதிவேற்றுகிறது..." : "பதிவேற்று"}
          </button>
        </form>

        <h2 className="font-heading font-semibold text-ocean mb-3">
          வெளியிடப்பட்ட அப்டேட்ஸ் ({updates.length})
        </h2>
        <div className="space-y-3">
          {updates.length === 0 && <p className="text-ocean/50 text-sm">இன்னும் எதுவும் பதிவேற்றப்படவில்லை.</p>}
          {updates.map((u) => (
            <div key={u.id} className="flex items-center gap-3 bg-white border border-ocean/10 rounded-xl p-3">
              {u.video ? (
                <video src={u.video} className="w-16 h-16 object-cover rounded-lg bg-black" muted />
              ) : (
                <img src={u.image} alt={u.title} className="w-16 h-16 object-cover rounded-lg" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-ocean text-sm">{u.title}</p>
                {u.description && <p className="text-ocean/50 text-xs">{u.description}</p>}
              </div>
              <button
                onClick={() => deleteFreshUpdate(u.id)}
                className="text-coral text-sm font-medium hover:underline"
              >
                அகற்று
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false)

  if (!loggedIn) return <LoginGate onSuccess={() => setLoggedIn(true)} />
  return <AdminDashboard />
}
