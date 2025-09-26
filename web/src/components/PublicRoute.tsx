import { Redirect } from 'wouter';
import { useSession } from '../lib/auth-client';
import { SplashScreen } from './SplashScreen';
import type { ReactNode } from 'react';

export function PublicRoute({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <SplashScreen />;
  }

  if (session) {
    return <Redirect to="/home" />;
  }

  return <>{children}</>;
}
