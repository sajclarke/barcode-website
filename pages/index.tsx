import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@styles/Home.module.css'
import { firestore } from '@utils/clientApp'
import { useEffect, useState } from 'react'
import {
  collection,
  QueryDocumentSnapshot,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  query,
  // where,
  limit,
  // getDocs,
} from '@firebase/firestore'

// Import useAuth from context
import { useAuth } from '@context/auth'

const Home: NextPage = () => {
  const postsCollection = collection(firestore, 'posts')

  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Destructure login and logout functions.
  const { login, logout } = useAuth()

  useEffect(() => {
    const q = query(postsCollection, limit(10))

    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot) => {
      setPosts(
        snapshot.docs.map((doc: DocumentData) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Barcode app</title>
        <meta name="description" content="Next.js firebase todos app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>List of Posts</h1>
        <div className={styles.cardActions}>
          <button onClick={login}> Login </button>
          <button onClick={logout}> Logout </button>
        </div>
        <div className={styles.grid}>
          {loading ? (
            <div className={styles.card}>
              <h2>Loading</h2>
            </div>
          ) : posts.length === 0 ? (
            <div className={styles.card}>
              <h2>No undone todos</h2>
              <p>
                Consider adding a todo from <a href="/add-todo">here</a>
              </p>
            </div>
          ) : (
            posts.map((post: DocumentData) => {
              return (
                <div key={post.id} className={styles.card}>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <div className={styles.cardActions}>
                    <button type="button">Comments</button>
                    <button type="button">View</button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="#" rel="noopener noreferrer">
          Todos app
        </a>
      </footer>
    </div>
  )
}
export default Home
