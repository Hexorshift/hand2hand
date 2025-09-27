import {
  Avatar,
  Box,
  Text,
  Separator,
  Flex,
  VStack,
  Tabs,
  Center,
  Spinner,
  HStack,
  Stack
} from '@chakra-ui/react';
import { Request } from '@/components/Request';
import { PrivateRoute } from '@/components/PrivateRoute';
import { Layout } from '@/components/layout/Layout';
import { useSession } from '@/lib/auth-client';
import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '@/lib/apiRequest';

export function Profile() {
  const { data: session } = useSession();
  const [createdRequests, setCreatedRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [acceptedOffers, setAcceptedOffers] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [
        completed,
        created,
        acceptedRequests,
        acceptedOffers,
        pendingRequests
      ] = await Promise.all([
        apiRequest('/requests/user/completed'),
        apiRequest('/requests/user/created'),
        apiRequest('/requests/user/accepted/requests'),
        apiRequest('/requests/user/accepted/offers'),
        apiRequest('/requests/user/pending')
      ]);
      setCreatedRequests(created);
      setAcceptedRequests(acceptedRequests);
      setAcceptedOffers(acceptedOffers);
      setCompletedRequests(completed);
      setPendingRequests(pendingRequests);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PrivateRoute>
      <Layout>
        <Stack gap={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            My Profile
          </Text>
          {/* Profile Picture + Username + Email */}
          <HStack>
            <Avatar.Root size="2xl">
              <Avatar.Fallback name={session?.user.name} />
              <Avatar.Image src={session?.user.image ?? undefined} />
            </Avatar.Root>
            <Box>
              <Text>{session?.user.name}</Text>
              <Text>{session?.user.email}</Text>
            </Box>
          </HStack>
          <Separator />
          <Flex gap={6} flexWrap="wrap">
            {/* Account Created */}
            <VStack align="start">
              <Text color="fg.muted" textStyle="xs" fontWeight="bold">
                Account Created
              </Text>
              <Text color="fg.muted" textStyle="sm">
                {session?.user.createdAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </VStack>

            {/* Last Updated */}
            <VStack align="start">
              <Text color="fg.muted" textStyle="xs" fontWeight="bold">
                Last Updated
              </Text>
              <Text color="fg.muted" textStyle="sm">
                {session?.user.updatedAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </VStack>
          </Flex>

          <Tabs.Root variant="enclosed" defaultValue="created">
            <Tabs.List>
              <Tabs.Trigger value="created">Created Requests</Tabs.Trigger>
              <Tabs.Trigger value="completed">Completed Requests</Tabs.Trigger>
              <Tabs.Trigger value="accepted-requests">
                Accepted Requests
              </Tabs.Trigger>
              <Tabs.Trigger value="accepted-offers">
                Accepted Offers
              </Tabs.Trigger>
              <Tabs.Trigger value="pending">Pending</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="completed">
              {loading && (
                <Center>
                  <Spinner />
                </Center>
              )}
              {!loading && completedRequests.length === 0 && (
                <Text>No completed requests yet!</Text>
              )}
              <Flex flexDir="column" gap={2}>
                {!loading &&
                  completedRequests.map((request: any) => {
                    return (
                      <Request
                        key={request._id}
                        request={request}
                        fetchRequests={fetchData}
                      />
                    );
                  })}
              </Flex>
            </Tabs.Content>
            <Tabs.Content value="created">
              {loading && (
                <Center>
                  <Spinner />
                </Center>
              )}
              {!loading && createdRequests.length === 0 && (
                <Text>No requests created yet!</Text>
              )}
              <Flex flexDir="column" gap={2}>
                {!loading &&
                  createdRequests.map((request: any) => {
                    return (
                      <Request
                        key={request._id}
                        request={request}
                        fetchRequests={fetchData}
                        showAcceptButton={false}
                        showCompleteButton={false}
                      />
                    );
                  })}
              </Flex>
            </Tabs.Content>
            <Tabs.Content value="accepted-requests">
              {loading && (
                <Center>
                  <Spinner />
                </Center>
              )}
              {!loading && acceptedRequests.length === 0 && (
                <Text>No accepted requests yet!</Text>
              )}
              <Flex flexDir="column" gap={2}>
                <Text fontWeight="bold">Your requests other's accepted</Text>
                {!loading &&
                  acceptedRequests.map((request: any) => {
                    return (
                      <Request
                        key={request._id}
                        request={request}
                        fetchRequests={fetchData}
                        showAcceptButton={false}
                        showCompleteButton={true}
                      />
                    );
                  })}
              </Flex>
            </Tabs.Content>
            <Tabs.Content value="accepted-offers">
              {loading && (
                <Center>
                  <Spinner />
                </Center>
              )}
              {!loading && acceptedOffers.length === 0 && (
                <Text>No accepted offers yet!</Text>
              )}
              <Flex flexDir="column" gap={2}>
                <Text fontWeight="bold">
                  Other's requests that you accepted
                </Text>
                {!loading &&
                  acceptedOffers.map((request: any) => {
                    return (
                      <Request
                        key={request._id}
                        request={request}
                        fetchRequests={fetchData}
                        showCompleteButton={true}
                        showAcceptButton={false}
                      />
                    );
                  })}
              </Flex>
            </Tabs.Content>
            <Tabs.Content value="pending">
              {loading && (
                <Center>
                  <Spinner />
                </Center>
              )}
              {!loading && acceptedRequests.length === 0 && (
                <Text>No pending requests yet!</Text>
              )}
              <Flex flexDir="column" gap={2}>
                <Text fontWeight="bold">
                  Your requests that are pending completion
                </Text>
                {!loading &&
                  pendingRequests.map((request: any) => {
                    return (
                      <Request
                        key={request._id}
                        request={request}
                        fetchRequests={fetchData}
                        showAcceptButton={false}
                        showCompleteButton={false}
                      />
                    );
                  })}
              </Flex>
            </Tabs.Content>
          </Tabs.Root>
        </Stack>
      </Layout>
    </PrivateRoute>
  );
}
