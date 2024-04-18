import { fetchCached } from '@/lib/fetchRequests';
import { stringify } from 'qs';
import { Author } from '../../types/APIResponse';

export async function getAuthorBySlug(slug: string) {
	const query = stringify({
		filters: {
			slug: {
				$eqi: slug,
			},
		},
		populate: {
			articles: {
				fields: ['title', 'tag', 'slug', 'description'],
			},
			picture: {
				fields: ['url'],
			},
		},
	});

	const body: Array<Author> = await fetchCached(`http://127.0.0.1:1337/api/users?${query}`, {
		headers: {
			Authorization:
				'Bearer e9dfcb43ebd0d2063bd563822849fce5fb6baaae2d9f69e625d40a50092f09e74afa8d6b7afff13593cd51ba298f5f6570e3b2ed0ffe8fb3beccc8eb8e957486fa8f875963dd1e6d058c2c0a184c621578c1503349a126d3ef098e1c322ae50aa7cb70569fac6bcd6bdbab63183dc5636322f2c910d44fc81ebd1b4ceecc9cd9',
		},
	});

	return body[0];
}
