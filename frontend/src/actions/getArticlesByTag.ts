import { fetchCached } from '@/lib/fetchRequests';
import { ArticlesResponse } from '../../types/APIResponse';
import { stringify } from 'qs';

export async function getArticlesByTag(tag: string) {
	const query = stringify({
		filters: {
			tag: {
				$eqi: tag,
			},
		},
		fields: ['title', 'tag', 'slug', 'description', 'publishedAt'],
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
		`http://127.0.0.1:1337/api/articles?${query}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API}`,
			},
		}
	);

	return body.data;
}
