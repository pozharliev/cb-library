import { type CollectionConfig } from "payload/types";

import { isAdmin, isLoggedIn } from "../auth/middleware";
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
		},
	],
	access: {
		create: isAdmin,
		delete: isAdmin,
		read: isLoggedIn,
		update: isAdmin,
	},
};

export default Books;
