import { createAuthClient } from 'better-auth/client';

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL: import.meta.env.VITE_BASE_URL
});
