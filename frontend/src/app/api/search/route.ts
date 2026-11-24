import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

const MEILISEARCH_URL = process.env.NEXT_PUBLIC_MEILISEARCH_URL;
const MEILISEARCH_SEARCH_KEY = process.env.MEILISEARCH_SEARCH_KEY;

// The index now holds members-only sections, so the key that reads it must never
// reach the browser. Only the routes instant-meilisearch actually calls are proxied.
const ALLOWED_PATH = /^\/(multi-search|indexes\/[A-Za-z0-9_-]+\/(search|facet-search))$/;

export async function POST(request: NextRequest) {
	// Mirrors the middleware's local escape hatch (src/proxy.ts).
	if (process.env.BYPASS_AUTH !== 'true') {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
	}

	if (!MEILISEARCH_URL || !MEILISEARCH_SEARCH_KEY) {
		console.error('Meilisearch is not configured: NEXT_PUBLIC_MEILISEARCH_URL / MEILISEARCH_SEARCH_KEY');
		return NextResponse.json({ error: 'Search is not configured' }, { status: 500 });
	}

	const path = request.nextUrl.searchParams.get('path') ?? '';
	if (!ALLOWED_PATH.test(path)) {
		return NextResponse.json({ error: 'Invalid search path' }, { status: 400 });
	}

	const response = await fetch(`${MEILISEARCH_URL}${path}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${MEILISEARCH_SEARCH_KEY}`,
			'Content-Type': 'application/json',
		},
		body: await request.text(),
	});

	return new NextResponse(await response.text(), {
		status: response.status,
		headers: { 'Content-Type': 'application/json' },
	});
}
