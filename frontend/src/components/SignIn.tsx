'use client';

import { useUser, useClerk } from '@clerk/nextjs';

export default function SignInButton() {
  const { user, isLoaded } = useUser();
  const clerk = useClerk();

  if (isLoaded && user) {
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
