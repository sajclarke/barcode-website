import * as firebaseAdmin from 'firebase-admin'

// get this JSON from the Firebase board
// you can also store the values in environment variables
// import serviceAccount from '../certs/barcodenetwork-secret.json'
let serviceAccount
if (typeof process.env.FIREBASE_SERVICE_ACCOUNT_KEY === 'string') {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
}

// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  })
}

export { firebaseAdmin }
