import { Endpoint } from "payload/config";

import { isAdmin } from "../../auth/middleware";
import payload from "payload";
import getObject from "../../utils/getObject";
import { sendEmail } from "../../email/sender";


export const sendReminder: Endpoint = {
	path: "/email/reminder",
	root: true,
	method: "post",
	handler: async(req, res) => {
		if (!isAdmin({ req })) {
			return res.status(403).send();
		}

		console.log(req.body);

		const { userId, bookId } = req.body as { userId: number, bookId: number };
		if (userId == null || bookId == null) {
			return res.status(400).send();
		}

		const user = await getObject(userId, "users");
		const book = await getObject(bookId, "books");

		await sendEmail("notice", {
			bookName: book.title,
			to: user.email,
			userFullName: user.fullName,
		});

		return res.status(200).send();
	},
};
