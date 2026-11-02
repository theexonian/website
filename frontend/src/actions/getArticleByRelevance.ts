import { fetchCached } from '@/lib/fetchRequests';
import { ArticlesResponse } from '../../types/APIResponse';
import { stringify } from 'qs';
import * as Constants from "@/components/Constants"

export async function getArticleByRelevance(relevance: number, section: string) {
	const query = stringify({
		filters: {
			tag: {
				$eq: section,
			},
		},
		sort: ['createdAt:desc', 'z:asc'],
		pagination: {
			start: Math.max(0, relevance - 1),
			limit: 1,
		},
		populate: '*',
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

	return body.data[0];
}
