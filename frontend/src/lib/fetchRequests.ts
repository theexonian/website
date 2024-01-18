export async function fetchCached(url: string, options: RequestInit) {
	const response = await fetch(url, { cache: 'force-cache', ...options });

	const body = await response.json();

	return body;
}

export async function fetchNoCache(url: string, options: RequestInit) {
	const response = await fetch(url, { cache: 'no-store', ...options });

	const body = await response.json();

	return body;
}
