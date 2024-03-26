import { type CollectionConfig } from "payload/types";

import { isAdmin } from "../../auth/middleware";
import BookSearch from "../../admin/components/BookSearch";

import { getTakenBooks, listWithAdditionalInformation } from "./endpoints";

import { syncMeilisearchOnDelete, syncMeilisearchOnUpdateOrCreate } from "./hooks";

export type BookStatus = "inStore" | "taken";

const Book: CollectionConfig = {
	slug: "books",
	admin: {
		useAsTitle: "adminTitle",
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
			name: "image",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "adminTitle",
			type: "text",
			admin: {
				hidden: true, // hides the field from the admin panel
			},
			hooks: {
				beforeChange: [
					({ siblingData }) => {
						// ensures data is not stored in DB
						delete siblingData["adminTitle"];
					},
				],
				afterRead: [
					({ data }) => {
						return `${data.title} by ${data.author}`;
					},
				],
			},
		},
	],
	access: {
		create: isAdmin,
		read: () => true,
		update: isAdmin,
		delete: isAdmin,
	},
	hooks: {
		afterChange: [syncMeilisearchOnUpdateOrCreate],
		afterDelete: [syncMeilisearchOnDelete],
	},
	endpoints: [listWithAdditionalInformation, getTakenBooks],
};

export default Book;
