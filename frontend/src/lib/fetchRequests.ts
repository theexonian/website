export async function fetchCached(url: string, options: RequestInit) {
	// Use revalidate instead of cache for better performance in production
	const response = await fetch(url, { 
		next: { revalidate: 300 }, // Revalidate every 5 minutes
		...options 
	});

	const body = await response.json();

	return body;
}
