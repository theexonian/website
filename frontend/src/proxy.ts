import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Everything not listed here requires a session (default-deny).
const isPublicRoute = createRouteMatcher([
	'/',
	'/about',
	'/masthead',
	'/webboard',
	'/the-exonian-charter',
	'/privacy-and-content-use',
	'/alumni-faculty-archives-feature',
	'/speechify',
	'/api/speechify',
	'/news',
	'/life',
	'/sports',
	// Article access depends on the article's section, which middleware cannot know.
	// `articles/[slug]/page.tsx` gates members-only sections itself.
	'/articles(.*)',
	'/sign-in(.*)',
	'/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
	// Explicit opt-in so the gate can be exercised locally: BYPASS_AUTH=true npm run dev
	if (process.env.BYPASS_AUTH === 'true') return;
	if (isPublicRoute(req)) return;

	const { userId, redirectToSignIn } = await auth();

	// redirectToSignIn() defaults its return URL to the current request.
	if (!userId) return redirectToSignIn();
});

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
