export type GoogleBooksRequest = {
	items: GoogleBooksGeneralInfo[];
};

export type GoogleBooksGeneralInfo = {
	accessInfo: Record<string, unknown>;
	etag: string;
	id: string;
	kind: string;
	saleInfo: string;
	selfLink: string;
	volumeInfo: GoogleBook;
};

export type GoogleBook = {
	id: string;
	title: string;
	subtitle: string;
	publishDate: string;
	language: string;
	authors?: string[];
	imageLinks?: {
		smallThumbnail: string;
		thumbnail: string;
	};
};
