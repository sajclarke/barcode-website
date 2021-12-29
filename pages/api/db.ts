// import db from "@utils/adminApp";
// import type { NextApiRequest, NextApiResponse } from 'next'

import { firestore } from '@utils/clientApp'
import {
  collection,
  query,
  // where,
  doc,
  addDoc,
  setDoc,
  getDocs,
  getDoc,
} from 'firebase/firestore'
import { IPost } from '../../types'

type UserData = {
  email: string
  name: string
  provider: string
  photoUrl: string
}

export const createUser = async (uid: string, data: UserData) => {
  //Create user if they do not already exist
  try {
    const docRef = await setDoc(doc(firestore, 'users', uid), { uid, ...data })
    console.log('Document written with ID: ', docRef)
  } catch (e) {
    console.error('Error adding document: ', e)
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
