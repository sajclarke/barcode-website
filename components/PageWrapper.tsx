import type { ReactNode } from 'react'
import { Flex, Container, Stack } from '@chakra-ui/react'
import Navbar from './Navbar'
import Footer from './Footer'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex direction="column" h="100vh">
      <Navbar />
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column' }}
        flex="1"
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        {children}
      </Container>
      <Footer />
    </Flex>
  )
}
