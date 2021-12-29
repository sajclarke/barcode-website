import React from 'react'
// import { useRouter } from 'next/router'
import {
  InferGetServerSidePropsType,
  // GetServerSidePropsContext,
  GetServerSideProps,
} from 'next'
import { useAuth } from '@context/auth'
// import { firebaseAdmin } from '@utils/adminApp'
import { getPost } from 'pages/api/db'
import { ParsedUrlQuery } from 'querystring'

interface Params extends ParsedUrlQuery {
  pid: string
}

const Post = ({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const auth = useAuth()
  console.log(auth, post)
  return <div>Individual Post</div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  // const router = useRouter()
  const { pid } = context.params as Params
  // console.log(pid)
  const post = await getPost(pid)
  // const data = pid ? await getPost(pid) : null

  console.log('response', post)
  return {
    props: { post }, // will be passed to the page component as props
  }
}

export default Post
