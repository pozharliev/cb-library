import { type CollectionConfig } from "payload/types";

import { isAdmin } from "../auth/middleware";

const Category: CollectionConfig = {
	slug: "categories",
	admin: {
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
	],
	access: {
		create: isAdmin,
		delete: isAdmin,
		read: () => true,
		update: isAdmin,
	},
};

export default Category;
