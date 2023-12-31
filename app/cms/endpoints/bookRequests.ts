import payload from "payload";

import { isAdmin } from "../auth/middleware";

import type { Endpoint } from "payload/config";
import { BookRequestAction } from "../collections/BookRequest";
import { BookRequest, User } from "payload/generated-types";
import getObject from "../utils/getObject";


type BookRequestRequestType = {
	requestId: number;
	requestAction: BookRequestAction;
};

// TODO: return response

const approveRequest = async (requestId: number) => {
	await payload.update({
		collection: "book-requests",
		id: requestId,
		data: {
			action: "approve",
		},
	});
};

const declineRequest = async (requestId: number) => {
	await payload.update({
		collection: "book-requests",
		id: requestId,
		data: {
			action: "decline",
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
			return await declineRequest(bookRequest.id);
		}

		const book = await getObject(bookRequest.book, "books");

		if (bookRequest.type === "take") {
			if (book.takenBy !== null) {
				return res.status(406).send("Book is not in store yet");
			}
		} else if (bookRequest.type === "return") {
			if (book.takenBy == null) {
				return res.status(404).send("Book is in store");
			}

			const user = await getObject(book.takenBy, "users");

			if (user.id !== (req.user as User).id) {
				return res.status(403).send("Book was taken by a different person");
			}
		}

		return await approveRequest(bookRequest.id);
	},
};