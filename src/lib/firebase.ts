import { initializeApp } from "firebase/app"
import { getAnalytics, isSupported } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig, isFirebaseConfigured } from "./firebaseConfig"

export { isFirebaseConfigured }

export const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null

export const db = app ? getFirestore(app) : null

export const analyticsPromise =
  !app || typeof window === "undefined"
    ? Promise.resolve(null)
    : isSupported()
        .then((supported) => (supported ? getAnalytics(app) : null))
        .catch(() => null)
