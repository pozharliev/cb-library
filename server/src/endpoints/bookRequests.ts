import payload from "payload";

import { isAdmin } from "../auth/middleware";

import type { Endpoint } from "payload/config";
import { BookRequestAction } from "../collections/BookRequest";
import { Book, BookRequest, User } from "payload/generated-types";
import getObject from "../utils/getObject";


type BookRequestRequestType = {
	requestId: number;
	requestAction: BookRequestAction;
};

const takeBook = async (bookId: number, user: User) => {
	await payload.update({
		collection: "books",
		id: bookId,
		data: {
			status: "taken",
			takenBy: user,
		},
	});
};

export const bookRequestAction: Endpoint = {
	path: "/action",
	method: "post",
	async handler(req, res) {
		if (req.user == null || !isAdmin({ req })) {
			return res.status(401).send("Unauthorized");
		}

		const { requestId, requestAction }: BookRequestRequestType = req.body;

		let bookRequest: BookRequest;
		
		try {
			bookRequest = await payload.findByID({
				collection: "book-requests",
				id: requestId,
			});
		} catch (e) {
			payload.logger.error(e, "Error while retrieving book request");
			return res.status(404).send("No book request found");
		}
		
		if (requestAction === "decline") {
			await payload.update({
				collection: "book-requests",
				id: bookRequest.id,
				data: {
					action: "decline",
				},
			});
			// return res.send(xxxx)
		}

		const book = await getObject(bookRequest.book, "books");

		if (bookRequest.type === "take") {
			if (book.takenBy !== null) {
				return res.status(406).send("Book is not in store yet");
			}

			return await takeBook(book.id, req.user as User);
		} else if (bookRequest.type === "return") {
			if (book.takenBy == null) {
				return res.status(404).send("Book is in store");
			}

			const user = await getObject(book.takenBy, "users");

			if (user.id !== (req.user as User).id) {
				return res.status(403).send("Book was taken by a different person");
			}

			// trigger hook for returning book
		}

	
	},
};