import { useState } from "react"

const WEIGHTS = [0.5, 1, 2]

export default function ProductCard({ product, onAdd }) {
  const [weight, setWeight] = useState(1)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-ocean/5 overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover"
          style={{ objectPosition: product.imagePosition || "center" }}
        />
        {product.tag && (
          <span className="absolute top-2 left-2 bg-coral text-white text-[11px] font-semibold px-2 py-1 rounded-full">
            {product.tag}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-teal font-semibold mb-1">{product.category}</p>
        <h3 className="font-heading font-semibold text-ocean mb-1">{product.name}</h3>
        <p className="text-coral font-bold mb-3">
          ₹{product.price}
          <span className="text-ocean/50 font-normal text-xs"> /{product.unit}</span>
        </p>

        <div className="flex gap-2 mb-3">
          {WEIGHTS.map((w) => (
            <button
              key={w}
              onClick={() => setWeight(w)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${
                weight === w
                  ? "bg-ocean text-white border-ocean"
                  : "bg-white text-ocean/70 border-ocean/20 hover:border-ocean/50"
              }`}
            >
              {w} கிலோ
            </button>
          ))}
        </div>

        <button
          onClick={() => onAdd(product, weight)}
          className="mt-auto w-full bg-teal text-white text-sm font-semibold py-2 rounded-full hover:bg-teal/90 transition-colors"
        >
          கார்ட்டில் சேருங்கள்
        </button>
      </div>
    </div>
  )
}
