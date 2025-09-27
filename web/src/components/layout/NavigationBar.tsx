import { signOut, useSession } from '@/lib/auth-client';
import { Avatar, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { Link } from 'wouter';

export function NavigationBar() {
  const { data: session } = useSession();

  return (
    <Flex
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <HStack gap={4}>
        <Link href="/">
          <Text fontWeight="bold" fontSize="2xl">
            Hand2Hand 🤝
          </Text>
        </Link>

        <HStack gap={6}>
          <Link href="/">
            <Text fontWeight="bold">Home</Text>
          </Link>
          <Link href="/create">
            <Text fontWeight="bold">Create</Text>
          </Link>
          <Link href="/profile">
            <Text fontWeight="bold">Profile</Text>
          </Link>
        </HStack>
      </HStack>

      <Flex flexDir="row" alignItems="center" gap={2}>
        <Link href="/profile">
          <Avatar.Root variant="solid">
            <Avatar.Fallback name={session?.user.name} />
            <Avatar.Image src={session?.user.image ?? undefined} />
          </Avatar.Root>
        </Link>

        <Button onClick={async () => await signOut()} borderRadius="xl">
          Log Out
        </Button>
      </Flex>
    </Flex>
  );
}
