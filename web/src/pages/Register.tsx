import { AuthenticationPageLayout } from '@/components/layout/AuthenticationPageLayout';
import { PublicRoute } from '@/components/PublicRoute';
import { PasswordInput } from '@/components/ui/password-input';
import { toaster } from '@/components/ui/toaster';
import { signIn, signUp } from '@/lib/auth-client';
import { Button, Card, Field, HStack, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'wouter';

export function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      return toaster.create({
        type: 'error',
        title: 'Registration Failed',
        description: 'The passwords must match!'
      });
    }

    await signUp.email(
      {
        email,
        name: `${firstName} ${lastName}`,
        password,
        callbackURL: '/home'
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => setLoading(false),
        onError: (ctx) => {
          setLoading(false);
          toaster.create({
            type: 'error',
            title: 'Registration Failed',
            description: ctx.error.message
          });
        }
      }
    );
  };

  return (
    <PublicRoute>
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
                  onChange={({ target: { value } }) =>
                    setConfirmPassword(value)
                  }
                />
              </Field.Root>
              <Link href="/">Already have an account?</Link>
              <Button
                loading={loading}
                disabled={email.length < 3 || password.length < 8}
                borderRadius="xl"
                onClick={handleRegistration}
              >
                Register
              </Button>
              <Button
                loading={loading}
                borderRadius="xl"
                onClick={async () => {
                  await signIn.social({
                    provider: 'google',
                    callbackURL: `${import.meta.env.VITE_HOME_URL}`
                  });
                }}
              >
                Log in with Google
              </Button>
            </Stack>
          </Card.Body>
        </Card.Root>
      </AuthenticationPageLayout>
    </PublicRoute>
  );
}
