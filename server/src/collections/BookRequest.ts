import { type CollectionConfig } from "payload/types";

import { isAdmin, isLoggedIn } from "../auth/middleware";
import { changeRequestState, isRequestUpdatable } from "../hooks/requests";

const BookRequest: CollectionConfig = {
	slug: "book-requests",
	admin: {
		// useAsTitle: "title",
	},
	fields: [
		{
			name: "book",
			type: "relationship",
			relationTo: "books",
		},
		{
			name: "user",
			type: "relationship",
			relationTo: "users",
		},
		{
			name: "actions",
			type: "radio",
			options: [
				{
					label: "Approve",
					value: "approve",
				},
				{
					label: "Decline",
					value: "decline",
				},
			],
		},
		{
			name: "state",
			type: "select",
			options: ["stale", "approved", "declined"],
			defaultValue: "stale",
			admin: {
				hidden: true,
			},
		},
	],
	access: {
		create: isLoggedIn,
		read: isAdmin,
		update: isRequestUpdatable,
		delete: () => false,
	},
	hooks: {
		beforeChange: [changeRequestState],
	},
};

export default BookRequest;
