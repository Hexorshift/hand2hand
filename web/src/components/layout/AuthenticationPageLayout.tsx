import { Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export function AuthenticationPageLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      px={2}
      data-state="open"
      _open={{
        animation: 'fade-in 300ms ease-out'
      }}
    >
      {children}
    </Flex>
  );
}
