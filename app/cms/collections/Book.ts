import { type CollectionConfig } from "payload/types";

import { isAdmin } from "../auth/middleware";
import BookSearch from "../admin/components/BookSearch";
import {handleBookStatusChange} from "../hooks/books";

export type BookStatus = "inStore" | "taken";

const Book: CollectionConfig = {
	slug: "books",
	admin: {
		useAsTitle: "title",
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
		{
			name: "status",
			type: "select",
			required: true,
			admin: {
				readOnly: true,
			},
			options: [
				{
					label: "Taken",
					value: "taken",
				},
				{
					label: "In Store",
					value: "inStore",
				},
			],
			defaultValue: "inStore",
		},
		{
			name: "takenBy",
			label: "Taken By",
			type: "relationship",
			relationTo: "users",
			required: false,
			admin: {
				readOnly: true,
			},
		},
	],
	access: {
		create: isAdmin,
		delete: isAdmin,
		read: () => true,
		update: isAdmin,
	},
	hooks: {
		beforeChange: [handleBookStatusChange],
	},
};

export default Book;
