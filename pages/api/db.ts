// import db from "@utils/adminApp";
// import type { NextApiRequest, NextApiResponse } from 'next'

import { firestore } from '@utils/clientApp'
import {
  collection,
  query,
  // where,
  doc,
  addDoc,
  updateDoc,
  setDoc,
  getDocs,
  getDoc,
  // serverTimestamp,
} from 'firebase/firestore'
import { IPost, IUser } from '../../types'

import languages from './data/programminglanguages.json'

type UserData = {
  email: string
  name: string
  provider: string
  photoUrl: string
  skills?: string[]
  bio?: string
}

export const getLanguages = () => {
  return languages
}

export const getAllUsers = async () => {
  try {
    const q = query(collection(firestore, 'users'))
    const response: IUser[] = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data())
      const { name, email, photoUrl, provider, skills } = doc.data()
      response.push({ name, email, photoUrl, provider, skills, uid: doc.id })
      // res.status(200).json({ ...doc.data() })
    })

    return response
  } catch (e) {
    console.error('Error getting document: ', e)
  }
}

export const getUser = async (uid: string) => {
  try {
    const docSnap = await getDoc(doc(firestore, 'users', uid))
    // console.log('User created with ID: ', docRef)
    if (docSnap.exists()) {
      // console.log('Document data:', docSnap.data())
      return { ...docSnap.data() }
    } else {
      // doc.data() will be undefined in this case
      console.log('Could not find user!')
    }
  } catch (e) {
    console.error('Error finding user: ', e)
  }
}

export const createUser = async (uid: string, data: UserData) => {
  //Create user if they do not already exist
  try {
    const docSnap = await getDoc(doc(firestore, 'users', uid))
    // console.log('User created with ID: ', docRef)
    if (!docSnap.exists()) {
      await setDoc(doc(firestore, 'users', uid), { uid, ...data })
    }
    // const docRef =
    // console.log('User created with ID: ', docRef)
    return { message: 'User created successfully' }
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const updateUser = async (
  uid: string | undefined,
  data: {
    uid: string
    name: string
    skills?: { label: string; value: string }[]
    bio?: string
  }
) => {
  if (!uid) {
    return
  }
  //Create user if they do not already exist
  try {
    await updateDoc(doc(firestore, 'users', uid), {
      ...data,
      // updatedAt: serverTimestamp(),
    })
    // console.log('Document updated with ID: ', docRef)
    return { message: 'User updated successfully' }
  } catch (e) {
    console.error('Error updated document: ', e)
  }
}

export const getPosts = async () =>
  // req: NextApiRequest,
  // res: NextApiResponse<Data>
  {
    //Create user if they do not already exist
    try {
      const q = query(collection(firestore, 'posts'))
      const response: IPost[] = []
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data())
        const { title, description, createdAt } = doc.data()
        response.push({ title, description, createdAt, id: doc.id })
        // res.status(200).json({ ...doc.data() })
      })

      return response
    } catch (e) {
      console.error('Error getting document: ', e)
    }
  }

export const getPost = async (postId?: string) =>
  // req: NextApiRequest,
  // res: NextApiResponse<Data>
  {
    if (!postId) {
      return
    }
    //Create user if they do not already exist
    try {
      const docRef = doc(firestore, 'posts', postId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        // console.log('Document data:', docSnap.data())
        return { ...docSnap.data() }
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

export const addPost = async (data: IPost) =>
  // req: NextApiRequest,
  // res: NextApiResponse<Data>
  {
    try {
      const docRef = await addDoc(collection(firestore, 'posts'), {
        ...data,
      })
      console.log('Post created with id: ', docRef)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
