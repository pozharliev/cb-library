import { type CollectionConfig } from "payload/types";

import { isAdmin } from "../auth/middleware";
import BookSearch from "../admin/components/BookSearch";

const Books: CollectionConfig = {
	slug: "books",
	admin: {
		useAsTitle: "email",
	},
	fields: [
		{
			name: "title",
			type: "text",
			admin: {
				components: {
					Field: BookSearch,
				},
			},
			required: true,
		},
		{
			name: "subtitle",
			type: "text",
		},
		{
			name: "author",
			type: "text",
			required: true,
		},
		{
			name: "description",
			type: "text",
		},
		{
			name: "categories",
			type: "relationship",
			relationTo: "categories",
			hasMany: true,
		},
	],
	access: {
		create: isAdmin,
		delete: isAdmin,
		read: () => true,
		update: isAdmin,
	},
};

export default Books;
