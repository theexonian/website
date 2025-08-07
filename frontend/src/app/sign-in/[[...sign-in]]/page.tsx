'use client';

import { SignIn } from '@clerk/nextjs';
import CustomEmailSignIn from '@/components/CustomEmailSignIn';
import { useEffect } from 'react';

export default function Page() {
  // Redirect .com domains to .net for authentication
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      if (host === 'new.theexonian.com' || host === 'theexonian.com' || host === 'www.theexonian.com') {
        window.location.href = 'https://theexonian.net/sign-in?redirect_url=' + encodeURIComponent(window.location.href);
        return;
      }
    }
  }, []);

  // In development, show a message about Clerk configuration
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Use Clerk's default component since it works reliably
  const useDefaultClerkUI = true;
  
  return (
    <div className="flex min-h-screen items-start justify-center bg-white pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-serif">
            Welcome to The Exonian
          </h1>
          <p className="mt-4 text-gray-600">
            Please sign in with your Exeter associated email to access The Exonian's content!
          </p>
          {isDevelopment && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
              <p className="font-semibold">Development Note:</p>
              <p>Clerk authentication is configured for production. This will work on the deployed site.</p>
              <a href="/test-signin" className="text-blue-600 hover:text-blue-800 underline">
                Use test sign-in for local development
              </a>
            </div>
          )}
        </div>
        
        {useDefaultClerkUI ? (
          <div className="flex justify-center">
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: "bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                  card: "shadow-lg border-0 bg-white rounded-lg",
                  headerTitle: "font-serif text-2xl font-bold text-gray-900",
                  headerSubtitle: "text-gray-600",
                  socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
                  formFieldLabel: "text-gray-700 font-medium",
                  formFieldInput: "border border-gray-300 focus:border-black focus:ring-black rounded py-2 px-3",
                  footerActionLink: "text-black hover:text-gray-700",
                },
                layout: {
                  socialButtonsPlacement: "bottom",
                }
              }}
              routing="path"
              path="/sign-in"
              redirectUrl="/"
              signUpUrl="/sign-up"
            />
          </div>
        ) : (
          <CustomEmailSignIn />
        )}
        
        {/* The Exonian Logo */}
        <div className="flex justify-center mt-8">
          <div className="text-center">
            <img 
              src="/logo.png" 
              alt="The Exonian Logo" 
              className="h-24 w-auto mx-auto mb-3 drop-shadow-lg"
            />
            <p className="text-xs text-gray-500 font-serif">
              The Exonian is the oldest continuously-running preparatory school newspaper in America.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
