'use client';

import { useAuth } from '@clerk/nextjs';

export default function SignOutButton() {
  const { signOut } = useAuth();

  return <button onClick={() => signOut()}>Sign out</button>;
}
