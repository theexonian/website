import type { Viewer } from './viewer';

export interface Byline {
	displayName: string;
	slug?: string;
}

interface RawAuthor {
	fullname?: string | null;
	slug?: string;
}

/** `Alex Smith` -> `A. Smith`; `Mary Jane Watson` -> `M. Watson`. */
export function shortenName(fullname: string): string {
	const parts = fullname.trim().split(/\s+/).filter(Boolean);
	if (parts.length < 2) return parts[0] ?? '';
	return `${parts[0][0]}. ${parts[parts.length - 1]}`;
}

/**
 * Maps Strapi author records to what the page may render. Anonymous viewers lose
 * both the full name and the slug, so no `/writers/...` link can leak a name.
 */
export function toBylines(authors: RawAuthor[] | undefined, viewer: Viewer): Byline[] {
	if (!authors) return [];
	return authors.map(({ fullname, slug }) => {
		const name = fullname?.trim() ?? '';
		if (viewer.isAuthenticated) return { displayName: name, slug };
		return { displayName: name ? shortenName(name) : '' };
	});
}
