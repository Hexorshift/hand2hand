import { CreateRequest } from '@/components/CreateRequest';
import { Layout } from '@/components/layout/Layout';
import { PrivateRoute } from '@/components/PrivateRoute';
import { Stack, Text } from '@chakra-ui/react';

export function Create() {
  return (
    <PrivateRoute>
      <Layout>
        <Stack gap={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create a Request
          </Text>
          <CreateRequest />
        </Stack>
      </Layout>
    </PrivateRoute>
  );
}
