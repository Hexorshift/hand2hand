import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { NavigationBar } from './NavigationBar';

function Layout({ children }: { children: ReactNode }) {
  return (
    <Box maxW="768px" mx="auto" p={2}>
      <NavigationBar />
      {children}
    </Box>
  );
}

export default Layout;
