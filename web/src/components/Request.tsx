import dayjs from 'dayjs';
import {
  Avatar,
  Button,
  Card,
  Flex,
  Separator,
  Stack,
  Tabs,
  Text
} from '@chakra-ui/react';
import { useSession } from '@/lib/auth-client';
import { apiRequest } from '@/lib/apiRequest';
import { useState } from 'react';

export function Request({
  request,
  fetchRequests,
  showCompleteButton = false,
  showAcceptButton = false
}: {
  request: any;
  fetchRequests: any;
  showCompleteButton?: any;
  showAcceptButton?: any;
}) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const acceptRequest = async () => {
    try {
      setLoading(true);
      const response = await apiRequest(`/requests/${request._id}/accept`, {
        method: 'POST'
      });

      if (response.success) {
        fetchRequests();
      }
    } finally {
      setLoading(false);
    }
  };

  const completeRequest = async () => {
    try {
      setLoading(true);
      const response = await apiRequest(`/requests/${request._id}/complete`, {
        method: 'POST'
      });

      if (response.success) {
        fetchRequests();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card.Root borderRadius="xl">
      <Card.Body p={2}>
        {/* Avatar + Username */}
        <Flex alignItems="center" gap={2}>
          <Avatar.Root>
            <Avatar.Fallback name={request.requester.name} />
            <Avatar.Image src={request.requester.image} />
          </Avatar.Root>
          <Stack gap={1}>
            <Text color="fg.muted" textStyle="sm">
              {request.requester.name}
            </Text>
            <Text color="fg.muted" textStyle="sm">
              {dayjs(request.createdAt).format('MMMM D, YYYY')}
            </Text>
          </Stack>
        </Flex>

        {/* Request + Offer */}
        <Tabs.Root defaultValue="request">
          <Tabs.List>
            <Tabs.Trigger value="request">Request</Tabs.Trigger>
            <Tabs.Trigger value="offer">Offer</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="request" p={0}>
            <Text>{request.request}</Text>
          </Tabs.Content>
          <Tabs.Content value="offer" p={0}>
            <Text>{request.offer}</Text>
          </Tabs.Content>
        </Tabs.Root>

        {/* Due date + Location */}
        <Flex flexDir="row" gap={1} color="fg.muted" textStyle="sm">
          <Text>By {dayjs(request.dueDate).format('MMMM D, YYYY')}</Text>
          <Text>@ {request.location ?? 'Unknown Location'}</Text>
        </Flex>
      </Card.Body>
      {showCompleteButton && (
        <>
          <Separator />
          <Card.Footer p={2}>
            <Button
              variant="subtle"
              colorPalette="green"
              borderRadius="xl"
              flex={1}
              loading={loading}
              onClick={completeRequest}
            >
              Mark Complete
            </Button>
          </Card.Footer>
        </>
      )}
      {showAcceptButton && (
        <>
          <Card.Footer p={2}>
            <Button
              variant="subtle"
              colorPalette="green"
              borderRadius="xl"
              flex={1}
              disabled={request.requester._id === session?.user.id}
              loading={loading}
              onClick={acceptRequest}
            >
              Accept
            </Button>
          </Card.Footer>
        </>
      )}
    </Card.Root>
  );
}
