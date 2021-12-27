import { useAuth } from '@context/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Login = () => {
  const { login, user } = useAuth()
  const router = useRouter()
  //Redirect user to main page after login
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  return (
    <div>
      <p>Please login</p>
      <button onClick={login}> Login </button>
    </div>
  )
}

export default Login
