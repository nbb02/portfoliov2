// Firebase web config.
//
// These values are public by design: they ship in the client bundle. Security
// is enforced with Firestore security rules, App Check, and API-key referrer
// restrictions in Google Cloud Console — not by hiding this file.
//
// Keeping it in version control means `npm run build` works on a fresh clone
// and in CI without any extra setup.
export const firebaseConfig = {
  apiKey: "AIzaSyAtym0KMRM5iaCmW_5qAYiekr2DtVtmhLc",
  authDomain: "portfolio-492ff.firebaseapp.com",
  projectId: "portfolio-492ff",
  storageBucket: "portfolio-492ff.firebasestorage.app",
  messagingSenderId: "863309550490",
  appId: "1:863309550490:web:f001f35c9678a2a083a023",
  measurementId: "G-J0GFVDSEVK",
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId,
)
