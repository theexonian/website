import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-white pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-serif">
            Join The Exonian
          </h1>
          <p className="mt-4 text-gray-600">
            Create your account to get started
          </p>
        </div>
        
        <div className="flex justify-center">
          <SignUp 
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
                showOptionalFields: true,
              }
            }}
            routing="path"
            path="/sign-up"
            redirectUrl="/"
            signInUrl="/sign-in"
          />
        </div>
        
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
