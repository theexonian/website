import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/articles(.*)', '/masthead', '/about', '/tag(.*)', '/pdf-exonian-archive'
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    '/articles(.*)',
    '/masthead',
    '/about',
    '/tag(.*)',
    '/pdf-exonian-archive',
    '/(api|trpc)(.*)',
  ],
};
