export async function fetchCached(url: string, options: RequestInit) {
	try {
		// Use revalidate instead of cache for better performance in production
		// Add timeout to prevent hanging requests that could cause memory leaks
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
		
		const response = await fetch(url, { 
			next: { revalidate: 300 }, // Revalidate every 5 minutes
			signal: controller.signal,
			...options 
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const body = await response.json();
		return body;
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			console.error('Fetch request timed out:', url);
		} else {
			console.error('Fetch error:', url, error);
		}
		throw error;
	}
}
