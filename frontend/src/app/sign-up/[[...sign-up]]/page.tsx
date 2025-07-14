import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: '"Bodoni 72", serif' }}>
            Join The Exonian
          </h1>
          <p className="mt-2 text-gray-600">
            Create your account to get started
          </p>
        </div>
        
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-black hover:bg-gray-800 text-sm normal-case",
              card: "shadow-lg border-0",
              headerTitle: "font-serif text-2xl",
              headerSubtitle: "text-neutral-600",
              socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
              formFieldLabel: "text-gray-700 font-medium",
              formFieldInput: "border border-gray-300 focus:border-red-500 focus:ring-red-500",
              footerAction: "hidden",
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
    </div>
  );
}
