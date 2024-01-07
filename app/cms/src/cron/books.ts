import payload from "payload";

import { CronJob } from "cron";

const sendReminderForUnreturnedBooks = async () => {
	const booksThatAreTaken = await payload
		.find({
			collection: "books",
			where: {
				status: {
					equals: "taken",
				},
			},
		})
		.then(collection => collection.docs);

	const maxDaysOfRentTime = await payload.findGlobal({
		slug: "settings",
	}).then(settings => settings.maxDaysRent);

	if (maxDaysOfRentTime == null) {
		return;
	}



	const usersToSendEmailTo = booksThatAreTaken.map(async book => {
		return await payload
			.find({
				collection: "book-logs",
				where: {
					book: {
						equals: book,
					},
					action: {
						equals: "take",
					},
					user: {
						equals: book.takenBy,
					},
				},
				sort: "-createdAt",
			})
			.then(books => books.docs[0]);
	});

	console.log(usersToSendEmailTo);
};

export default CronJob.from({
	cronTime: "* * * * *",
	onTick: sendReminderForUnreturnedBooks,
	timeZone: "Europe/Sofia",
});
