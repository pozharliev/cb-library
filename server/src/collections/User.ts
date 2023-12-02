import { type CollectionConfig } from "payload/types";

import { USERS_COLLECTION } from "../config/main";
import { isAdmin } from "../auth/middleware";

const User: CollectionConfig = {
	slug: USERS_COLLECTION,
	auth: {
		disableLocalStrategy: true,
	},
	admin: {
		useAsTitle: "email",
	},
	fields: [
		{
			name: "fullName",
			type: "text",
			required: true,
		},
		{
			name: "firstName",
			type: "text",
			required: true,
		},
		{
			name: "email",
			type: "email",
			unique: true,
			required: true,
		},
		{
			name: "role",
			type: "text",
			required: true,
		},
		{
			name: "sub",
			type: "text",
			required: true,
		},
	],
	access: {
		admin: isAdmin,
		create: () => false,
		delete: () => false,
		read: isAdmin,
		update: () => false,
	},
};

export default User;
