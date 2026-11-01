import { fetchCached } from '@/lib/fetchRequests';
import { ArticlesResponse } from '../../types/APIResponse';
import { stringify } from 'qs';
import * as Constants from "@/components/Constants"
import { getViewer } from '@/lib/viewer';
import { toBylines } from '@/lib/bylines';
import { isPublicTag } from '@/lib/access';

export async function getArticleByZIndex(z: number, section: string) {
	const viewer = await getViewer();

	// Members-only sections keep the (shortened) byline in previews, but not the
	// description or thumbnail.
	const restricted = !viewer.isAuthenticated && !isPublicTag(section);

	const query = stringify({
		filters: {
			z: {
				$eq: z,
			},
			tag: {
                $eq: section,
            },
		},
		sort: ['createdAt:desc'],
		fields: ['title', 'slug', 'tag', 'createdAt', 'sectionPick', ...(restricted ? [] : ['description'])],
		populate: {
			authors: { fields: ['fullname', 'slug'] },
			...(restricted ? {} : { thumbnail: { fields: ['url'] } }),
		},
	});

	const body: ArticlesResponse = await fetchCached(
		`https://${Constants.STRAPI_IP}/api/articles?${query}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API}`,
			},
		}
	);

	if (!body || !body.data || body.data.length === 0) {
		return null;
	}

	const article = body.data[0];
	return { ...article, authors: toBylines(article.authors, viewer) };
}
