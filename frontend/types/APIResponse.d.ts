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

export interface ImageGalleryResponse extends BaseAPIResponse {
	data: Array<ImageGallery>;
}
export interface ArticlesResponse extends BaseAPIResponse {
	data: Array<Article>;
}

export interface IssuesResponse extends BaseAPIResponse {
    data: Array<Issue>;
}

export interface MainPageLayoutResponse extends BaseAPIResponse {
	data: Array<MainPageLayout>;
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
	sectionPick: boolean;


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

interface MainPageLayout {
	layout: {
		layout: MainPageLayoutLayout;
	};
	issueDate: string;
}

interface MainPageLayoutLayout {
	cols: {
		left: Array<MainPageLayoutItem>;
		middle: Array<MainPageLayoutItem>;
		right: Array<MainPageLayoutItem>;
	};
}

interface MainPageLayoutItem {
	z: number;
	tag: string;
	titleSize?: string;
}

interface ImageGallery {
	id: number;
	title: string;
	slug: string;
	description: string | null;
	coverImage: {
		data: MediaFormat | null;
	};
	images: {
		data: MediaFormat[];
	};
	publishDate: string | null;
	tags: Record<string, unknown> | null;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

interface MediaFormat {
	id: number;
	url: string;
	alternativeText: string | null;
	name: string;
	width: number;
	height: number;
	formats: Record<string, unknown> | null;
	provider: string;
	related?: unknown;
}