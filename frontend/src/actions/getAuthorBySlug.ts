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
				fields: ['title', 'tag', 'slug', 'description', 'publishedAt'],
			},
			picture: {
				fields: ['url'],
			},
		},
	});

	const body: Array<Author> = await fetchCached(`http://127.0.0.1:1337/api/users?${query}`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API}`,
		},
	});

	return body[0];
}
