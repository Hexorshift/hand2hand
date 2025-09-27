import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { NavigationBar } from './NavigationBar';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box maxW="768px" mx="auto" px={2} py={4}>
      <NavigationBar />
      {children}
    </Box>
  );
}
