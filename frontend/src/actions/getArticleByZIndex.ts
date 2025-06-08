import { fetchCached } from '@/lib/fetchRequests';
import { ArticlesResponse } from '../../types/APIResponse';
import { stringify } from 'qs';
import * as Constants from "@/components/Constants"

export async function getArticleByZIndex(z: number, section: string) {
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
		populate: '*',
	});

	const body: ArticlesResponse = await fetchCached(
		`http://${Constants.STRAPI_IP}:1337/api/articles?${query}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API}`,
			},
		}
	);

	if (!body || !body.data || body.data.length === 0) {
		return null;
	}
	return body?.data[0];
}
