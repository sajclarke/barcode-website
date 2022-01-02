import React from 'react'
import nookies from 'nookies'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { firebaseAdmin } from '@utils/adminApp'
import ProfileForm from '@components/forms/ProfileForm'
import ProfileCard from '@components/ProfileCard'
import Loading from '@components/Loading'
import { Flex, useToast } from '@chakra-ui/react'

import { getUser, updateUser } from './api/db'
import { IProfile } from '../types'

const Profile = (props: { userInfo: IProfile }) => {
  const { userInfo } = props
  // console.log(userInfo)
  const toast = useToast()
  const router = useRouter()

  const refreshData = () => {
    //Hacky method of refreshing the page using server side data
    router.replace(router.asPath)
  }

  const handleSaveProfile = async (data: {
    uid: string
    userName: string
    userSkills?: { label: string; value: string }[]
    userBio?: string
  }) => {
    console.log(data)
    await updateUser(data?.uid, {
      uid: data?.uid,
      name: data?.userName,
      bio: data?.userBio,
      skills: data?.userSkills,
    }).then((res: { message: string } | undefined) => {
      toast({ title: res?.message })
      refreshData()
    })
  }

  return (
    <>
      {!userInfo ? (
        <Loading />
      ) : (
        <Flex w="full">
          <ProfileCard data={userInfo} />
          <ProfileForm initialValues={userInfo} onSave={handleSaveProfile} />
        </Flex>
      )}
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)

    // the user is authenticated!
    const { uid, email } = token

    // FETCH STUFF HERE!! 🚀
    const userInfo = await getUser(uid)
    // console.log(userInfo)
    return {
      props: {
        message: `Your email is ${email} and your UID is ${uid}.`,
        userInfo,
      },
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
