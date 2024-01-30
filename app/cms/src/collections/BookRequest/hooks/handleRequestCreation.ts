import { CollectionBeforeChangeHook } from "payload/types";
import { Book, BookRequest, User } from "payload/generated-types";
import getObject from "../../../utils/getObject";
import payload from "payload";
import { APIError } from "payload/errors";

const handleTakeRequest = async (book: Book, user: User) => {
	const bookIsAvailable = await payload
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
		.then(books => books.totalDocs > 0);

	if (!bookIsAvailable) {
		throw new APIError("Book is not available.", 406, null, true);
	}

	const userDoesNotHaveCopyOfTheBook = await payload
		.find({
			collection: "book-inventory",
			where: {
				book: {
					equals: book.id,
				},
				takenBy: {
					equals: user.id,
				},
			},
		})
		.then(books => books.totalDocs < 1);

	if (!userDoesNotHaveCopyOfTheBook) {
		throw new APIError("User already has one copy of this book.", 409, null, true);
	}
};

const handleReturnRequest = async(book: Book, user: User) => {
	const userHasCopyOfTheBook = await payload
		.find({
			collection: "book-inventory",
			where: {
				book: {
					equals: book.id,
				},
				takenBy: {
					equals: user.id,
				},
			},
		})
		.then(books => books.totalDocs === 1);

	if (!userHasCopyOfTheBook) {
		throw new APIError("User does not have a copy of this book.", 406, null, true);
	}
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

	// WORKFLOW
	// If the request is for taking a book, first we need to check that there is an available copy
	// Then we need to check if the user doesn't already have a copy of the book
	// If the user hasn't taken a copy of the book and there is one available then the user can make the request
	// Otherwise we return error
	// Else if the request is for returning a book
	// First we check if the user has taken a copy of the book
	// If the user has taken a copy of the book we can make the request
	// Otherwise we return an error
	switch (data.type) {
		case "take":
			await handleTakeRequest(book, user);
			break;

		case "return":
			await handleReturnRequest(book, user);
			break;
	}

	return data;
};