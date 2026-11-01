'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { FiInfo } from 'react-icons/fi';
import { safeRedirectPath } from '@/lib/utils';

/**
 * Informational only. Content is redacted on the server, so hiding this bar
 * would not grant an anonymous visitor anything.
 */
export default function AccessNotice() {
	const { isLoaded, isSignedIn } = useUser();
	const pathname = usePathname();

	if (!isLoaded || isSignedIn) return null;
	// Pointless on the auth pages themselves.
	if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) return null;

	return (
		<div className="w-full bg-r[#f0f0f0]">
			<p className="mx-auto flex max-w-[1300px] items-center justify-center gap-1.5 px-4 py-1.5 font-sans text-xs text-muted-foreground">
				<FiInfo aria-hidden className="h-3 w-3.5 shrink-0" />
				<span className="text-center">
					You&apos;re viewing a limited version of The Exonian.{' '}
					<Link
						href={`/sign-in?redirect_url=${encodeURIComponent(safeRedirectPath(pathname))}`}
						className="font-semibold text-red-700 hover:underline"
					>
						Sign in with your Exeter account
					</Link>{' '}
					for full access.
				</span>
			</p>
		</div>
	);
}
