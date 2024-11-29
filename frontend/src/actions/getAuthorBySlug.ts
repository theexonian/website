import { fetchCached } from '@/lib/fetchRequests';
import { stringify } from 'qs';
import { Author } from '../../types/APIResponse';
import * as Constants from "@/components/Constants"

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

	const body: Array<Author> = await fetchCached(`http://${Constants.STRAPI_IP}:1337/api/users?${query}`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API}`,
		},
	});

	return body[0];
}
