'use client';

import { useState } from 'react';

export default function SimpleSignIn() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate sign-in process
    try {
      // For testing purposes, let's just validate the form
      if (!emailAddress || !password) {
        throw new Error('Please fill in all fields');
      }

      if (!emailAddress.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For now, just show success message
      alert(`Sign-in attempted with: ${emailAddress}`);
      
      // In a real implementation, this would redirect after successful authentication
      // router.push('/');
      
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in.');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: '"Bodoni 72", serif' }}>
            Welcome to The Exonian
          </h1>
          <p className="mt-2 text-gray-600">
            Sign in to access your account
          </p>
          <p className="mt-1 text-xs text-blue-600">
            (Test Form - No Authentication)
          </p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500"
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
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500"
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

            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed w-full"
                type="submit"
                disabled={isLoading || !emailAddress || !password}
              >
                {isLoading ? 'Signing in...' : 'Sign In (Test)'}
              </button>
            </div>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              <a href="/sign-in" className="text-red-600 hover:text-red-800 underline">
                ← Back to real sign-in page
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
