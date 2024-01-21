import { type CollectionConfig } from "payload/types";
import { isAdmin } from "../auth/middleware";

const Media: CollectionConfig = {
	slug: "media",
	upload: {
		staticURL: "/media",
		staticDir: "media",
		mimeTypes: ["image/*"],
		imageSizes: [
			{
				name: "thumbnail",
				width: 150,
				fit: "contain",
			},
			{
				name: "main",
				width: 450,
				fit: "contain",
			},
		],
	},
	fields: [
		{
			name: "alt",
			type: "text",
		},
	],
	access: {
		read: () => true,
		update: isAdmin,
		delete: isAdmin,
		create: isAdmin,
	},
};

export default Media;
