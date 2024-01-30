import payload from "payload";
import type { Endpoint } from "payload/config";
import { PayloadRequest } from "payload/types";

import { User } from "payload/generated-types";
import { type BookRequestType } from "./index";

import { isLoggedIn } from "../../auth/middleware";
import getObject from "../../utils/getObject";


export const createBookRequest: Endpoint = {
	path: "/create",
	method: "post",
	handler: async (req: PayloadRequest<User>, res) => {
		if (!isLoggedIn({ req })) {
			return res.status(403).send();
		}

		const { bookId, action } = req.body as { bookId: string, action: BookRequestType };
		if (bookId == null || action == null) {
			return res.status(400).send();
		}

		try {
			const book = await getObject(parseInt(bookId), "books");
			const request = await payload.create({
				collection: "book-requests",
				data: {
					user: req.user.id,
					book: book.id,
					type: action,
				},
			});

			return res.send({ request });
		} catch (e) {
			return res.status(400).send();
		}
	},
};

export const cancelBookRequest: Endpoint = {
	path: "/cancel",
	method: "post",
	handler: async (req: PayloadRequest<User>, res) => {
		if (!isLoggedIn({ req })) {
			return res.status(403).send();
		}

		const { requestId } = req.body as { requestId: string};
		if (requestId == null || isNaN(parseInt(requestId))) {
			return res.status(400).send();
		}

		try {
			const request = await payload.findByID({
				collection: "book-requests",
				id: requestId,
			});
			const ownerOfRequest = await getObject(request.user, "users");

			if (ownerOfRequest.id !== req.user.id) {
				return res.status(403).send();
			}

			await payload.update({
				collection: "book-requests",
				data: {
					state: "cancelled",
				},
				where: {
					id: {
						equals: parseInt(requestId),
					},
				},
			});

			return res.status(200).send();
		} catch (e) {
			return res.status(400).send();
		}
	},
};