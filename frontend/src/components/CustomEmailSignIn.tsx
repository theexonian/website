'use client';

import { useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function CustomEmailSignIn() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === 'complete') {
        console.log('Sign in successful, setting active session');
        await setActive({ session: result.createdSessionId });
        router.push('/');
      } else {
        // Handle other statuses like needs_first_factor, needs_second_factor, etc.
        console.log('Sign in result:', result);
        setError('Sign in failed. Please check your credentials and try again.');
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      const errorMessage = err.errors?.[0]?.message || err.message || 'An error occurred during sign in.';
      setError(errorMessage);
    }

    setIsLoading(false);
  };

  if (!isLoaded) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600 mb-4">Loading authentication...</p>
          <p className="text-xs text-gray-500">
            If this takes too long, please refresh the page.
          </p>
        </div>
      </div>
    );
  }

  // If Clerk is not available, show fallback
  if (!signIn) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 text-center">
          <p className="text-red-600 font-semibold mb-2">Authentication Service Unavailable</p>
          <p className="text-sm text-gray-600 mb-4">
            There's an issue connecting to the authentication service.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm bg-red-50 border border-red-200 rounded p-3">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed w-full"
            type="submit"
            disabled={isLoading || !emailAddress || !password}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/sign-up')}
              className="text-red-600 hover:text-red-800 underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
