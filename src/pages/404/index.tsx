import { Box, Heading, Text, Button } from '@chakra-ui/react'

export default function NotFound() {
  return (
    <Box textAlign="center" py={30} px={6} style={{minHeight:"70vh", margin: "10vh"}}>
      <Heading
        display="inline-block"
        as="h2"
        size="3xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="20px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you&apos;re looking for does not seem to exist
      </Text>

      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid">
        Go to Home
      </Button>
    </Box>
  )
}