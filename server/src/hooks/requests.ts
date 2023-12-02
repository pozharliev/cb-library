import payload from "payload";
import { Access } from "payload/config";

import { type BookRequest, User } from "../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";

export const changeRequestState: BeforeChangeHook<BookRequest> = (args) => {
	if (args.operation === "create" || !args.data.actions) {
		return args.data;
	}

	args.data.state = args.data.actions === "approve" ? "approved" : "declined";

	return args.data;
};

export const isRequestUpdatable: Access<BookRequest, User> = async (args) => {
	if (!args.id) {
		return true;
	}

	const item = await payload.findByID({
		collection: "book-requests",
		id: args.id,
	});

	return item.state !== null && item.state === "stale";
};