import { Flex, Text } from '@chakra-ui/react';

export function SplashScreen() {
  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Text as="h1" fontWeight="extrabold" fontSize="3xl">
        Hand2Hand 🤝
      </Text>
    </Flex>
  );
}
