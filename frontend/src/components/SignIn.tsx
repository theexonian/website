'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

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
      <button onClick={() => clerk.signOut()} className="hover:text-red-400 inline-flex items-center gap-1 whitespace-nowrap leading-none">
        <span>Sign Out</span>
        <FiLogOut className="ml-1 h-4 w-4 shrink-0" />
      </button>
    );
  }

  return (
    <button 
      onClick={handleSignIn}
      className="hover:text-red-400 inline-flex items-center gap-1 whitespace-nowrap leading-none"
    >
      <span>Sign In</span>
      <FiLogIn className="h-4 w-4 shrink-0" />
    </button>
  );
}
