import { fetchCached } from '@/lib/fetchRequests';
import { ArticlesResponse } from '../../types/APIResponse';
import { stringify } from 'qs';
import * as Constants from "@/components/Constants"

export async function getArticleByZIndex(z: number) {
	const query = stringify({
		filters: {
			z: {
				$eq: z,
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

	return body.data[0];
}
