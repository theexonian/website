import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/articles(.*)', '/tag(.*)', '/pdf-exonian-archive'
]);

export default clerkMiddleware(async (auth, req) => {
  // In development mode, bypass authentication for all routes
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  const { userId, redirectToSignIn } = await auth();

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    '/articles(.*)',
    '/tag(.*)',
    '/pdf-exonian-archive',
    '/(api|trpc)(.*)',
  ],
};
