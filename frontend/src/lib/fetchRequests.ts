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
