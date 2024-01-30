import { CollectionBeforeChangeHook } from "payload/types";
import { BookRequest } from "payload/generated-types";
import getObject from "../../../utils/getObject";
import { BookStatus } from "../../Book";

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
			collection: "book-inventory",
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