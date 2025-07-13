'use client';

import { useUser, RedirectToSignIn } from '@clerk/nextjs';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isLoaded, user } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return <RedirectToSignIn />;

  return <>{children}</>;
}