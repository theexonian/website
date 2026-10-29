import { fetchCached } from '@/lib/fetchRequests';
import { ArticlesResponse } from '../../types/APIResponse';
import { stringify } from 'qs';
import * as Constants from "@/components/Constants"
import { getViewer } from '@/lib/viewer';
import { toBylines } from '@/lib/bylines';

export async function getArticleById(slug: string) {
	const viewer = await getViewer();

	const query = stringify({
		filters: {
			slug: {
				$eqi: slug,
			},
		},
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

	const article = body.data[0];
	if (!article) return null;

	return { ...article, authors: toBylines(article.authors, viewer) };
}
