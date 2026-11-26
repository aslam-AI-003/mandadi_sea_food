import { useEffect, useState } from "react"
import { getFreshUpdates, subscribeFreshUpdates } from "../data/freshUpdates"

export default function FreshUpdates() {
  const [updates, setUpdates] = useState([])

  useEffect(() => {
    setUpdates(getFreshUpdates())
    const unsubscribe = subscribeFreshUpdates(() => setUpdates(getFreshUpdates()))
    return unsubscribe
  }, [])

  if (updates.length === 0) return null

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="font-heading font-bold text-2xl md:text-3xl text-ocean mb-1">
        Mandaadi-யிலிருந்து புதிய அப்டேட்ஸ்
      </h2>
      <p className="text-ocean/60 mb-6">நேரடியாக கடற்கரையில் இருந்து — புதிய படங்களும் வீடியோக்களும்.</p>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
        {updates.map((u) => (
          <div
            key={u.id}
            className="snap-start shrink-0 w-64 bg-white rounded-2xl shadow-sm border border-ocean/5 overflow-hidden"
          >
            {u.video ? (
              <video src={u.video} controls playsInline className="w-full h-40 object-cover bg-black" />
            ) : (
              <img src={u.image} alt={u.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-3">
              <h3 className="font-heading font-semibold text-ocean text-sm mb-1">{u.title}</h3>
              {u.description && <p className="text-ocean/60 text-xs">{u.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
