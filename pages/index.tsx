// import type { NextPage } from 'next'
import {
  InferGetServerSidePropsType,
  // GetServerSidePropsContext,
  GetServerSideProps,
} from 'next'

import Head from 'next/head'
import {
  Box,
  VStack,
  Stack,
  // Avatar,
  Button,
  Flex,
  // Divider,
  chakra,
  Grid,
  Text,
  GridItem,
  Container,
} from '@chakra-ui/react'
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
import { getPosts } from './api/db'

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getPosts()

  console.log('response', data)
  return {
    props: { threads: {} }, // will be passed to the page component as props
  }
}

const Home = ({
  threads,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(threads)
  const postsCollection = collection(firestore, 'posts')

  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Destructure login and logout functions.
  // const { login, logout } = useAuth()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const handleAddPost = async () => {
  //   await addPost({
  //     title: 'Lorem Ipsum dolor',
  //     description: 'This is a description',
  //     createdAt: new Date().toLocaleString(),
  //   })
  // }

  // useEffect(() => {
  //   handleAddPost()
  // }, [])

  return (
    <div>
      <Head>
        <title>Barcode Developer Network</title>
        <meta name="description" content="Next.js firebase todos app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box as={Container} maxW="7xl" my={6} p={4} borderBottomWidth={1}>
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
            }}
            gap={4}
          >
            <GridItem colSpan={1}>
              <VStack alignItems="flex-start" spacing="20px">
                <chakra.h2 fontSize="3xl" fontWeight="700">
                  Medium length title
                </chakra.h2>
                <Button colorScheme="green" size="md">
                  Join Whatsapp
                </Button>
              </VStack>
            </GridItem>
            <GridItem>
              <Flex>
                <chakra.p>
                  Provide your customers a story they would enjoy keeping in
                  mind the objectives of your website. Pay special attention to
                  the tone of voice.
                </chakra.p>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
        <h1>Discussions</h1>

        <div>
          {loading ? (
            <div>
              <h2>Loading</h2>
            </div>
          ) : posts.length === 0 ? (
            <div>
              <h2>Nothing to see here right now</h2>
              {/* <p>
                Consider adding a todo from <a href="/add-todo">here</a>
              </p> */}
            </div>
          ) : (
            posts.map((post: DocumentData) => {
              return (
                <Stack
                  key={post.title}
                  spacing={4}
                  isInline
                  alignItems="center"
                  p={4}
                  borderBottomWidth={1}
                >
                  {/* <Avatar name={post.} src={tweet.author.image} /> */}
                  <Stack>
                    <Text>{post.title}</Text>
                    <Text fontWeight="bold">{post.description}</Text>
                  </Stack>
                </Stack>
              )
            })
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
