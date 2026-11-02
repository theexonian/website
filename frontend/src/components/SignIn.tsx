'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { safeRedirectPath } from '@/lib/utils';

export default function SignInButton() {
  const { user, isLoaded } = useUser();
  const clerk = useClerk();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignIn = () => {
    // Redirect .com domains to .net for authentication
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      if (host === 'new.theexonian.com' || host === 'theexonian.com' || host === 'www.theexonian.com') {
        const target = safeRedirectPath(pathname);
        window.location.href = `https://theexonian.net/sign-in?redirect_url=${encodeURIComponent(target)}`;
        return;
      }
    }
    router.push(`/sign-in?redirect_url=${encodeURIComponent(safeRedirectPath(pathname))}`);
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
