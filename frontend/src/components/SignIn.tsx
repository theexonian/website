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

  if (!mounted || !isLoaded) {
    // Render nothing or a placeholder until hydrated and user info loaded
    return null;
  }

  if (user) {
    return (
      <button onClick={() => clerk.signOut()} className="hover:text-red-400">
        Sign out
      </button>
    );
  }

  return (
    <button onClick={() => clerk.openSignIn()} className="hover:text-red-400">
      Sign in
    </button>
  );
}
