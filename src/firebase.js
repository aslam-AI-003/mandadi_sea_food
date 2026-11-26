import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

let db = null
let auth = null
if (isFirebaseConfigured) {
  const app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  auth = getAuth(app)
}

export { db, addDoc, collection, deleteDoc, doc, increment, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc }

export function signInAdmin(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function signOutAdmin() {
  return signOut(auth)
}

export function onAdminAuthChanged(callback) {
  if (!auth) {
    callback(null)
    return () => {}
  }
  return onAuthStateChanged(auth, callback)
}

const VISIT_SESSION_KEY = "mandaadi_visit_counted"

export async function trackVisit() {
  if (!db) return
  try {
    if (sessionStorage.getItem(VISIT_SESSION_KEY)) return
    sessionStorage.setItem(VISIT_SESSION_KEY, "1")
    await setDoc(doc(db, "stats", "visits"), { count: increment(1) }, { merge: true })
  } catch {
    // non-critical, ignore
  }
}

export async function submitOrder({ name, phone, city, address, items, total }) {
  if (!db) return
  await addDoc(collection(db, "orders"), {
    name,
    phone,
    city,
    address: address || null,
    items: items.map((i) => ({ id: i.id, name: i.name, weight: i.weight, price: i.price })),
    total,
    status: "new",
    createdAt: serverTimestamp(),
  })
}

export async function submitInquiry({ name, phone, message }) {
  if (!db) return
  await addDoc(collection(db, "inquiries"), {
    name,
    phone,
    message,
    status: "new",
    createdAt: serverTimestamp(),
  })
}

export function subscribeCollection(name, callback) {
  if (!db) return () => {}
  const q = query(collection(db, name), orderBy("createdAt", "desc"))
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}

export function subscribeVisitCount(callback) {
  if (!db) return () => {}
  return onSnapshot(doc(db, "stats", "visits"), (snap) => {
    callback(snap.exists() ? snap.data().count || 0 : 0)
  })
}

export async function markDone(collectionName, id) {
  if (!db) return
  await updateDoc(doc(db, collectionName, id), { status: "done" })
}
