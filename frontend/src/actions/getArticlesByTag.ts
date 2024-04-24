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
				Authorization:
					'Bearer e9dfcb43ebd0d2063bd563822849fce5fb6baaae2d9f69e625d40a50092f09e74afa8d6b7afff13593cd51ba298f5f6570e3b2ed0ffe8fb3beccc8eb8e957486fa8f875963dd1e6d058c2c0a184c621578c1503349a126d3ef098e1c322ae50aa7cb70569fac6bcd6bdbab63183dc5636322f2c910d44fc81ebd1b4ceecc9cd9',
			},
		}
	);

	return body.data;
}
