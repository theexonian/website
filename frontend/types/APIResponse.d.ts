interface BaseAPIResponse extends Object {
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};

	data: Object[];
}

export interface ArticlesResponse extends BaseAPIResponse {
	data: Array<Article>;
}

interface Article {
	id: number;

	title: string;
	slug: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	authors: Array<Author>;
	tag: string;

	thumbnail: {
		url: string;
	}
}

interface Author {
	id: number;
	username: string;
	email: string;
	description: string;
	fullname: string;

	slug: string;
	articles: Array<Article>;
}
