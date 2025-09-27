import { apiRequest } from '@/lib/apiRequest';
import {
  Button,
  Card,
  createListCollection,
  Field,
  GridItem,
  Input,
  NumberInput,
  Popover,
  Portal,
  Select,
  SimpleGrid,
  Stack
} from '@chakra-ui/react';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useLocation } from 'wouter';

export function CreateRequest() {
  const [_, navigate] = useLocation();
  const [request, setRequest] = useState('');
  const [offer, setOffer] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('1');
  const [dueDate, setDueDate] = useState<Date>();
  const [visiblity, setVisiblity] = useState<string[]>(['public']);
  const [loading, setLoading] = useState(false);

  const visibilityList = createListCollection({
    items: [
      { label: 'Public', value: 'public' },
      { label: 'Friends', value: 'friends' }
    ]
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await apiRequest('/requests', {
        method: 'POST',
        body: {
          request,
          offer,
          duration: Number(duration),
          dueDate: dueDate?.toISOString(),
          visiblity: visiblity[0],
          location
        }
      });

      if (response.success) {
        navigate('/home');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card.Root borderRadius="xl">
      <Card.Body p={2}>
        <Stack gap={2}>
          <Field.Root>
            <Input
              type="text"
              variant="flushed"
              placeholder="What are you requesting?"
              value={request}
              onChange={({ target: { value } }) => setRequest(value)}
            />
          </Field.Root>
          <Field.Root>
            <Input
              type="text"
              variant="flushed"
              placeholder="What are you offering in exchange for the request?"
              value={offer}
              onChange={({ target: { value } }) => setOffer(value)}
            />
          </Field.Root>
          <Field.Root>
            <Input
              type="text"
              variant="flushed"
              placeholder="Location"
              value={location}
              onChange={({ target: { value } }) => setLocation(value)}
            />
          </Field.Root>
          <SimpleGrid columns={3} gap={2}>
            <GridItem>
              <Field.Root>
                <Field.Label fontWeight="bold">Duration (Hours)</Field.Label>
                <NumberInput.Root
                  value={duration}
                  onValueChange={({ value }) => setDuration(value)}
                  min={0}
                  width="100%"
                >
                  <NumberInput.Control />
                  <NumberInput.Input borderRadius="xl" />
                </NumberInput.Root>
              </Field.Root>
            </GridItem>
            <GridItem>
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
            </GridItem>
            <GridItem>
              <Field.Root>
                <Field.Label fontWeight="bold">Due Date</Field.Label>
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <Button borderRadius="xl" width="100%">
                      {dueDate?.toLocaleDateString() ?? 'Pick'}
                    </Button>
                  </Popover.Trigger>
                  <Portal>
                    <Popover.Positioner>
                      <Popover.Content borderRadius="xl">
                        <Popover.Arrow />
                        <Popover.Body>
                          <DayPicker
                            mode="single"
                            selected={dueDate}
                            onSelect={setDueDate}
                          />
                        </Popover.Body>
                      </Popover.Content>
                    </Popover.Positioner>
                  </Portal>
                </Popover.Root>
              </Field.Root>
            </GridItem>
          </SimpleGrid>
        </Stack>
      </Card.Body>
      <Card.Footer p={2}>
        <Button
          borderRadius="xl"
          flex={1}
          loading={loading}
          onClick={handleSubmit}
          disabled={
            request.length < 1 ||
            offer.length < 1 ||
            location.length < 1 ||
            !dueDate ||
            duration === ''
          }
        >
          Request
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
