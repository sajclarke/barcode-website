import React from 'react'
import nookies from 'nookies'
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'
import { useAuth } from '@context/auth'
import { firebaseAdmin } from '@utils/adminApp'

const Profile = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const auth = useAuth()
  console.log(auth)
  return (
    <div>
      Profile<p>{props.message}</p>
      <button onClick={auth.logout}> Sign out </button>
    </div>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)

    // the user is authenticated!
    const { uid, email } = token

    // FETCH STUFF HERE!! 🚀

    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    }
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed

    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: { message: `You are logged out` },
    }
  }
}

export default Profile
