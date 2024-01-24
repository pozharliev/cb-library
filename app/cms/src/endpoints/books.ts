import type { Endpoint } from "payload/config";
import payload from "payload";
import { User } from "payload/generated-types";
import { PayloadRequest } from "payload/types";


export const listWithAdditionalInformation: Endpoint = {
	path: "/:id/info",
	method: "get",
	handler: async (req: PayloadRequest<User>, res) => {
		const { id } = req.params;
		const user = req.user;

		const book = await payload.findByID({
			collection: "books",
			id,
			depth: 2,
		});

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