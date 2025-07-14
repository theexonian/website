'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SignInButton() {
  const { user, isLoaded } = useUser();
  const clerk = useClerk();
  const router = useRouter();

  if (isLoaded && user) {
    return (
      <button onClick={() => clerk.signOut()} className="hover:text-red-400">
        Sign out
      </button>
    );
  }

  return (
    <button 
      onClick={() => router.push('/sign-in')} 
      className="hover:text-red-400"
    >
      Sign in
    </button>
  );
}
