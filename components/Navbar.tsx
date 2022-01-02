import { ReactNode } from 'react'
import {
  Box,
  Container,
  Flex,
  Avatar,
  Link,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  // useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useAuth } from '@context/auth'

const NavLink = ({
  children,
  linkTo,
}: {
  children: ReactNode
  linkTo: string
}) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={`/${linkTo.toLowerCase()}`}
  >
    {children}
  </Link>
)

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  // const { isOpen, onOpen, onClose } = useDisclosure()
  // Destructure login and logout functions.
  const { login, logout, user } = useAuth()

  const Links = ['About']

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Flex
            h={16}
            w="full"
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <HStack spacing={8} alignItems={'center'}>
              <Link href="/">Barcode</Link>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                {Links.map((link) => (
                  <NavLink key={link} linkTo={link}>
                    {link}
                  </NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
                {!user ? (
                  <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}
                  >
                    <Button
                      as={'a'}
                      fontSize={'sm'}
                      fontWeight={400}
                      variant={'solid'}
                      colorScheme={'teal'}
                      onClick={login}
                    >
                      Sign In
                    </Button>
                    {/* <Button
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={'pink.400'}
                    href={'#'}
                    _hover={{
                      bg: 'pink.300',
                    }}
                  >
                    Sign Up
                  </Button> */}
                  </Stack>
                ) : (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}
                    >
                      <Avatar size={'sm'} src={user.photoUrl} />
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <br />
                      <Center>
                        <Avatar size={'2xl'} src={user.photoUrl} />
                      </Center>
                      <br />
                      <Center>
                        <p>{user.name}</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>
                        <Link href="/profile">Profile</Link>
                      </MenuItem>
                      {/* <MenuItem>Account Settings</MenuItem> */}
                      <MenuItem onClick={logout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </Stack>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  )
}
