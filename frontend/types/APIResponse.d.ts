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
	attributes: {
		title: string;
		content: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		authors: {
			data: Array<Author>;
		};
	};
}

interface Author {
	id: number;
	attributes: {
		username: string;
		email: string;
		description: string;
		fullname: string;
	};
}
