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
				sort: ['createdAt:desc', 'z:asc'],
				populate: {
			thumbnail: {
				fields: ['url'],
			},
			authors: {
				fields: ['fullname', 'slug'],
			}}
			},
			picture: {
				fields: ['url'],
			},
		},
	});

	const body: Array<Author> = await fetchCached(`https://${Constants.STRAPI_IP}/api/users?${query}`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API}`,
		},
	});

	const author = body[0];
	if (author && author.articles) {
		author.articles = Array.from(
			new Map(author.articles.map(article => [article.slug, article])).values()
		);
	}

	return author;
}
