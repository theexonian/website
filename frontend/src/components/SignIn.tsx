'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SignInButton() {
  const { user, isLoaded } = useUser();
  const clerk = useClerk();
  const router = useRouter();

  const handleSignIn = () => {
    // Redirect .com domains to .net for authentication
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      if (host === 'new.theexonian.com' || host === 'theexonian.com' || host === 'www.theexonian.com') {
        window.location.href = 'https://theexonian.net/sign-in?redirect_url=' + encodeURIComponent(window.location.href);
        return;
      }
    }
    router.push('/sign-in');
  };

  if (isLoaded && user) {
    return (
      <button onClick={() => clerk.signOut()} className="hover:text-red-400">
        Sign out
      </button>
    );
  }

  return (
    <button 
      onClick={handleSignIn}
      className="hover:text-red-400"
    >
      Sign in
    </button>
  );
}
