import { Redirect } from 'wouter';
import { useSession } from '../lib/auth-client';
import { SplashScreen } from './SplashScreen';
import type { ReactNode } from 'react';

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <SplashScreen />;
  }

  if (!session) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
}
