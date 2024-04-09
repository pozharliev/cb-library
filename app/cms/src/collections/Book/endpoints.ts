import payload from "payload";
import type { Endpoint } from "payload/config";
import { Book, User } from "payload/generated-types";
import { PayloadRequest } from "payload/types";
import { NotFound, QueryError } from "payload/errors";
import book from "./index";
import getObject from "../../utils/getObject";


export const getTakenBooks: Endpoint = {
	path: "/taken",
	method: "get",
	handler: async (req: PayloadRequest, res) => {
		const takenBooks = await payload
			.find({
				collection: "book-inventory",
				where: {
					status: {
						equals: "taken",
					},
				},
			}).then(docs => docs.docs);


		const takenBooksWithMoreInfo = await Promise.all(takenBooks.map(async book => {
			const bookLogs =  await payload.find({
				collection: "book-logs",
				where: {
					book: {
						equals: book.id,
					},
					action: {
						equals: "take",
					},
				},
				sort: "-createdAt",
			});

			const latestLog = bookLogs.docs[0];

			return {
				...book,
				createdAt: latestLog?.createdAt,
			};
		}));

		return res.send(takenBooksWithMoreInfo);
	},
};

export const listWithAdditionalInformation: Endpoint = {
	path: "/:id/info",
	method: "get",
	handler: async (req: PayloadRequest<User>, res) => {
		const { id } = req.params;
		const user = req.user;

		let book: Book;

		if (isNaN(parseInt(id))) {
			return res.status(400).send();
		}

		try {
			book = await payload.findByID({
				collection: "books",
				id,
				depth: 2,
			});
		} catch (e) {
			if (e instanceof NotFound) {
				return res.status(404).send();
			}

			payload.logger.error(e, `Error retrieving book with id ${id}`);
			return res.status(400).send();
		}


		// If the book was taken, or we don't have a user the state will either be taken or take
		// else we can have a third state that will be pending which will only occur if we have a user
		// and the user has created a requests for the book
		// this is totally unnecessary, but it's cool
		if (book.status === "taken" || user == null) {
			return res.send({
				...book,
				request: null,
			});
		}

		const latestRequestByUser = await payload
			.find({
				collection: "book-requests",
				where: {
					user: {
						equals: user.id,
					},
					state: {
						equals: "stale",
					},
					book: {
						equals: book.id,
					},
				},
				sort: "-createdAt",
			})
			.then(values => (values.docs.length > 0 ? values.docs[0] : null));

		return res.send({
			...book,
			request: latestRequestByUser,
		});
	},
};