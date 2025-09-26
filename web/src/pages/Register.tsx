import { AuthenticationPageLayout } from '@/components/layout/AuthenticationPageLayout';
import { PasswordInput } from '@/components/ui/password-input';
import { Button, Card, Field, HStack, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'wouter';

export function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <AuthenticationPageLayout>
      <Card.Root width="400px" borderRadius="xl">
        <Card.Header>
          <Card.Title fontWeight="bold" fontSize="xl">
            Register
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Stack gap={4}>
            <HStack>
              <Field.Root>
                <Field.Label>First Name</Field.Label>
                <Input
                  variant="flushed"
                  placeholder="John"
                  type="text"
                  value={firstName}
                  onChange={({ target: { value } }) => setFirstName(value)}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Last Name</Field.Label>
                <Input
                  variant="flushed"
                  placeholder="Doe"
                  type="text"
                  value={lastName}
                  onChange={({ target: { value } }) => setLastName(value)}
                />
              </Field.Root>
            </HStack>
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input
                variant="flushed"
                placeholder="example@gmail.com"
                type="email"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <PasswordInput
                variant="flushed"
                type="password"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Confirm Password</Field.Label>
              <PasswordInput
                variant="flushed"
                type="password"
                value={confirmPassword}
                onChange={({ target: { value } }) => setConfirmPassword(value)}
              />
            </Field.Root>
            <Link href="/">Already have an account?</Link>
            <Button
              disabled={email.length < 3 || password.length < 8}
              borderRadius="xl"
            >
              Register
            </Button>
            <Button borderRadius="xl">Log in with Google</Button>
          </Stack>
        </Card.Body>
      </Card.Root>
    </AuthenticationPageLayout>
  );
}
