/**
 * Shared Strapi fetch. Responses are cached server-side; per-viewer redaction
 * happens in the actions afterwards, and pages that depend on the viewer are
 * rendered dynamically (they call `auth()`), so a cached response is never
 * served as another viewer's page.
 */
export async function fetchCached(url: string, options: RequestInit) {
	// Use revalidate instead of cache for better performance in production
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
	
	try {
		const response = await fetch(url, { 
			next: { revalidate: 300 }, // Revalidate every 5 minutes
			signal: controller.signal,
			keepalive: false, // Prevent connection pooling memory leaks
			...options 
		});

		const body = await response.json();
		return body;
	} finally {
		clearTimeout(timeoutId);
	}
}
