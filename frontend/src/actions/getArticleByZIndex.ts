import { fetchCached } from '@/lib/fetchRequests';
import { ArticlesResponse } from '../../types/APIResponse';
import { stringify } from 'qs';
import * as Constants from "@/components/Constants"

export async function getArticleByZIndex(z: number) {
	try {
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

		// Check if data is an array and not empty
		if (!body?.data || !Array.isArray(body.data) || body.data.length === 0) {
			return null;
		}

		return body.data[0];
	} catch (err) {
		console.error("Failed to fetch article with z =", z, err);
		return null;
	}
}
