import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import PageWrapper from 'components/PageWrapper'
import { AuthProvider } from '../context/auth'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <PageWrapper>
          <Component {...pageProps} />
        </PageWrapper>
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
