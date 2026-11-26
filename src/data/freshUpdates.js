const KEY = "mandaadi_fresh_updates"
const EVENT = "mandaadi-updates-changed"

export function getFreshUpdates() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export function addFreshUpdate(update) {
  const items = getFreshUpdates()
  items.unshift({ ...update, id: crypto.randomUUID(), createdAt: Date.now() })
  localStorage.setItem(KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(EVENT))
}

export function deleteFreshUpdate(id) {
  const items = getFreshUpdates().filter((i) => i.id !== id)
  localStorage.setItem(KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(EVENT))
}

export function subscribeFreshUpdates(callback) {
  window.addEventListener(EVENT, callback)
  window.addEventListener("storage", callback)
  return () => {
    window.removeEventListener(EVENT, callback)
    window.removeEventListener("storage", callback)
  }
}

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
