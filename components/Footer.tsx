import {
  Box,
  Button,
  // chakra,
  Container,
  // Link,
  Stack,
  Text,
  useColorModeValue,
  // VisuallyHidden,
} from '@chakra-ui/react'
import { FaWhatsapp } from 'react-icons/fa'

export default function SmallWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text fontSize={'sm'}>
          © {new Date().getFullYear()} Made to support Caribbean developers
        </Text>
        <Button
          variant={'solid'}
          colorScheme={'teal'}
          size={'sm'}
          mr={4}
          leftIcon={<FaWhatsapp />}
        >
          Join Whatsapp
        </Button>
        <Button variant={'link'} size={'sm'} mr={4}>
          View Github
        </Button>
      </Container>
    </Box>
  )
}
