import { fetchCached } from '@/lib/fetchRequests';
import { ArticlesResponse } from '../../types/APIResponse';
import { stringify } from 'qs';
import * as Constants from "@/components/Constants"
import { getViewer } from '@/lib/viewer';
import { toBylines } from '@/lib/bylines';

export async function getArticlesByTag(tag: string, limit?: number) {
	const viewer = await getViewer();

	const query = stringify({
		filters: {
			tag: {
				$eqi: tag,
			},
		},
		fields: ['title', 'tag', 'slug', 'description', 'createdAt', 'sectionPick'],
		sort: ['createdAt:desc', 'z:asc'],
		...(limit ? { pagination: { pageSize: limit } } : {}),
		populate: {
			thumbnail: {
				fields: ['url'],
			},
			authors: {
				fields: ['fullname', 'slug'],
			},
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

	return body.data.map((article) => ({ ...article, authors: toBylines(article.authors, viewer) }));
}
