import { type CollectionConfig } from "payload/types";

import {
	handleRequestAction,
	handleBookRequestApproval,
	handleBookRequestCreation,
	sendEmailOnStatusChange
} from "./hooks";
import { cancelBookRequest, createBookRequest, getBookRequestsByUser } from "./endpoints";

import { isAdmin } from "../../auth/middleware";
import { hasCreatedRequest } from "./access";

export type BookRequestAction = "approve" | "decline";
export type BookRequestType = "take" | "return";
export const BookRequestState = ["stale", "approved", "declined", "pending", "cancelled"];

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
			options: BookRequestState,
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
		read: process.env.NODE_ENV === "development" ? () => true : isAdmin || hasCreatedRequest,
		update: () => process.env.NODE_ENV === "development",
		delete: () => process.env.NODE_ENV === "development",
	},
	hooks: {
		beforeChange: [handleRequestAction, handleBookRequestCreation, handleBookRequestApproval],
		afterChange: [sendEmailOnStatusChange],
	},
	endpoints: [createBookRequest, cancelBookRequest, getBookRequestsByUser],
};

export default BookRequest;
