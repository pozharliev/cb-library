import payload from "payload";

import { CronJob } from "cron";
import getObject from "../utils/getObject";
import { BookLog } from "payload/generated-types";
import { sendEmail } from "../email/sender";

const sendReminderForNotReturnedBooks = async () => {
	payload.logger.info("Sending reminders for not returned books");

	const maxDaysOfRentTime = await payload
		.findGlobal({
			slug: "settings",
		}).then(settings => settings.maxDaysRent);

	if (maxDaysOfRentTime == null) {
		return;
	}

	const booksThatAreTaken = await payload
		.find({
			collection: "book-inventory",
			where: {
				and: [
					{
						status: {
							equals: "taken",
						},
					},
					{
						takenBy: {
							exists: true,
						},
					},
				],
			},
		})
		.then(collection => collection.docs);

	for (const takenBook of booksThatAreTaken) {
		const bookTakenBy = await getObject(takenBook.takenBy!, "users");
		const book = await getObject(takenBook.book, "books");

		const bookLog: BookLog | undefined = await payload
			.find({
				collection: "book-logs",
				where: {
					book: {
						equals: book.id,
					},
					action: {
						equals: "take",
					},
					user: {
						equals: bookTakenBy.id,
					},
					createdAt: {
						less_than: new Date(new Date().getTime() - maxDaysOfRentTime * 24 * 60 * 60 * 1000),
					},
				},
				sort: "-createdAt",
			})
			.then(bookLogs => bookLogs.docs[0]);


		if (bookLog != undefined) {
			await sendEmail("notice", {
				to: bookTakenBy.email,
				bookName: book.title,
				userFullName: bookTakenBy.fullName,
			});
		}

	}
};

export default CronJob.from({
	cronTime: process.env.NODE_ENV === "development" ? "* * * * *": "0 7 * * *",
	onTick: sendReminderForNotReturnedBooks,
	timeZone: "Europe/Sofia",
});
