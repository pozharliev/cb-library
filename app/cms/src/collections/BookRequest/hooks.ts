import { CollectionBeforeChangeHook } from "payload/types";
import { APIError } from "payload/errors";

import { BookRequest } from "payload/generated-types";
import { BookStatus } from "../Book";

import getObject from "../../utils/getObject";

export const handleBookRequestAction: CollectionBeforeChangeHook<BookRequest> = ({
	data,
	originalDoc,
}) => {
	// the state has just changed
	if (originalDoc?.action == null && data.action != null) {
		// @ts-expect-error No idea
		data.state = data.action.concat("d");
	}
	return data;
};

export const handleBookRequestApproval: CollectionBeforeChangeHook<BookRequest> = async ({
	 data,
	 operation,
	 req,
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

	const book = await getObject(data.book!, "books");

	let status: BookStatus;
	let takenBy: number | null;

	if (data.type === "take") {
		const user = await getObject(data.user!, "users");

		status = "taken";
		takenBy = user.id;
	} else {
		status = "inStore";
		takenBy = null;
	}

	try {
		await req.payload.update({
			collection: "books",
			id: book.id,
			data: {
				status,
				takenBy,
			},
		});
	} catch (e) {
		req.payload.logger.error(e, `Failed to ${data.action} a book`);
	}

	return data;
};

export const handleBookRequestCreation: CollectionBeforeChangeHook<BookRequest> = async ({
	data,
	operation,
}) => {
	if (operation === "update" || data?.book == null || data?.user == null) {
		return data;
	}

	const book = await getObject(data.book, "books");
	const user = await getObject(data.user, "users");
	const bookTakenBy = book.takenBy == null ? null : await getObject(book.takenBy, "users");


	if (data.type === "take" && book.status !== "inStore") {
		throw new APIError("Book is already taken by someone else", 403, null, true);
	}

	if (data.type === "return" && book.status === "inStore") {
		throw new APIError("Book is in store", 404, null, true);
	}

	if (data.type === "return" && bookTakenBy != null && bookTakenBy.id !== user.id) {
		throw new APIError("Book is taken by a different person", 406, null, true);
	}

	return data;
};