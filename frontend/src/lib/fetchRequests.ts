export async function fetchCached(url: string, options: RequestInit) {
	let cache: RequestCache = 'force-cache';

	if (process.env.NODE_ENV === 'development') {
		cache = 'no-store';
	}
	const response = await fetch(url, { cache: cache, ...options });

	const body = await response.json();

	return body;
}
