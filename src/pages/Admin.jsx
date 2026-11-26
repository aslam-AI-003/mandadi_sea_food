import { useEffect, useRef, useState } from "react"
import {
  addFreshUpdate,
  deleteFreshUpdate,
  fileToDataUrl,
  getFreshUpdates,
  subscribeFreshUpdates,
} from "../data/freshUpdates"
import {
  isFirebaseConfigured,
  markDone,
  onAdminAuthChanged,
  signInAdmin,
  signOutAdmin,
  subscribeCollection,
  subscribeVisitCount,
} from "../firebase"
import { useLang } from "../i18n/LanguageContext"
import LanguageToggle from "../components/LanguageToggle"
import logo from "../assets/logo.png"

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 880
    gain.gain.value = 0.15
    osc.start()
    setTimeout(() => {
      osc.stop()
      ctx.close()
    }, 250)
  } catch {
    // audio not supported, ignore
  }
}

function formatTime(ts) {
  if (!ts) return ""
  try {
    return ts.toDate().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
  } catch {
    return ""
  }
}

function LoginGate() {
  const { t } = useLang()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await signInAdmin(email.trim(), password)
    } catch {
      setError(t("admin.loginFailed"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ocean flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <div className="flex justify-end mb-2">
          <LanguageToggle />
        </div>
        <img src={logo} alt="Mandaadi" className="w-14 h-14 rounded-full mx-auto mb-3" />
        <h1 className="font-heading font-bold text-ocean text-xl text-center mb-1">{t("admin.loginHeading")}</h1>
        <p className="text-ocean/60 text-sm text-center mb-4">{t("admin.loginSub")}</p>

        {!isFirebaseConfigured && (
          <p className="bg-coral/10 text-coral text-sm rounded-xl p-3 mb-3">{t("admin.authFirebaseMissing")}</p>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("admin.emailPlaceholder")}
          className="w-full border border-ocean/20 rounded-xl px-3 py-2 mb-2 focus:outline-none focus:border-teal"
          autoFocus
          disabled={!isFirebaseConfigured}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("admin.passwordPlaceholder")}
          className="w-full border border-ocean/20 rounded-xl px-3 py-2 mb-2 focus:outline-none focus:border-teal"
          disabled={!isFirebaseConfigured}
        />
        {error && <p className="text-coral text-sm mb-2">{error}</p>}
        <button
          disabled={!isFirebaseConfigured || loading}
          className="w-full bg-coral text-white font-semibold py-2.5 rounded-full hover:bg-coral/90 transition-colors disabled:opacity-50"
        >
          {loading ? t("admin.loggingIn") : t("admin.loginButton")}
        </button>
        <a href="/" className="block text-center text-ocean/50 text-sm mt-3 hover:text-ocean">
          {t("admin.backToSite")}
        </a>
      </form>
    </div>
  )
}

function NotificationBanner({ message, onDismiss }) {
  const { t } = useLang()
  if (!message) return null
  return (
    <div className="fixed top-4 inset-x-4 sm:inset-x-auto sm:right-4 z-50 bg-coral text-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-3 max-w-sm">
      <p className="text-sm font-semibold flex-1">{message}</p>
      <button onClick={onDismiss} className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
        {t("admin.dismiss")}
      </button>
    </div>
  )
}

function StatTile({ label, value }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-ocean/10 shadow-sm flex-1 min-w-[140px]">
      <p className="text-ocean/50 text-xs mb-1">{label}</p>
      <p className="text-2xl font-heading font-bold text-ocean">{value}</p>
    </div>
  )
}

