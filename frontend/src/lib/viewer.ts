import { auth } from '@clerk/nextjs/server';

export type Viewer = {
	isAuthenticated: boolean;
};

/**
 * The single place auth state is read. A Clerk session is currently equivalent to
 * exeter.edu membership because the Clerk instance only allows Microsoft SSO for
 * that tenant (dashboard config, not code).
 */
export async function getViewer(): Promise<Viewer> {
	const { userId } = await auth();
	return { isAuthenticated: Boolean(userId) };
}
