import { type CollectionConfig } from "payload/types";

import { handleBookRequestAction, handleBookRequestApproval, handleBookRequestCreation } from "../hooks/bookRequests";
import { isAdmin } from "../auth/middleware";

export type BookRequestAction = "approve" | "decline";
export type BookRequestState = "stale" | "approved" | "declined" | "pending" | "cancelled";
export type BookRequestType = "take" | "return";

const BookRequest: CollectionConfig = {
	slug: "book-requests",
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
			options: ["stale", "approved", "declined", "pending", "cancelled"],
			defaultValue: "pending",
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
		update: () => process.env.NODE_ENV === "development",
		delete: () => process.env.NODE_ENV === "development",
	},
	hooks: {
		beforeChange: [handleBookRequestAction, handleBookRequestCreation, handleBookRequestApproval],
	},
};

export default BookRequest;
