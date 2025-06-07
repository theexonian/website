'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export default function SignInButton() {
  const { user, isLoaded } = useUser();
  const clerk = useClerk();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isLoaded) return null;

  if (user) {
    return (
      <button onClick={() => clerk.signOut()} className="hover:text-red-400">
        Sign out
      </button>
    );
  }

  return (
    <button onClick={() => clerk.redirectToSignIn()} className="hover:text-red-400">
      Sign in
    </button>
  );
}
