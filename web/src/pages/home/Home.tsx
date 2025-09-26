import Layout from '@/components/layout/Layout';
import { PrivateRoute } from '@/components/PrivateRoute';
import { useSession } from '@/lib/auth-client';
import {
  Button,
  Card,
  Field,
  Input,
  Stack,
  Text,
  Box,
  Select,
  Portal,
  createListCollection,
  Flex,
  Tag,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { useState } from 'react';
//Needs to get data of the user

export function Home() {
  const { data: session } = useSession();
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const visibilityList = createListCollection({
    items: [
      { label: 'Public', value: 'public' },
      { label: 'Friends', value: 'friends' }
    ]
  });

  return (
    <PrivateRoute>
      <Layout>
        {selectedTags.map((tag: any) => {
          return (
            <Tag.Root>
              <Tag.Label>{tag}</Tag.Label>
            </Tag.Root>
          );
        })}
        <Grid templateColumns="repeat(3, 1fr)">
          {/* Search bar for tags */}
          <GridItem colSpan={2}>
            <Flex flexDir="column" gap={4}>
              <Box>
                <Input
                  placeholder="Search the kind of request!"
                  variant="flushed"
                  value={query}
                  onChange={(e: any) => setQuery(e.target.value)}
                />
              </Box>

              {/* Dropdown for public or friend requests */}
              <Box>
                <Select.Root
                  collection={visibilityList}
                  size="sm"
                  width="320px"
                >
                  <Select.HiddenSelect />
                  <Select.Label>Select framework</Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select framework" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {visibilityList.items.map((visibilityList) => (
                          <Select.Item
                            item={visibilityList}
                            key={visibilityList.value}
                          >
                            {visibilityList.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Box>

              {/* Display for all latest requests */}
              <Card.Root>
                <Card.Title>Cleaning my card</Card.Title>
                <Card.Description>
                  Hello, I need someone to clean my car, specifically the
                  interior of my vehicle
                </Card.Description>
              </Card.Root>
            </Flex>
          </GridItem>
        </Grid>
      </Layout>
    </PrivateRoute>
  );
}
