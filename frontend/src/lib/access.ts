const PUBLIC_TAGS = new Set(['news', 'life', 'sports']);

/** Sections anonymous visitors may read. `oped`/`humor` are members-only. */
export function isPublicTag(tag: string | undefined) {
	return Boolean(tag && PUBLIC_TAGS.has(tag));
}
