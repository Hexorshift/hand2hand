import { signOut, useSession } from '@/lib/auth-client';
import { Avatar, Button, Flex, Text } from '@chakra-ui/react';

export function NavigationBar() {
  const { data: session } = useSession();

  return (
    <Flex flexDir="row" justifyContent="space-between" alignItems="center">
      <Text fontWeight="bold" fontSize="2xl">
        Hand2Hand 🤝
      </Text>
      <Flex flexDir="row" alignItems="center" gap={2}>
        <Text fontSize="md">Welcome, {session?.user.name}!</Text>
        <Avatar.Root variant="solid">
          <Avatar.Fallback name={session?.user.name} />
          <Avatar.Image />
        </Avatar.Root>
        <Button onClick={async () => await signOut()} borderRadius="xl">
          Log Out
        </Button>
      </Flex>
    </Flex>
  );
}
