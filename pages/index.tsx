import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import * as React from 'react'
import Head from 'next/head'
import {
  // Box,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Avatar,
  Button,
  Flex,
  Wrap,
  Badge,
  chakra,
  useColorModeValue,
  Link,
  // Grid,
  Text,
  // GridItem,
  // Container,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

import { FaWhatsapp } from 'react-icons/fa'
import { getAllUsers } from './api/db'
import { IUser } from '../types/'

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getAllUsers()

  return {
    props: { members: data }, // will be passed to the page component as props
  }
}

const Home = ({
  members,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [searchString, setSearchString] = React.useState<string>('')
  const handleFieldChange = (e: React.FormEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.value)
    setSearchString(e.currentTarget.value)
  }

  const buttonColorMode = useColorModeValue('gray.100', 'gray.800')

  return (
    <div>
      <Head>
        <title>Barcode Developer Network</title>
        <meta name="description" content="Next.js firebase todos app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          mb="6"
        >
          <Flex>
            <chakra.p p="10">
              A public listing of software developers throughout the Caribbean
            </chakra.p>
          </Flex>
          <Link
            external
            href="https://chat.whatsapp.com/KieYFnuqWL7FAQWFYzsp73"
            _hover={{ textDecoration: 'none' }}
          >
            <Button colorScheme="green" size="md" leftIcon={<FaWhatsapp />}>
              Join Whatsapp
            </Button>
          </Link>
        </Flex>

        <Text as="h2" fontSize="3xl" fontWeight="700">
          Members
        </Text>
        <Stack spacing={4} py="6">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              //eslint-disable-next-line
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              placeholder="Search for a developer by typing the skill you're looking for"
              onChange={handleFieldChange}
            />
          </InputGroup>
        </Stack>
        <div>
          {members?.length === 0 ? (
            <div>
              <h2>There are no members</h2>
            </div>
          ) : (
            members
              ?.filter((f: IUser) =>
                f.skills?.some((o: { label: string; value: string }) =>
                  o?.value?.toLowerCase().includes(searchString)
                )
              )
              .map((member: IUser) => {
                return (
                  <Flex
                    key={member.uid}
                    spacing={4}
                    direction={{ base: 'column', md: 'row' }}
                    alignItems="center"
                    justifyContent={'space-between'}
                    p={4}
                    borderBottomWidth={1}
                  >
                    <Stack isInline>
                      <Avatar name={member.name} src={member.photoUrl} />
                      <Stack>
                        <Text>{member.name}</Text>
                        <Text fontWeight="bold">{member.email}</Text>
                      </Stack>
                    </Stack>
                    <Wrap
                      align={'center'}
                      justify={'center'}
                      direction={'row'}
                      m={2}
                    >
                      {member?.skills?.map(
                        (skill: { label: string; value: string }) => (
                          <Badge
                            key={skill.label}
                            px={2}
                            py={1}
                            bg={buttonColorMode}
                            fontWeight={'400'}
                          >
                            #{skill.value}
                          </Badge>
                        )
                      )}
                    </Wrap>
                  </Flex>
                )
              })
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
