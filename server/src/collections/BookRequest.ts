import { type CollectionConfig } from "payload/types";

import { isAdmin, isLoggedIn } from "../auth/middleware";
import { bookRequestAction } from "../endpoints/bookRequests";

export type BookRequestAction = "approve" | "decline";
export type BookRequestState = "stale" | "approved" | "declined";
export type BookRequestType = "take" | "return";

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
		{
			name: "type",
			type: "select",
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
			required: true,
		},
	],
	access: {
		create: () => process.env.NODE_ENV === "development",
		read: isAdmin,
		update: () => false,
		delete: () => false,
	},
	endpoints: [
		bookRequestAction,
	],
};

export default BookRequest;
