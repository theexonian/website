import { fetchCached } from '@/lib/fetchRequests';
import { stringify } from 'qs';
import { Author, AuthorProfile } from '../../types/APIResponse';
import * as Constants from "@/components/Constants"
import { getViewer } from '@/lib/viewer';
import { toBylines } from '@/lib/bylines';

export async function getAuthorBySlug(slug: string): Promise<AuthorProfile | null> {
	const viewer = await getViewer();

	const query = stringify({
		filters: {
			slug: {
				$eqi: slug,
			},
		},
		populate: {
			articles: {
				fields: ['title', 'tag', 'slug', 'description', 'createdAt'],
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
	if (!author) return null;

	const articles = Array.from(
		new Map((author.articles ?? []).map((article) => [article.slug, article])).values()
	);

	return {
		id: author.id,
		slug: author.slug,
		description: author.description,
		position: author.position,
		picture: author.picture,
		displayName: toBylines([author], viewer)[0].displayName,
		articles: articles.map((article) => ({
			...article,
			authors: toBylines(article.authors, viewer),
		})),
	};
}
