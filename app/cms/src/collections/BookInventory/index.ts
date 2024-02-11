import { type CollectionConfig } from "payload/types";

import { isAdmin } from "../../auth/middleware";
import getObject from "../../utils/getObject";
import { handleBookInventoryStatusChange, syncMeilisearchOnUpdateOrCreate } from "./hooks";

export type BookStatus = "inStore" | "taken";

const BookInventory: CollectionConfig = {
	slug: "book-inventory",
	admin: {
		useAsTitle: "title",
	},
	fields: [
		{
			name: "book",
			type: "relationship",
			relationTo: "books",
			required: true,
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
		{
			name: "title",
			type: "text",
			admin: {
				hidden: true, // hides the field from the admin panel
			},
			hooks: {
				beforeChange: [
					({ siblingData }) => {
						// ensures data is not stored in DB
						delete siblingData["location"];
					},
				],
				afterRead: [
					async ({ data }) => {
						const book = await getObject(data.book, "books");
						return `${book.title} by ${book.author}`;
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
		beforeChange: [handleBookInventoryStatusChange],
		afterChange: [syncMeilisearchOnUpdateOrCreate],
	},
};

export default BookInventory;
