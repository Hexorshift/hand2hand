import { AuthenticationPageLayout } from '@/components/layout/AuthenticationPageLayout';
import { PasswordInput } from '@/components/ui/password-input';
import { signIn } from '@/lib/auth-client';
import { Button, Card, Field, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'wouter';

export function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthenticationPageLayout>
      <Card.Root width="400px" borderRadius="xl">
        <Card.Header>
          <Card.Title fontWeight="bold" fontSize="xl">
            Log In
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Stack gap={4}>
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
            <Link href="/register">Don't have an account?</Link>
            <Button
              disabled={email.length < 3 || password.length < 8}
              borderRadius="xl"
            >
              Log in
            </Button>
            <Button
              borderRadius="xl"
              onClick={async () => {
                await signIn.social({
                  provider: 'google',
                  callbackURL: '/'
                });
              }}
            >
              Log in with Google
            </Button>
          </Stack>
        </Card.Body>
      </Card.Root>
    </AuthenticationPageLayout>
  );
}
