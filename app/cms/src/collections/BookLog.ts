import { type CollectionConfig } from "payload/types";

import { isAdmin } from "../auth/middleware";

const BookLog: CollectionConfig = {
	slug: "book-logs",
	fields: [
		{
			name: "book",
			type: "relationship",
			relationTo: "books",
			required: true,
		},
		{
			name: "user",
			type: "relationship",
			relationTo: "users",
			required: true,
		},
		{
			name: "action",
			type: "radio",
			options: [
				{
					label: "Take",
					value: "take",
				},
				{
					label: "Return",
					value: "return",
				},
			],
		},
	],
	access: {
		create: () => process.env.NODE_ENV === "development",
		read: isAdmin,
		update: () => process.env.NODE_ENV === "development",
		delete: () => process.env.NODE_ENV === "development",
	},
};

export default BookLog;
