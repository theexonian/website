import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/articles(.*)', '/tag(.*)', '/pdf-exonian-archive'
]);

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', '/sign-up(.*)', '/', '/masthead', '/about', '/webboard', '/the-exonian-charter', '/privacy-and-content-use'
]);

export default clerkMiddleware(async (auth, req) => {
  // In development mode, bypass authentication for all routes
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  // Always allow public routes
  if (isPublicRoute(req)) {
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
