import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import FreshUpdates from "./components/FreshUpdates"
import DailyCatch from "./components/DailyCatch"
import Products from "./components/Products"
import DeliveryInfo from "./components/DeliveryInfo"
import About from "./components/About"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import CartDrawer from "./components/CartDrawer"
import FloatingWhatsApp from "./components/FloatingWhatsApp"
import InquiryModal from "./components/InquiryModal"
import Admin from "./pages/Admin"
import { trackVisit } from "./firebase"

function CustomerSite() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [inquiryOpen, setInquiryOpen] = useState(false)

  useEffect(() => {
    trackVisit()
  }, [])

  function addToCart(product, weight = 1) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, weight: i.weight + weight } : i))
      }
      return [...prev, { ...product, weight }]
    })
    setCartOpen(true)
  }

  function updateQty(id, weight) {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, weight } : i)))
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  const cartCount = cart.length

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <Hero />
      <FreshUpdates />
      <DailyCatch onAdd={addToCart} />
      <Products onAdd={addToCart} onInquiry={() => setInquiryOpen(true)} />
      <DeliveryInfo />
      <About />
      <Contact />
      <Footer />

      <FloatingWhatsApp />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />
      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  )
}

function App() {
  const isAdmin = typeof window !== "undefined" && window.location.pathname.startsWith("/admin")
  return isAdmin ? <Admin /> : <CustomerSite />
}

export default App
