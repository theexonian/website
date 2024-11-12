import { fetchCached } from '@/lib/fetchRequests';
import { ArticlesResponse } from '../../types/APIResponse';
import { stringify } from 'qs';

export async function getArticleById(slug: string) {
	const query = stringify({
		filters: {
			slug: {
				$eqi: slug,
			},
		},
		populate: '*',
	});

	const body: ArticlesResponse = await fetchCached(
		`http://34.227.161.14:1337/api/articles?${query}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API}`,
			},
		}
	);

	return body.data[0];
}
