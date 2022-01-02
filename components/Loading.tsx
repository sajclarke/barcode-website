import { Center, Stack, Text } from '@chakra-ui/react'

const Loading: React.FC = () => {
  return (
    <Center h="100vh" color="gray.800">
      <Stack spacing={4}>
        <Text>One moment please ....</Text>
      </Stack>
    </Center>
  )
}

export default Loading