function OrdersList({ orders, t }) {
  if (orders.length === 0) return <p className="text-ocean/50 text-sm">{t("admin.noOrders")}</p>
  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <div key={o.id} className="bg-white border border-ocean/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-ocean">
              {o.name} <span className="text-ocean/50 font-normal">· {o.phone}</span>
            </p>
            {o.status === "new" && (
              <span className="bg-coral text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {t("admin.newBadge")}
              </span>
            )}
          </div>
          <p className="text-xs text-ocean/50 mb-2">{formatTime(o.createdAt)}</p>
          <ul className="text-sm text-ocean/70 mb-2 space-y-0.5">
            {(o.items || []).map((i, idx) => (
              <li key={idx}>
                • {i.name} — {i.weight}கிலோ x ₹{i.price}
              </li>
            ))}
          </ul>
          <p className="text-sm text-ocean/70 mb-1">
            {o.city} {o.address ? `· ${o.address}` : ""}
          </p>
          <div className="flex items-center justify-between">
            <p className="font-bold text-coral">₹{o.total?.toFixed?.(0) ?? o.total}</p>
            {o.status === "new" && (
              <button
                onClick={() => markDone("orders", o.id)}
                className="text-teal text-sm font-semibold hover:underline"
              >
                {t("admin.markDone")}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function MessagesList({ messages, t }) {
  if (messages.length === 0) return <p className="text-ocean/50 text-sm">{t("admin.noMessages")}</p>
  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <div key={m.id} className="bg-white border border-ocean/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-ocean">
              {m.name} <span className="text-ocean/50 font-normal">· {m.phone}</span>
            </p>
            {m.status === "new" && (
              <span className="bg-coral text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {t("admin.newBadge")}
              </span>
            )}
          </div>
          <p className="text-xs text-ocean/50 mb-2">{formatTime(m.createdAt)}</p>
          <p className="text-sm text-ocean/80 mb-2">{m.message}</p>
          {m.status === "new" && (
            <button
              onClick={() => markDone("inquiries", m.id)}
              className="text-teal text-sm font-semibold hover:underline"
            >
              {t("admin.markDone")}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

function UpdatesTab({ t }) {
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
      setError(t("admin.titleRequired"))
      return
    }
    if (!imageFile && !videoFile) {
      setError(t("admin.mediaRequired"))
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
      setError(t("admin.uploadFailed"))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 shadow-sm border border-ocean/5 mb-8">
        <h2 className="font-heading font-semibold text-ocean mb-4">{t("admin.newUpdateHeading")}</h2>

        <label className="block text-sm font-medium text-ocean/70 mb-1">{t("admin.titleLabel")}</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("admin.titlePlaceholder")}
          className="w-full border border-ocean/15 rounded-xl px-3 py-2 mb-3 focus:outline-none focus:border-teal"
        />

        <label className="block text-sm font-medium text-ocean/70 mb-1">{t("admin.descLabel")}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t("admin.descPlaceholder")}
          className="w-full border border-ocean/15 rounded-xl px-3 py-2 mb-3 h-20 resize-none focus:outline-none focus:border-teal"
        />

        <label className="block text-sm font-medium text-ocean/70 mb-1">{t("admin.imageLabel")}</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full text-sm mb-3"
        />

        <label className="block text-sm font-medium text-ocean/70 mb-1">{t("admin.videoLabel")}</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
          className="w-full text-sm mb-1"
        />
        <p className="text-xs text-ocean/40 mb-3">{t("admin.videoHint")}</p>

        {error && <p className="text-coral text-sm mb-3">{error}</p>}

        <button
          disabled={submitting}
          className="w-full bg-teal text-white font-semibold py-2.5 rounded-full hover:bg-teal/90 transition-colors disabled:opacity-50"
        >
          {submitting ? t("admin.submitting") : t("admin.upload")}
        </button>
      </form>

      <h2 className="font-heading font-semibold text-ocean mb-3">
        {t("admin.publishedHeading")} ({updates.length})
      </h2>
      <div className="space-y-3">
        {updates.length === 0 && <p className="text-ocean/50 text-sm">{t("admin.noUpdates")}</p>}
        {updates.map((u) => (
          <div key={u.id} className="flex items-center gap-3 bg-white border border-ocean/10 rounded-xl p-3">
            {u.video ? (
              <video src={u.video} className="w-16 h-16 object-cover rounded-lg bg-black" muted />
            ) : (
              <img src={u.image} alt={u.title} className="w-16 h-16 object-cover rounded-lg" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-ocean text-sm truncate">{u.title}</p>
              {u.description && <p className="text-ocean/50 text-xs truncate">{u.description}</p>}
            </div>
            <button
              onClick={() => deleteFreshUpdate(u.id)}
              className="text-coral text-sm font-medium hover:underline shrink-0"
            >
              {t("cart.remove")}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

function AdminDashboard() {
  const { t } = useLang()
  const [tab, setTab] = useState("orders")
  const [orders, setOrders] = useState([])
  const [messages, setMessages] = useState([])
  const [visitCount, setVisitCount] = useState(0)
  const [banner, setBanner] = useState("")

  const ordersSeen = useRef(false)
  const messagesSeen = useRef(false)

  useEffect(() => {
    if (!isFirebaseConfigured) return
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }

    const unsubOrders = subscribeCollection("orders", (docs) => {
      if (ordersSeen.current) {
        const prevIds = new Set(orders.map((o) => o.id))
        const added = docs.filter((d) => !prevIds.has(d.id))
        if (added.length > 0) {
          playBeep()
          setBanner(t("admin.newOrderAlert"))
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification(t("admin.newOrderAlert"))
          }
        }
      }
      ordersSeen.current = true
      setOrders(docs)
    })

    const unsubMessages = subscribeCollection("inquiries", (docs) => {
      if (messagesSeen.current) {
        const prevIds = new Set(messages.map((m) => m.id))
        const added = docs.filter((d) => !prevIds.has(d.id))
        if (added.length > 0) {
          playBeep()
          setBanner(t("admin.newMessageAlert"))
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification(t("admin.newMessageAlert"))
          }
        }
      }
      messagesSeen.current = true
      setMessages(docs)
    })

    const unsubVisits = subscribeVisitCount(setVisitCount)

    return () => {
      unsubOrders()
      unsubMessages()
      unsubVisits()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const newOrders = orders.filter((o) => o.status === "new").length
  const newMessages = messages.filter((m) => m.status === "new").length

  return (
    <div className="min-h-screen bg-sand">
      <NotificationBanner message={banner} onDismiss={() => setBanner("")} />
      <header className="bg-ocean text-white px-4 py-4 flex items-center gap-3">
        <img src={logo} alt="Mandaadi" className="w-9 h-9 rounded-full shrink-0" />
        <div className="flex-1 min-w-0">
          <h1 className="font-heading font-bold truncate">{t("admin.dashboardTitle")}</h1>
          <p className="text-white/70 text-xs truncate">{t("admin.dashboardSub")}</p>
        </div>
        <LanguageToggle className="shrink-0" />
        <button
          onClick={() => signOutAdmin()}
          className="shrink-0 text-sm bg-white/15 px-3 py-1.5 rounded-full hover:bg-white/25 whitespace-nowrap"
        >
          {t("admin.logout")}
        </button>
        <a
          href="/"
          className="shrink-0 text-sm bg-white/15 px-3 py-1.5 rounded-full hover:bg-white/25 whitespace-nowrap"
        >
          {t("admin.backToSiteShort")}
        </a>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {!isFirebaseConfigured && (
          <p className="bg-coral/10 text-coral text-sm rounded-xl p-3 mb-4">{t("admin.firebaseMissing")}</p>
        )}

        <div className="flex gap-3 mb-6 overflow-x-auto pb-1">
          <StatTile label={t("admin.visitorsLabel")} value={visitCount} />
          <StatTile label={t("admin.ordersLabel")} value={orders.length} />
          <StatTile label={t("admin.messagesLabel")} value={messages.length} />
        </div>

        <div className="flex gap-2 mb-5">
          {[
            { key: "orders", label: t("admin.tabOrders"), badge: newOrders },
            { key: "messages", label: t("admin.tabMessages"), badge: newMessages },
            { key: "updates", label: t("admin.tabUpdates"), badge: 0 },
          ].map((tb) => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={`relative px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                tab === tb.key ? "bg-ocean text-white border-ocean" : "bg-white text-ocean/70 border-ocean/15"
              }`}
            >
              {tb.label}
              {tb.badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-coral text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {tb.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {tab === "orders" && <OrdersList orders={orders} t={t} />}
        {tab === "messages" && <MessagesList messages={messages} t={t} />}
        {tab === "updates" && <UpdatesTab t={t} />}
      </div>
    </div>
  )
}

export default function Admin() {
  const [user, setUser] = useState(undefined)

  useEffect(() => onAdminAuthChanged(setUser), [])

  if (user === undefined) return null
  if (!user) return <LoginGate />
  return <AdminDashboard />
}
