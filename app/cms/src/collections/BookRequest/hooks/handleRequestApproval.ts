import payload from "payload";

import { APIError } from "payload/errors";

import { CollectionBeforeChangeHook } from "payload/types";
import { Book, BookRequest, User } from "payload/generated-types";

import getObject from "../../../utils/getObject";

const handleTakeRequestApproval = async (book: Book, user: User) => {
	const bookInventories = await payload
		.find({
			collection: "book-inventory",
			where: {
				book: {
					equals: book.id,
				},
				status: {
					equals: "inStore",
				},
			},
		})
		.then(docs => docs.docs);

	if (bookInventories.length < 1) {
		throw new APIError("Book is not available.", 406, null, true);
	}

	const randomBook = bookInventories[Math.floor(Math.random() * bookInventories.length)];

	try {
		await payload.update({
			collection: "book-inventory",
			data: {
				status: "taken",
				takenBy: user.id,
			},
			where: {
				id: {
					equals: randomBook.id,
				},
			},
		});
	} catch (e) {
		payload.logger.error(e, "Failed to take a book");
	}
};

const handleReturnRequestApproval = async (book: Book, user: User) => {
	try {
		await payload.update({
			collection: "book-inventory",
			data: {
				status: "inStore",
				takenBy: null,
			},
			where: {
				book: {
					equals: book.id,
				},
				takenBy: {
					equals: user.id,
				},
				status: {
					equals: "taken",
				},
			},
		});
	} catch (e) {
		payload.logger.error(e, "Failed to return a book");
	}

};

export const handleBookRequestApproval: CollectionBeforeChangeHook<BookRequest> = async ({
	data,
	operation,
	originalDoc,
}) => {
	// we only want cases where the state has just changed
	if (
		data.state === originalDoc?.state ||
		data.state !== "approved" ||
		operation === "create"
	) {
		return data;
	}

	// No need to check for user since there is already a check in place when the request is created
	const book = await getObject(data.book!, "books");
	const user = await getObject(data.user!, "users");


	switch(data.type) {
		case "take":
			await handleTakeRequestApproval(book, user);
			break;
		case "return":
			await handleReturnRequestApproval(book, user);
			break;
		default:
			payload.logger.error(null, "Tried handling book request approval but request has no type");
	}
};