import { Layout } from '@/components/layout/Layout';
import { PrivateRoute } from '@/components/PrivateRoute';
import { Request } from '@/components/Request';
import { apiRequest } from '@/lib/apiRequest';
import { useSession } from '@/lib/auth-client';
import {
  Input,
  Select,
  Portal,
  createListCollection,
  Tag,
  GridItem,
  SimpleGrid,
  Stack,
  Text,
  Field,
  Slider,
  HStack,
  Spinner,
  Center,
  Flex,
  IconButton
} from '@chakra-ui/react';
import { IoReload } from 'react-icons/io5';
import { useCallback, useEffect, useState } from 'react';

export function Home() {
  const { data: session } = useSession();
  const [query, setQuery] = useState('');
  // const [selectedTags, setSelectedTags] = useState([]);
  const [visiblity, setVisiblity] = useState<string[]>(['public']);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const visibilityList = createListCollection({
    items: [
      { label: 'Public', value: 'public' },
      { label: 'Friends', value: 'friends' }
    ]
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiRequest('/requests');
      setRequests(response);
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
            Welcome, {session?.user.name}
          </Text>
          {/* All tags selected */}
          {/* {selectedTags.map((tag: any) => {
            return (
              <Tag.Root>
                <Tag.Label>{tag}</Tag.Label>
              </Tag.Root>
            );
          })} */}
          {/* Search bar for tags */}
          <Field.Root>
            <Input
              placeholder="Search for a request by content, tag or location"
              variant="flushed"
              value={query}
              onChange={(e: any) => setQuery(e.target.value)}
            />
          </Field.Root>

          {/* Gird layout */}
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
            {/* FILTERS */}
            <GridItem colSpan={1}>
              <Stack gap={2}>
                <Text as="h1" fontSize="xl" fontWeight="bold" color="fg">
                  Requests
                </Text>
                {/* Dropdown for public or friend requests */}
                <Select.Root
                  collection={visibilityList}
                  value={visiblity}
                  onValueChange={(e) => setVisiblity(e.value)}
                >
                  <Select.HiddenSelect />
                  <Select.Label fontWeight="bold">Visiblity</Select.Label>
                  <Select.Control>
                    <Select.Trigger borderRadius="xl">
                      <Select.ValueText placeholder="" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content borderRadius="xl">
                        {visibilityList.items.map((visibilityList) => (
                          <Select.Item
                            item={visibilityList}
                            key={visibilityList.value}
                            borderRadius="xl"
                          >
                            {visibilityList.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>

                {/* Slider for # of hours */}
                <Slider.Root defaultValue={[0]} min={1} max={24} step={1} m={2}>
                  <HStack justify="space-between">
                    <Slider.Label>Hours</Slider.Label>
                    <Slider.ValueText />
                  </HStack>
                  <Slider.Control>
                    <Slider.Track>
                      <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumbs />
                  </Slider.Control>
                </Slider.Root>

                {/* Slider for # of miles */}
                <Slider.Root
                  defaultValue={[0]}
                  min={1}
                  max={5}
                  step={0.5}
                  m={2}
                >
                  <HStack justify="space-between">
                    <Slider.Label>Miles</Slider.Label>
                    <Slider.ValueText />
                  </HStack>
                  <Slider.Control>
                    <Slider.Track>
                      <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumbs />
                  </Slider.Control>
                </Slider.Root>
              </Stack>
            </GridItem>

            {/* REQUEST FORUM */}
            <GridItem colSpan={2}>
              <Stack gap={2}>
                {/* LIST OF REQUESTS*/}
                <Flex justifyContent="space-between" alignItems="center">
                  <Text as="h1" fontSize="xl" fontWeight="bold" color="fg">
                    Requests
                  </Text>
                  <IconButton size="sm" borderRadius="xl" onClick={fetchData}>
                    <IoReload />
                  </IconButton>
                </Flex>

                {loading && (
                  <Center mt={2}>
                    <Spinner />
                  </Center>
                )}
                {!loading && requests.length === 0 && (
                  <Text>No requests found : (</Text>
                )}
                {!loading &&
                  requests.map((request: any) => {
                    return (
                      <Request
                        key={request._id}
                        request={request}
                        fetchRequests={fetchData}
                        showAcceptButton={true}
                        showCompleteButton={false}
                      />
                    );
                  })}
              </Stack>
            </GridItem>
          </SimpleGrid>
        </Stack>
      </Layout>
    </PrivateRoute>
  );
}
