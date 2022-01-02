import {
  Heading,
  Avatar,
  Box,
  Text,
  // Stack,
  // Button,
  // Link,
  Wrap,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react'
// import { database } from 'firebase-admin'
import { IProfile } from '../types'

const ProfileCard = (props: { data: IProfile | undefined }) => {
  // console.log(props.data)
  const { data } = props
  return (
    <Box
      w={'25%'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
    >
      <Avatar
        size={'xl'}
        src={data?.photoUrl}
        alt={data?.name}
        mb={4}
        pos={'relative'}
        _after={{
          content: '""',
          w: 4,
          h: 4,
          bg: 'green.300',
          border: '2px solid white',
          rounded: 'full',
          pos: 'absolute',
          bottom: 0,
          right: 3,
        }}
      />
      <Heading fontSize={'2xl'} fontFamily={'body'}>
        {data?.name}
      </Heading>
      {/* <Text fontWeight={600} color={'gray.500'} mb={4}>
        @lindsey_jam3s
      </Text> */}
      <Text
        textAlign={'center'}
        color={useColorModeValue('gray.700', 'gray.400')}
        px={3}
      >
        {data?.bio}
      </Text>

      <Wrap align={'center'} justify={'center'} direction={'row'} m={2}>
        {data?.skills?.map((skill) => (
          <Badge
            key={skill.label}
            px={2}
            py={1}
            // bg={useColorModeValue('gray.100', 'gray.800')}
            bg={'gray.100'}
            fontWeight={'400'}
          >
            #{skill.value}
          </Badge>
        ))}
      </Wrap>

      {/* <Stack mt={8} direction={'row'} spacing={4}>
        <Button
          flex={1}
          fontSize={'sm'}
          rounded={'full'}
          _focus={{
            bg: 'gray.200',
          }}
        >
          Message
        </Button>
        <Button
          flex={1}
          fontSize={'sm'}
          rounded={'full'}
          bg={'blue.400'}
          color={'white'}
          boxShadow={
            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
          }
          _hover={{
            bg: 'blue.500',
          }}
          _focus={{
            bg: 'blue.500',
          }}
        >
          Follow
        </Button>
      </Stack> */}
    </Box>
  )
}

export default ProfileCard
