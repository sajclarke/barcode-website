// import db from "@utils/adminApp";

import { firestore } from '@utils/clientApp'
import { doc, setDoc } from 'firebase/firestore'

export const createUser = async (uid, data) => {
  //Create user if they do not already exist
  try {
    const docRef = await setDoc(doc(firestore, 'users', uid), { uid, ...data })
    console.log('Document written with ID: ', docRef)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}
