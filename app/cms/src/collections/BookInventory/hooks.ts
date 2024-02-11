import payload from "payload";
import meilisearchClient from "../../config/meilisearch";

import { CollectionAfterChangeHook, CollectionBeforeChangeHook } from "payload/types";
import { BookInventory } from "payload/generated-types";

import getObject from "../../utils/getObject";


export const handleBookInventoryStatusChange: CollectionBeforeChangeHook<BookInventory> = async ({
	data,
	originalDoc,
	operation,
}) => {
	if (operation === "create" || originalDoc == null || originalDoc.status === data.status) {
		return data;
	}

	const statusChange = originalDoc.status === "inStore" && data.status === "taken" ? "take" : "return";
	const userId = originalDoc.takenBy ?? data.takenBy!;
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

export const syncMeilisearchOnUpdateOrCreate: CollectionAfterChangeHook<BookInventory> = async ({
	doc,
}) => {
	const book = await getObject(doc.book, "books");


	// Possible area for bugs
	const availableCopies = await payload
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
		.then(docs => docs.docs.find(books => books.id === doc.id) == null ? docs.totalDocs + 1 : docs.totalDocs);

	book.availableCopies = availableCopies;

	await meilisearchClient.updateDocuments([
		book,
	]);
};

