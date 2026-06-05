import { fetchCached } from '@/lib/fetchRequests';
import { ImageGalleryResponse } from '../../types/APIResponse';
import { stringify } from 'qs';
import * as Constants from "@/components/Constants"

export async function getImagesByGallery(slug: string) {
	const query = stringify({
		filters: {
			slug: {
				$eqi: slug,
			},
		},
		fields: ['title', 'slug'],
		sort: ['createdAt:desc'],
		populate: ['coverImage', 'images']
	});

	const body: ImageGalleryResponse = await fetchCached(
		`https://${Constants.STRAPI_IP}/api/image-galleries?${query}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API}`,
			},
		}
	);

	return body.data;
}
