import { useState } from "react"
import { CATEGORIES, PRODUCTS } from "../data/products"
import ProductCard from "./ProductCard"

export default function Products({ onAdd }) {
  const [category, setCategory] = useState("அனைத்தும்")

  const filtered =
    category === "அனைத்தும்" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)

  return (
    <section id="products" className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="font-heading font-bold text-2xl md:text-3xl text-ocean mb-1">எங்கள் பொருட்கள்</h2>
      <p className="text-ocean/60 mb-6">புதிய மீன், இறால், நண்டு &amp; சாஷிமி தர துண்டுகள்.</p>

      <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              category === c
                ? "bg-coral text-white border-coral"
                : "bg-white text-ocean/70 border-ocean/15 hover:border-coral/60"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </section>
  )
}
