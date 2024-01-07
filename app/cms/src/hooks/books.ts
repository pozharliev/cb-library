import payload from "payload";

import { CollectionBeforeChangeHook } from "payload/types";
import { Book } from "payload/generated-types";
import getObject from "../utils/getObject";


export const handleBookStatusChange: CollectionBeforeChangeHook<Book> = async ({
	data,
	originalDoc,
	operation,
}) => {
	if (operation === "create" || originalDoc == null || originalDoc.status === data.status) {
		return data;
	}

	const statusChange = originalDoc.status === "inStore" && data.status === "taken" ? "take" : "return";
	const userId = originalDoc.takenBy! ?? data.takenBy!;
	const bookId = originalDoc.id ?? data.id!;

	const user = await getObject(userId, "users");
	const book = await getObject(bookId, "books");

	await payload.create({
		collection: "book-logs",
		data: {
			book: book.id,
			user: user.id,
			action: statusChange,
		},
	});

	return data;
};