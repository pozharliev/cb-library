import { type Option } from "payload/dist/admin/components/elements/ReactSelect/types";

export interface GoogleBooksRequest {
	items: GoogleBooksGeneralInfo[];
}

export interface GoogleBooksGeneralInfo {
	accessInfo: Record<string, unknown>;
	etag: string;
	id: string;
	kind: string;
	saleInfo: string;
	selfLink: string;
	volumeInfo: GoogleBookType;
}

export interface GoogleBookType {
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
}

interface GoogleBookTypeWithValueAndLabel extends GoogleBookType {
	value: string;
	label: string;
}

export default GoogleBookTypeWithValueAndLabel;
