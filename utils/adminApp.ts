import * as firebaseAdmin from 'firebase-admin'

// get this JSON from the Firebase board
// you can also store the values in environment variables
// import serviceAccount from '../certs/barcodenetwork-secret.json'

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
)

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      serviceAccount.replace(/\\n/g, '\n')
    ),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  })
}

export { firebaseAdmin }
