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

export interface IssuesResponse extends BaseAPIResponse {
    data: Array<Issue>;
}

interface Article {
	id: number;

	title: string;
	slug: string;
	description: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	authors: Array<Author>;
	tag: string;

	thumbnail: {
		url: string;
	};
}

interface Author {
	id: number;
	username: string;
	email: string;
	description: string;
	fullname: string;
	position: string;
	picture: {
		url: string;
	};

	slug: string;
	articles: Array<Article>;
}

interface Issue {
	id: number;
	slug: number;
	board: number;
	publishDate: string;
	thumbnail: {
		url: string;
	}
	pdf: {
		url: string;
	}
}